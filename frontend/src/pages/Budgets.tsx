import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { BudgetCard } from "../components/BudgetCard";
import type { Budget } from "../types/Budget";

export function Budgets ({loadingBudgets, budgets, getBudgets, addBudget, deleteBudget, updateBudget}) {
    
    useEffect(() => {
        getBudgets();
    },[])
    
    const existingBudgets = budgets.map((budget: Budget) => {
        return budget.category
    })

    const [newBudget, setNewBudget] = useState({
        category: "",
        budget_limit: ""
    });

    const [addingBudget, setAddingBudget] = useState(false);

    async function handleAddBudget () {
        
        if(!newBudget.category || !newBudget.budget_limit) {
            setAddingBudget(false);
            return;
        }
        
        await addBudget(newBudget);
        setNewBudget({
            category: "",
            budget_limit: ""
        });
        setAddingBudget(false);
    }

    useEffect(() => {
         if (addingBudget) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
    }, [addingBudget])

    

     if (loadingBudgets) {
        return (
            
            <div className="flex items-center justify-center h-screen">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-400 border-t-transparent"></div>
            </div>
        )
    }
    
    return (
        <>
        <Navbar />
            <p className="text-3xl font-semibold mt-24 text-center">Budgets</p>
            <div className="flex items-center justify-center gap-4">
            <p className="text-xl font-medium text-center mt-6">Current amount: ({budgets.length})</p>
            
            <button onClick={() => setAddingBudget(true)} aria-label="Add a new budget">
            <i aria-label="Add new transaction button" className="fa-regular fa-square-plus text-2xl cursor-pointer font-medium mt-6 text-center text-emerald-700 hover:text-emerald-950 duration-100"></i>
            </button>
            </div>

            { addingBudget && (
                <div className="flex p-6 justify-center items-center fixed inset-0 z-80 backdrop-blur-sm bg-black/80 h-screen">
                    <div className="flex flex-col gap-4 bg-white rounded-xl p-6">
                        
                        <label htmlFor="category-select">Choose category
                        <select
                        id="category-select"
                        value={newBudget.category}
                        onChange={(e) => setNewBudget(prev => ({
                            ...prev, 
                            category: e.target.value
                        }))}
                        className="border border-slate-300 px-3 py-2 rounded-xl w-full mt-2 cursor-pointer"
                        >
                            <option value={``} disabled>Choose</option>
                            
                            { !existingBudgets.includes('Rent') ? (
                            <option value={`Rent`}>Rent</option>
                            ) : (
                                <option value={``} disabled>Rent</option>
                            )
                            }
                            
                            {!existingBudgets.includes('Food') ? (
                            <option value={`Food`}>Food</option>
                            ) : (
                                <option value={``} disabled>Food</option>
                            )
                            }

                            { !existingBudgets.includes('Utilities') ? (
                            <option value={`Utilities`}>Utilities</option>
                            ) : (
                                <option value={``} disabled>Utilities</option>
                            )
                            }

                            {!existingBudgets.includes('Shopping') ? (
                            <option value={`Shopping`}>Shopping</option>
                            ) : (
                                <option value={``} disabled>Shopping</option>
                            )
                            }

                            {!existingBudgets.includes('Salary') ? (
                            <option value={`Salary`}>Salary</option>
                            ) : (
                                <option value={``} disabled>Salary</option>
                            )
                            }

                            {!existingBudgets.includes('Investments') ? (
                            <option value={`Investments`}>Investments</option>
                            ) : (
                                <option value={``} disabled>Investments</option>
                            )
                            }

                            {!existingBudgets.includes('Freelance') ? (
                            <option value={`Freelance`}>Freelance</option>
                            ): (
                                <option value={``} disabled>Freelance</option>
                            )
                            }
                            
                            {!existingBudgets.includes('Other') ? (
                            <option value={`Other`}>Other</option>
                            ) : (
                                <option value={``} disabled>Other</option>
                            )
                            }
                        </select></label>
                        
                        <label htmlFor="limit-input">Budget limit
                        <input 
                        type="number"
                        id="limit-input"
                        placeholder="Limit"
                        value={newBudget.budget_limit}
                        onChange={(e) => setNewBudget(prev => ({
                            ...prev,
                            budget_limit: e.target.value
                        }))}
                        className="border border-slate-300 px-3 py-2 rounded-xl w-full mt-2"
                        />
                        </label>
                        
                        <div className="flex gap-2 justify-between">
                        <button onClick={() => setAddingBudget(false)} className="cursor-pointer after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:block">Cancel</button>
                        <button onClick={handleAddBudget} className="cursor-pointer after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:block">Add</button>
                        </div>
                    </div>
                </div>
            )

            }

            { budgets.length < 1 && (
                <>
                <div className="flex items-center justify-center p-6">
                <p className="text-xl text-center mt-12 font-medium">Add a budget above to get started.</p>
                <p className="text-lg text-center mt-3">For information about your budgets, check the dashboard after adding some.</p>
                <p className="text-center mt-3">Get information about current spending, your limit, and the percent of the budget you have spent.</p>
                </div>
                </>
            )

            }
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto p-6 mt-12">
            { budgets.map(((budget: Budget) => (
                <BudgetCard budget={budget} key={budget.id} deleteBudget={deleteBudget} updateBudget={updateBudget}/> 
            )))

            }
            </div>
            
        </>
    )
}