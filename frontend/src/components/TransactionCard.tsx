import { useEffect, useState } from "react";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";
import type { TransactionCardProps } from "../types/TransactionCardProps";

export function TransactionCard ({transaction, deleteTransaction, updateTransaction}: TransactionCardProps) {
     const [deletingTransaction, setDeletingTransaction] = useState(false);
     const [editingTransaction, setEditingTransaction] = useState(false);
     const [editedTransaction, setEditedTransaction] = useState(transaction);
    
     async function handleDeleteTransaction(id: number) {
        
        try {
           await deleteTransaction(id);
        setDeletingTransaction(false); 
        } catch (error) {
            console.error(error);
            setDeletingTransaction(false);    
        }
        
     }

     async function handleUpdateTransaction(id: number) {
        
        try {
          await updateTransaction(editedTransaction, id);
          setEditedTransaction(transaction);
          setEditingTransaction(false);  
        } catch (error) {
            console.error(error);
            setEditingTransaction(false);
        }
        
        
     }

     useEffect(() => {
        if (deletingTransaction) {
        document.body.style.overflow = "hidden"
     } else {
        document.body.style.overflow = "auto"
     }
     }, [deletingTransaction])

     

     const [viewingNote, setViewingNote] = useState(false);
    return (
        <>
            <div className="flex flex-col gap-4 h-fit bg-white p-6 rounded-lg hover:-translate-y-0.5 duration-200">
                   { !editingTransaction ? (
                    <>
                    <div className="flex justify-between gap-2">
                    
                    <button onClick={() => setDeletingTransaction(true)} aria-label="Delete transaction button">
                    <i className="fa-solid fa-rectangle-xmark text-xl text-rose-500 cursor-pointer hover:text-rose-800 duration-100"></i>
                    </button>

                    <button onClick={() => setEditingTransaction(true)} aria-label="Edit transaction button">
                    <i className="fa-solid fa-pen-to-square text-xl cursor-pointer hover:opacity-68 duration-100"></i>
                    </button>
                    </div>

                    <p className="text-lg font-medium">{transaction.classification}</p>
                    <p>${transaction.amount}</p>
                    <p className="text-sm">{transaction.category}</p>
                    
                    <div className="flex gap-2 justify-between items-center">
                    <p className="text-sm text-slate-600">{transaction.date_of_transaction.split("T")[0]}</p>
                   { transaction.note && (
                    <button onClick={() => setViewingNote(prev => !prev)}>
                    <p className="text-sm text-slate-600 break-all cursor-pointer hover:underline"><span className="font-medium">Note</span> <i className={`fa-solid fa-arrow-down duration-150 ${viewingNote && 'rotate-180 duration-150'}`}></i></p>
                    </button>
                   )   
                    }
                   
                </div>
                 { viewingNote && (
                        <p className="text-sm text-slate-600 break-all">{transaction.note}</p>
                    )

                    }
                   </>
                   ) : (
                    <>

                    <EditModal item={transaction} editedItem={editedTransaction} updateFunction={handleUpdateTransaction} setEditingFalse={setEditingTransaction} setEditedItem={setEditedTransaction}/>
                    
                   </>

                   )
                   }
                </div>
            { deletingTransaction && (
                <DeleteModal item={transaction} setFunction={setDeletingTransaction} deleteFunction={handleDeleteTransaction}/>
            )

            }
        </>
    )
}