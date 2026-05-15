import type { Transaction } from "./Transaction"

export type TransactionCardProps = {
    transaction: Transaction,
    deleteTransaction: (id: number) => Promise<void>;
    updateTransaction: (editedTransaction: object, id: number) => Promise<void>;
}