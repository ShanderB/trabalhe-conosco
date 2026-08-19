import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, Producer } from '@prisma/client';
import { NotFoundDomainError } from '../../common/errors/not-found.error';
import { validateDocument } from '../domain/document-validator';
import { ProducersRepository } from '../infrastructure/producers.repository';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

const PRISMA_UNIQUE_CONSTRAINT_ERROR = 'P2002';

@Injectable()
export class ProducersService {
  constructor(private readonly repository: ProducersRepository) {}

  async create(dto: CreateProducerDto): Promise<Producer> {
    const { digits } = validateDocument(dto.document);

    try {
      return await this.repository.create({ document: digits, name: dto.name });
    } catch (error) {
      throw this.translatePrismaError(error, digits);
    }
  }

  async findAll(): Promise<Producer[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.repository.findById(id);
    if (!producer) {
      throw new NotFoundDomainError('Produtor', id);
    }
    return producer;
  }

  async update(id: string, dto: UpdateProducerDto): Promise<Producer> {
    await this.findOne(id);

    const data: Prisma.ProducerUpdateInput = { name: dto.name };
    if (dto.document !== undefined) {
      data.document = validateDocument(dto.document).digits;
    }

    try {
      return await this.repository.update(id, data);
    } catch (error) {
      throw this.translatePrismaError(error, dto.document ?? '');
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.remove(id);
  }

  private translatePrismaError(error: unknown, document: string): Error {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === PRISMA_UNIQUE_CONSTRAINT_ERROR
    ) {
      return new ConflictException(`Já existe um produtor cadastrado com o documento "${document}".`);
    }
    return error as Error;
  }
}
