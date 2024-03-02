import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { SignUpDto } from '../../../auth/dto/sign-up.dto';
import { PASSWORD_HASH_ROUNDS } from '../../../auth/auth.constants';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    { email, password }: SignUpDto,
    transactionManager?: EntityManager,
  ): Promise<User> {
    const entityManager = transactionManager || this.globalEntityManager;
    const usersRepository = entityManager.getRepository(User);

    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, PASSWORD_HASH_ROUNDS);

    const { identifiers } = await usersRepository.insert(user);

    return usersRepository.findOneBy({ id: identifiers[0].id });
  }
}
