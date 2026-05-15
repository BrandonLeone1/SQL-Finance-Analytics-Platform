export function BudgetComparison ({budgetInfo}) {
    
    const spendingPercentage = (budgetInfo.sum / budgetInfo.budget_limit) * 100;
    
    return (
        <>
            <div className="flex flex-col gap-3 mx-auto bg-white px-6 py-6 rounded-xl w-full h-full">
                    <p className="text-xl">{budgetInfo.category}</p>
                   
                    <p>${budgetInfo.sum} / ${budgetInfo.budget_limit}</p>

                    <div className="w-full h-6.25 bg-black rounded-xl">
                        <div style={{width: `${spendingPercentage > 100 ? 100 : spendingPercentage}%`}} className={`h-6.25 ${spendingPercentage >= 0 && spendingPercentage <= 75 ? "bg-emerald-700" : spendingPercentage > 75 && spendingPercentage <= 99 ? "bg-yellow-500" : "bg-rose-800"} rounded-xl`}></div>
                    </div>
                    <p>{spendingPercentage.toFixed(2)}%</p>
                </div>

        </>
    )
}