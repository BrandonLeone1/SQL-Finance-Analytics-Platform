import { useEffect } from "react"
import Navbar from "../components/Navbar"
import ExpensePieChart from "../components/ExpensePieChart"
import IncomePieChart from "../components/IncomePieChart"
import LineChartExpLast7 from "../components/LineChartExpLast7"
import { BudgetComparison } from "../components/BudgetComparison"
import { AllTimeCard } from "../components/AllTimeCard"
import { Link } from "react-router-dom"

export default function Dashboard ({loadingCategorized, getTotalExpensesAndIncome, totalExpensesAndIncome, getExpAndIncCategorized, expCategorized, incomeCategorized, getExpensesAndIncomeThisMonth, expensesAndIncomeThisMonth, getExpensesAndIncomeLastMonth, expensesAndIncomeLastMonth, getExpenseTotalThisWeek, expenseTotalThisWeek, getExpenseTotalPrevWeek, expenseTotalPrevWeek, getExpenseAmountPerDayLast7, expenseAmountPerDayLast7, getGreatestExpenseThisWeek, greatestExpenseThisWeek, getBudgetComparisonInfo, budgetComparisonInfo, loadingOverview}) {

    useEffect(() => {
    getTotalExpensesAndIncome();
    getExpAndIncCategorized();
    getExpensesAndIncomeThisMonth();
    getExpensesAndIncomeLastMonth();
    getExpenseTotalThisWeek();
    getExpenseTotalPrevWeek();
    getExpenseAmountPerDayLast7();
    getGreatestExpenseThisWeek();
    getBudgetComparisonInfo();
    },[])
   
    const savingsRateThisMonth = (((expensesAndIncomeThisMonth.Income - expensesAndIncomeThisMonth.Expense) / expensesAndIncomeThisMonth.Income) * 100).toFixed(2);
    const savingsRateLastMonth = (((expensesAndIncomeLastMonth.Income - expensesAndIncomeLastMonth.Expense) / expensesAndIncomeLastMonth.Income) * 100).toFixed(2);
     
    
    return (
        <>
        <Navbar />

        <div className="max-w-7xl p-6 mx-auto">

        <section className="border-2 mt-18 p-2 border-slate-300 rounded-lg">
        <p className="text-3xl font-semibold">All-time overview:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mx-auto">

            <AllTimeCard totalExpensesAndIncome={totalExpensesAndIncome} title={`Total income:`} value={totalExpensesAndIncome ? totalExpensesAndIncome.Income : ""} loadingOverview={loadingOverview}/>
            <AllTimeCard totalExpensesAndIncome={totalExpensesAndIncome} title={`Total expenses:`} value={totalExpensesAndIncome ? totalExpensesAndIncome.Expense : ""} loadingOverview={loadingOverview}/>
            <AllTimeCard totalExpensesAndIncome={totalExpensesAndIncome} title={`Net balance:`} value={totalExpensesAndIncome ? (totalExpensesAndIncome.Income - totalExpensesAndIncome.Expense) : ""} loadingOverview={loadingOverview}/>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-200/50 p-6 mt-12 rounded-xl">
            <div>
                <IncomePieChart incomeCategorized={incomeCategorized} loadingCategorized={loadingCategorized}/>
            </div>

            <div>
                <ExpensePieChart expCategorized={expCategorized} loadingCategorized={loadingCategorized}/>
            </div>
        </div>
        </section>

        <section className="border-2 mt-24 p-2 border-slate-300 rounded-lg">
        <p className="text-3xl font-semibold">Monthly performance:</p>
        
        { !Number.isNaN(Number(savingsRateThisMonth)) && (
        <p className="mt-3 bg-slate-200 px-2 py-1 rounded-xl w-fit font-medium">{Number(savingsRateThisMonth) > 0 ? "You're managing your finaces well this month!" : "Your finances need some attention this month"}</p>
        )
    }
            
        
    
      
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 bg-white p-6 rounded-xl">
                <div className={`mx-auto w-full h-full text-center bg-linear-to-br from-slate-200 to-slate-100 px-4 py-6 rounded-xl flex flex-col gap-3 justify-center items-center`}>
                    <p className="text-sm text-slate-900 font-medium">Savings rate</p>

                    { !Number.isNaN(Number(savingsRateThisMonth)) ? (   
                    <>
                    <p className={`text-2xl ${Number(savingsRateThisMonth) >= 0 ? 'text-emerald-700' : 'text-rose-800'}`}>{Math.abs(Number(savingsRateThisMonth))}%</p>
                    <p className="text-xs text-slate-900">{Number(savingsRateThisMonth) < 0 ? "more than your income has been spent" : "of your income has been saved"}</p>

                    <p className="text-xs text-slate-900">{Number(savingsRateLastMonth) < 0 ? `Last month: ${Math.abs(Number(savingsRateLastMonth))}% more than income was spent` : `Last month: ${Math.abs(Number(savingsRateLastMonth))}% of your income was saved`}</p>
                    </>
                    ) : (
                        <p className="text-xs text-slate-900">No data yet</p>
                    )
                    }
                </div>

                <div className="mx-auto text-center w-full h-full bg-white border-slate-200 border justify-center flex flex-col gap-4 px-4 py-6 rounded-xl">
                    <p className="font-medium text-sm">Simple overview</p>
                    
                    { !Number.isNaN(expensesAndIncomeLastMonth.Income) && expensesAndIncomeLastMonth.Income !== 0 && expensesAndIncomeLastMonth.Income ? (
                     <>   
                    <div className="flex gap-2 justify-between">
                        <div className="flex flex-col gap-1">
                        <p className="text-sm text-emerald-700">Income:</p>
                        <p className="text-xl">${expensesAndIncomeThisMonth.Income}</p>
                        </div>

                        <div className="flex flex-col gap-1">
                        <p className="text-sm text-rose-800">Expenses:</p>
                        <p className="text-xl">${expensesAndIncomeThisMonth.Expense}</p>
                        </div>
                    </div>

                    <div className="w-full h-6.25 bg-black rounded-xl">
                        <div style={{width: `${(expensesAndIncomeThisMonth.Expense / expensesAndIncomeThisMonth.Income) * 100 > 100 ? 100 : (expensesAndIncomeThisMonth.Expense / expensesAndIncomeThisMonth.Income) * 100}%`}} className="h-6.25 rounded-xl bg-rose-800"></div>
                    </div>
                    <p className="text-rose-800">{((expensesAndIncomeThisMonth.Expense / expensesAndIncomeThisMonth.Income) * 100).toFixed(2)}%</p>
                    </>
                    ) : (
                        <p className="text-xs text-slate-900">No data yet</p>
                    ) 
                }

                </div>

                <div className={`mx-auto px-4 py-6 rounded-xl text-center w-full h-full flex flex-col gap-3 items-center justify-center ${expensesAndIncomeThisMonth.Income - expensesAndIncomeThisMonth.Expense < 0 ? "bg-linear-to-br from-rose-100 to-white" : expensesAndIncomeThisMonth.Income - expensesAndIncomeThisMonth.Expense === 0 ? "bg-slate-100 border border-slate-300" : "bg-linear-to-br from-emerald-50 to-white"}`}>
                    <p className="text-sm font-medium" >Net monthly result</p>
                    
                    { expensesAndIncomeThisMonth.Income && expensesAndIncomeThisMonth.Income !== 0 ? (
                    <>
                    <p className="text-2xl">${expensesAndIncomeThisMonth.Income - expensesAndIncomeThisMonth.Expense}</p>
                    <div className="flex gap-2 items-center text-sm">
                    <p>{expensesAndIncomeThisMonth.Income - expensesAndIncomeThisMonth.Expense < 0 ? "You're losing money" : "You're saving money"}</p>
                    <i className={`${expensesAndIncomeThisMonth.Income - expensesAndIncomeThisMonth.Expense < 0 ? 'fa-solid fa-triangle-exclamation text-rose-800' : 'fa-solid fa-thumbs-up text-emerald-700'}`}></i>
                    </div>
                    </>
                    ) : (
                        <p className="text-xs text-slate-900">No data yet</p>
                    )
                    }
                </div>
            </div>
</section>
            
            <section className="border-2 mt-24 p-2 border-slate-300 rounded-lg">
            <p className="text-3xl font-semibold">Weekly activity:</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
                <div className="mt-6 bg-slate-200/80 px-6 py-4 gap-4 rounded-xl flex flex-col justify-around md:flex-row lg:flex-col">
                    <p className="text-lg font-medium md:my-auto lg:my-0">Insights:</p>

                    <div className="bg-white p-4 w-fit rounded-xl flex flex-col gap-2">
                    <p className="text-sm">Avg. daily spending (last 7 days):</p>
                    
                    { expenseTotalThisWeek.Expense && expenseTotalThisWeek.Expense !== 0 ? (
                    <>
                    <p className="text-2xl">${(expenseTotalThisWeek.Expense / 7).toFixed(2)}</p>
                    <p className={`text-sm ${expenseTotalPrevWeek > expenseTotalThisWeek ? "text-emerald-700" : "text-rose-800"}`}>{expenseTotalPrevWeek > expenseTotalThisWeek ? "You're spending less than last week!" : "You're spending more than last week!"}</p>
                    </>
                    ) : (
                        <p className="text-xs text-slate-900">No data yet</p>
                    )
                    }
                    </div>

                    <div className="bg-linear-to-br from-yellow-50 to-white p-4 w-fit rounded-xl flex flex-col gap-2 md:justify-center">
                        <p className="text-sm font-medium">You're currently spending the most on:</p>
                        { greatestExpenseThisWeek ? (
                        <div className="flex gap-1">    
                            <p>{greatestExpenseThisWeek.category}</p>
                            <p>${greatestExpenseThisWeek.sum}</p>
                        </div>
                        ) : (
                            <p className="text-xs text-slate-900">No data yet</p>
                        )
                        }
                    </div>
                </div>

                <div className="lg:col-span-2 pt-4">
                    <LineChartExpLast7 expenseAmountPerDayLast7={expenseAmountPerDayLast7}/>
                </div>
            </div>
</section>
                        
            <section className="border-2 mt-24 p-2 border-slate-300 rounded-lg">
            <p className="text-3xl font-semibold">Budget risk:</p>
            { budgetComparisonInfo.length < 1 && (
                <div className="mt-6 text-lg flex flex-col gap-3">
                <p>No budgets created yet!</p>
                <p>Head over to the <Link to={`/budgets`} className="underline hover:opacity-75 duration-150 text-indigo-400">budgets page</Link> to add some!</p>
                </div>
            )

            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {budgetComparisonInfo.toSorted((a,b) => b.sum - a.sum).map((budgetInfo => (
               <BudgetComparison key={budgetInfo.category} budgetInfo={budgetInfo} />
            )))

            }
            </div>

            </section>

        </div>
        
        </>
    )
}