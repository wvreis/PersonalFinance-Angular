export enum TransactionStatus {
    pending,
    completed,
    canceled
}

export const transactionStatusToString = {
  [TransactionStatus.pending]: 'Em aberto',
  [TransactionStatus.completed]: 'Paga',
  [TransactionStatus.canceled]: 'Cancelada',
}
