import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    const uuid = isUuid(id);

    if (!uuid) {
      throw new AppError('Invalid Transaction', 404);
    }

    const transactionExists = await transactionsRepository.findOne(id);

    if (!transactionExists) {
      throw new AppError('Invalid Transaction', 404);
    }

    await transactionsRepository.delete(transactionExists.id);
  }
}

export default DeleteTransactionService;
