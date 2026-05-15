import type { Budget } from "./Budget"
export type BudgetCardProps = {
    budget: Budget,
    deleteBudget: (id: number) => Promise<void>;
    updateBudget: (editedBudget: object, id: number) => Promise<void>;
}