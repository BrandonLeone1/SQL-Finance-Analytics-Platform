import { useEffect, useState } from "react"
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";
import type { BudgetCardProps } from "../types/BudgetCardProps";
export function BudgetCard ({budget, deleteBudget, updateBudget}: BudgetCardProps) {
    
    const [deletingBudget, setDeletingBudget] = useState(false);
    const [editingBudget, setEditingBudget] = useState(false);
    const [editedBudget, setEditedBudget] = useState(budget);

    async function handleDeleteBudget(id: number) {
        
        try {
           await deleteBudget(id);
            setDeletingBudget(false); 
        } catch (error) {
            console.error(error);
            setDeletingBudget(false);
        }
        
        
    }

    async function handleUpdateBudget(id: number) {
        
        try {
           await updateBudget(editedBudget, id);
            setEditedBudget(budget);
            setEditingBudget(false); 
        } catch (error) {
            console.error(error);
            setEditingBudget(false);
        }
        
        
    }
    
    
    return (
        <>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-xl hover:-translate-y-0.5 duration-200">
                    
                    { !editingBudget ? (
                        <>
                    <div className="flex justify-between gap-2">
                    
                    <button onClick={() => setDeletingBudget(true)} aria-label="Delete budget button">
                    <i className="fa-solid fa-rectangle-xmark text-xl text-rose-500 cursor-pointer hover:text-rose-800 duration-100"></i>
                    </button>

                    <button onClick={() => setEditingBudget(true)} aria-label="Edit budget button">
                    <i className="fa-solid fa-pen-to-square text-xl cursor-pointer hover:opacity-68 duration-100"></i>
                    </button>
                    </div>

                    <p>{budget.category}</p>
                    <p>${budget.budget_limit}</p>
                    </>
                    ) : (
                        <>

                        <EditModal item={budget} editedItem={editedBudget} updateFunction={handleUpdateBudget} setEditingFalse={setEditingBudget} setEditedItem={setEditedBudget}/>
                        
                        </>
                    )
                    }
            </div>

            { deletingBudget && (
                <>
                <DeleteModal item={budget} setFunction={setDeletingBudget} deleteFunction={handleDeleteBudget} />
                </>
            )

            }
        
        </>
    )
}