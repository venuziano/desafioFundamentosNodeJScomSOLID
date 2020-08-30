import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error(`Fail. You only have ${balance.total} to withdraw.`);
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    if (title === undefined || value === undefined || type === undefined) {
      throw Error('The values are mandatory.');
    }

    return transaction;
  }
}

export default CreateTransactionService;
