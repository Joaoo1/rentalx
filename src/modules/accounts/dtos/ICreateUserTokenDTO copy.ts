export interface ICreateUserTokenDTO {
  userId: string;
  expiresAt: Date;
  refreshToken: string;
}
