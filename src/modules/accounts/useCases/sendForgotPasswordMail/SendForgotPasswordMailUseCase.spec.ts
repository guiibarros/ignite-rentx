import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let dayjsDateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send forgot password mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    dayjsDateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProviderInMemory
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'test',
      email: 'test@email.com',
      password: 'test',
      driver_license: 'abc123',
    });

    await sendForgotPasswordMailUseCase.execute('test@email.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send a forgot password email to an user that does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('test@email.com')
    ).rejects.toEqual(new AppError('User does not exists.', 400));
  });

  it('should be able to create an user refresh token', async () => {
    const createRefreshToken = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    await usersRepositoryInMemory.create({
      name: 'test',
      email: 'test@email.com',
      password: 'test',
      driver_license: 'abc123',
    });

    await sendForgotPasswordMailUseCase.execute('test@email.com');

    expect(createRefreshToken).toHaveBeenCalled();
  });
});
