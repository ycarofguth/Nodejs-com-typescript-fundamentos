import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, element) => {
      if (element.type === 'income') {
        return (total += element.value);
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, element) => {
      if (element.type === 'outcome') {
        return (total += element.value);
      }
      return total;
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
