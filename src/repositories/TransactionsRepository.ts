import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionsRepository = getRepository(Transaction);
    const transactions = await transactionsRepository.find();

    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value, 0)
      .reduce((total, actual) => +total + +actual, 0);

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value, 0)
      .reduce((total, actual) => +total + +actual, 0);

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }
}

export default TransactionsRepository;
