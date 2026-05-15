export function DeleteModal ({item, setFunction, deleteFunction}) {
    return (
    
    <div className="flex justify-center p-6 items-center fixed inset-0 z-80 bg-black/80 h-screen backdrop-blur-sm">
                    <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
                        <p className="text-xl max-w-[65ch]">Are you sure you would like to delete {item.category}:</p>
                        <div className="flex gap-2 mx-auto">
                        <p className="text-center">{item.category}</p>
                        <p className="text-center">${item.budget_limit || item.amount}?</p>
                        </div>

                        <div className="flex justify-between gap-2">
                        <button onClick={() => setFunction(false)} className="cursor-pointer after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:block">Cancel</button>
                        <button onClick={() => deleteFunction(item.id)} className="cursor-pointer after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:block">Delete</button>
                        </div>
                    </div>
                </div>
    )
}