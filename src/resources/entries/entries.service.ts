import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { EntityManager } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class EntriesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createEntryDto: CreateEntryDto) {
    if (!createEntryDto.email || !createEntryDto.productId)
    {
      throw new HttpException('Provide both email and productId', HttpStatus.BAD_REQUEST);

    }

    const user = await this.usersService.findByEmail(createEntryDto.email);

    const update = await this.usersService.reduceBalanceAndSave(user);

    if (!update) {
      throw new HttpException(
        'Could not reduce the balance from user wallet.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const entry = new Entry({
      productId: +createEntryDto.productId,
      userId: update.id,
    });

    return this.entityManager.save(entry);
  }
}
