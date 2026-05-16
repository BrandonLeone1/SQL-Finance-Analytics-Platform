import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { TransactionCard } from "../components/TransactionCard";
import type { Transaction } from "../types/Transaction";

export default function Transactions ({loadingTransactions, transactions, getTransactions, addTransaction, deleteTransaction, updateTransaction}) {
   
    useEffect(() => {
        
        getTransactions()
        
    }, [])
    
   
    const [newTransaction, setNewTransaction] = useState({
        classification: "",
        amount: "",
        category: "",
        date_of_transaction: "",
        note: ""
    })

    const [addingTransaction, setAddingTransaction] = useState(false);
   

    async function handleAddTransaction () {
        
        if (!newTransaction.classification || !newTransaction.amount || !newTransaction.category || !newTransaction.date_of_transaction) {
            setAddingTransaction(false);
            return
        }

        await addTransaction(newTransaction);

        setNewTransaction({
            classification: "",
            amount: "",
            category: "",
            date_of_transaction: "",
            note: ""
        })

        setAddingTransaction(false);
    }
    
    
    if (loadingTransactions) {
        return (
            
            <div className="flex items-center justify-center h-screen">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-400 border-t-transparent"></div>
            </div>
        )
    }
  
    
    return (
        
        <>
        <Navbar />
            <p className="text-3xl font-semibold mt-24 text-center">Transactions</p>
            
            <div className="flex items-center justify-center gap-4">
            <p className="text-xl font-medium text-center mt-6">Current amount: ({transactions.length})</p>
            
            <button onClick={() => setAddingTransaction(true)} aria-label="Add new transaction button">
            <i  className="fa-regular fa-square-plus text-2xl cursor-pointer font-medium mt-6 text-center text-emerald-700 hover:text-emerald-950 duration-100"></i>
            </button>
            </div>

             { transactions.length < 1 && (
                <>
                <p className="text-xl text-center mt-12 font-medium">Add a transaction above to get started.</p>
                <p className="text-lg text-center mt-3">For information about your income & expenses, check the dashboard after adding some.</p>
                <p className="text-center mt-3">Unlock charts, insights & more.</p>
                </>
            )

            }

            { addingTransaction && (
                <div className="fixed inset-0 bg-black/80 flex z-80 items-center justify-center h-screen backdrop-blur-sm p-6">
                    <div className="bg-white p-4 rounded-lg flex flex-col gap-4 max-h-[90vh] overflow-auto">
                        <p className="text-xl font-medium text-emerald-700">Add new transaction</p>
                        
                        <div className="flex flex-col gap-4 mt-2">
                            <label htmlFor="transaction-classification">Choose a classification
                            <select 
                            id="transaction-classification"
                            value={newTransaction.classification}
                            onChange={(e) => setNewTransaction(prev => ({
                                ...prev,
                                classification: e.target.value
                            }))}
                           
                            className="border-slate-300 cursor-pointer border px-3 py-2 rounded-xl mt-2 w-full">
                                <option value={""} disabled>Exp. or Inc.</option>
                                <option value={`Expense`}>Expense</option>
                                <option value={`Income`}>Income</option>
                            </select>
                            </label>
                            
                            <label htmlFor="amount-input">Input amount
                            <input 
                            id="amount-input"
                            type="number"
                            value={newTransaction.amount}
                            onChange={(e) => setNewTransaction(prev => ({
                                ...prev,
                                amount: e.target.value
                            
                            }))}
                            placeholder="$"
                            className="border-slate-300 border px-3 py-2 rounded-xl mt-2 w-full"
                            /></label>

                          <label htmlFor="category-input">Choose a category
                           <select 
                           value={newTransaction.category}
                           id="category-input"
                           onChange={(e) => setNewTransaction(prev => ({
                            ...prev,
                            category: e.target.value
                           }))}
                           className="border-slate-300 cursor-pointer border px-3 py-2 rounded-xl w-full mt-2"

                           >
                            <option value={``} disabled>Select</option>
                            <option value={`Rent`}>Rent</option>
                            <option value={`Food`}>Food</option>
                            <option value={`Utilities`}>Utilities</option>
                            <option value={`Shopping`}>Shopping</option>
                            <option value={`Salary`}>Salary</option>
                            <option value={`Investments`}>Investments</option>
                            <option value={`Freelance`}>Freelance</option>
                            <option value={`Other`}>Other</option>
                           </select>
                           </label>
                          
                          <label htmlFor="date-input">Date of transaction
                           <input 
                           type="date"
                           id="date-input"
                           value={newTransaction.date_of_transaction}
                           onChange={(e) => setNewTransaction(prev => ({
                            ...prev,
                            date_of_transaction: e.target.value
                           }))}
                           className="border-slate-300 cursor-pointer border w-[95%] mx-auto px-3 py-2 rounded-xl mt-2"
                           />
                           </label>
                           
                           <label htmlFor="note-input">Note
                           <textarea 
                           placeholder="Optional note"
                           id="note-input"
                           value={newTransaction.note}
                           onChange={(e) => setNewTransaction(prev => ({
                            ...prev,
                            note: e.target.value
                           }))}
                           className="border-slate-300 border px-3 py-2 rounded-xl w-full mt-2"
                           
                           />
                           </label>

                        </div>

                        <div className="mt-2 flex justify-between px-2">
                        <button className="cursor-pointer after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:block"  onClick={() => setAddingTransaction(false)}>Cancel</button>
                        <button className="cursor-pointer after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:block" onClick={handleAddTransaction}>Add</button>
                        </div>
                    </div>
                </div>
            )

            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto p-6 mt-12">
            { transactions.map(((transaction: Transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} deleteTransaction={deleteTransaction} updateTransaction={updateTransaction}/>
            )))

            }
            </div>
        </>
    )
}