import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.name || !createUserDto.email) {
      throw new HttpException(
        'Please provide name and email.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (user) {
      return user;
    }

    // const userByDevice = await this.usersRepository.findOneBy({
    //   deviceId: createUserDto.deviceId,
    // });

    // if (userByDevice) {
    //   throw new HttpException(
    //     'Your device already registered one user. Please use another device to use another email',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const newUser = new User({ ...createUserDto, balance: 5 });

    return this.entityManager.save(newUser);
  }

  async findOne(updateUserDto: UpdateUserDto) {
    if (!updateUserDto.email) {
      throw new HttpException(
        'Please provide the email.',
        HttpStatus.BAD_REQUEST,
      );
    }

    updateUserDto.email = updateUserDto.email.toLowerCase();
    const user = await this.usersRepository.findOneBy({
      email: updateUserDto.email,
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new HttpException(
        'Please provide the email.',
        HttpStatus.BAD_REQUEST,
      );
    }

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
