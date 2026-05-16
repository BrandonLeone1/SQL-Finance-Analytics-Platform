export function AllTimeCard ({totalExpensesAndIncome, title, value, loadingOverview}) {
    

    if (loadingOverview) {
        return (
            <div className={`gap-3 animate-pulse  flex flex-col mx-auto text-center w-full h-full p-4 py-6 rounded-xl border border-slate-300`}>
                <div className="w-[80%] h-6.25 mx-auto bg-slate-300 rounded-xl">

                </div>
                <div className="w-[80%] h-6.25 mx-auto bg-slate-300 rounded-xl">

                </div>
            </div>
        )
    }
    
    if (!totalExpensesAndIncome || value === undefined || value === null) {
        return (
            <div className={`gap-3 ${title === 'Total income:' ? 'bg-linear-to-br from-emerald-50 to-white' : title === 'Total expenses:' ? 'bg-linear-to-br from-rose-50 to-white' : 'bg-slate-200 border border-slate-400/80'} flex flex-col mx-auto text-center w-full h-full p-4 py-6 rounded-xl border border-slate-300`}>
            <p className="text-base font-medium">{title}</p>
            <p>No data yet</p>
            </div>
        )
    }
    
    return (
        <>
            <div className={`${value === totalExpensesAndIncome.Income ? 'bg-linear-to-br from-emerald-50 to-white' : value === totalExpensesAndIncome.Expense ? 'bg-linear-to-br from-rose-50 to-white' : `${totalExpensesAndIncome ? totalExpensesAndIncome.Income - totalExpensesAndIncome.Expense > 0 ? "bg-linear-to-br from-emerald-500 to-emerald-800" : totalExpensesAndIncome.Income - totalExpensesAndIncome.Expense === 0 ? "bg-white border border-slate-300" : "bg-linear-to-br from-rose-500 to-rose-800 text-white" : ""} ${value === (totalExpensesAndIncome.Income - totalExpensesAndIncome.Expense) && 'md:col-span-2 lg:col-span-1'} `} flex flex-col gap-3 mx-auto text-center w-full h-full p-4 py-6 rounded-xl border border-slate-300`}>
                <p className="text-base font-medium">{title}</p>
                <p className="text-2xl">{totalExpensesAndIncome && value ? `$${value}` : "No data yet"}</p>
               
            </div>
        </>
    )
}