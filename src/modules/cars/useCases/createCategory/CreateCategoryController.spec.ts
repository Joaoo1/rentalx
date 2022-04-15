// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('CreateCategoryController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, driver_license, created_at)
        values('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'XXXXXXX', NOW())
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refreshToken } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category super test',
        description: 'Category super test',
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    expect(response.status).toBe(201);
  });

  it('should be able to create a category when name already exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refreshToken } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category super test',
        description: 'Category super test',
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    expect(response.status).toBe(409);
  });
});
