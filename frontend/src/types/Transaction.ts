export type Transaction = {
    id: number,
    userid: number,
    classification: "Expense" | "Income",
    amount: number,
    category: string,
    date_of_transaction: string,
    note?: string,
    created_At: Date
}