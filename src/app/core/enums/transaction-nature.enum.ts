export enum TransactionNature {
    inbound,
    outbound
}

export const transactionNatureToString = {
  [TransactionNature.inbound]: 'Entrada',
  [TransactionNature.outbound]: 'Saída',
}
