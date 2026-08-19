import { Test, TestingModule } from '@nestjs/testing';
import { ProducersRepository } from '../infrastructure/producers.repository';
import { ProducersService } from './producers.service';

describe('ProducersService', () => {
  let service: ProducersService;
  let repository: { create: jest.Mock; findAll: jest.Mock; findById: jest.Mock; update: jest.Mock; remove: jest.Mock };

  beforeEach(async () => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducersService, { provide: ProducersRepository, useValue: repository }],
    }).compile();

    service = module.get(ProducersService);
  });

  it('normalizes the document to digits-only before persisting a valid CPF', async () => {
    repository.create.mockResolvedValue({ id: '1', document: '11144477735', name: 'João' });

    await service.create({ document: '111.444.777-35', name: 'João' });

    expect(repository.create).toHaveBeenCalledWith({ document: '11144477735', name: 'João' });
  });

  it('rejects an invalid document before ever touching the repository', async () => {
    await expect(service.create({ document: '111.444.777-36', name: 'João' })).rejects.toThrow();
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('throws a not-found domain error when the producer does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.findOne('missing-id')).rejects.toThrow(
      /não foi encontrado/,
    );
  });
});
