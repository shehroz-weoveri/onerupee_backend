import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (user) {
      return user;
    }

    const newUser = new User({ ...createUserDto, balance: 5 });

    return this.entityManager.save(newUser);
  }

  async findByEmail(email: string) {
    email = email.toLowerCase();
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async reduceBalanceAndSave(user: User) {
    if (user.balance === 0) {
      throw new HttpException(
        'Wallet balance is zero.',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.balance = user.balance - 1;

    return this.entityManager.save(user);
  }
}
