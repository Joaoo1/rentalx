import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswodMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let mailProvider: MailProviderInMemory;

describe('SendForgotPasswodMailUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswodMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    const userEmail = 'user12321341241@test.com';
    const user = {
      driverLicense: '00123424111',
      email: userEmail,
      password: '123456',
      name: 'User test',
    };

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswodMailUseCase.execute(userEmail);

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be to send a forgot password mail to an unexistent user', async () => {
    expect.assertions(1);

    try {
      await sendForgotPasswodMailUseCase.execute('teetteteteteasdase@mail.com');
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should be to create an user token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokenRepositoryInMemory,
      'create'
    );

    const userEmail = 'user12321341241@test.com';
    const user = {
      driverLicense: '00123424111',
      email: userEmail,
      password: '123456',
      name: 'User test',
    };

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswodMailUseCase.execute(userEmail);

    expect(generateTokenMail).toBeCalled();
  });
});
