import { useState } from 'react';
import {Link, NavLink} from 'react-router-dom';

export default function Navbar () {
    
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <header className="w-full sticky z-60 top-0 bg-slate-50 border-b border-slate-200/80">
                <nav className="flex justify-between items-center gap-4 max-w-7xl p-6 mx-auto">
                    <div className="text-2xl font-medium">
                        <Link to={`/dashboard`} className='hover:opacity-70 duration-100' onClick={() => setIsOpen(false)}>Financial Tracker</Link >
                    </div>

                    <div 
                    onClick={() => setIsOpen(prev => !prev)}
                    className='md:hidden border flex flex-col gap-1 border-slate-700 cursor-pointer px-1 py-2 rounded-[50%] items-center justify-center fixed top-6.5 right-6 z-90 hover:bg-slate-200/60 duration-150 hover:border-slate-600'>
                        <div className={`${isOpen && "rotate-45 translate-y-0.75 duration-150"} duration-150 bg-slate-700 w-4.25 h-0.75`}></div>
                        <div className={`${isOpen && "-rotate-45 -translate-y-0.75 duration-150"} duration-150 bg-slate-700 w-4.25 h-0.75`}></div>
                    </div>
                    
                    <div className="md:flex gap-4 text-lg font-medium hidden">
                        <NavLink to={`/dashboard`} className={({isActive}) => isActive ? `after:w-full after:h-0.5 after:block after:bg-indigo-400 hover:opacity-70 duration-100` : `after:w-full after:h-0.5 after:block hover:opacity-70 duration-100`}>Dashboard</NavLink>
                        <NavLink to={`/transactions`} className={({isActive}) => isActive ? `after:w-full after:h-0.5 after:block after:bg-indigo-400 hover:opacity-70 duration-100` : `after:w-full after:h-0.5 after:block hover:opacity-70 duration-100`}>Transactions</NavLink>
                        <NavLink to={`/budgets`} className={({isActive}) => isActive ? `after:w-full after:h-0.5 after:block after:bg-indigo-400 hover:opacity-70 duration-100` : `after:w-full after:h-0.5 after:block hover:opacity-70 duration-100`}>Budgets</NavLink>
                    </div>
                </nav>

            { isOpen && (
                <div className='fixed inset-0 bg-slate-50 md:hidden flex items-center -mt-24 p-4'>
                    <div className='flex flex-col gap-4 w-full text-xl'>
                        <Link to={`/dashboard`} onClick={() => setIsOpen(false)} className='hover:bg-slate-200 px-4 py-2 rounded-lg duration-150 opacity-85 hover:opacity-100'>Dashboard</Link>
                        <Link to={`/transactions`} onClick={() => setIsOpen(false)} className='hover:bg-slate-200 px-4 py-2 rounded-lg duration-150 opacity-85 hover:opacity-100'>Transactions</Link>
                        <Link to={`/budgets`} onClick={() => setIsOpen(false)} className='hover:bg-slate-200 px-4 py-2 rounded-lg duration-150 opacity-85 hover:opacity-100'>Budgets</Link>
                    </div>
                </div>
            )

            }
            </header>
        </>
    )
}