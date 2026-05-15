import { useState } from "react"
import { Link } from "react-router-dom";

export default function Signup ({addUser, addedUser}) {
    
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    async function handleAddUser() {
        await addUser(newUser);
        setNewUser({
            name: "",
            email: "",
            password: ""
        })
    }
    return (
        <>
        { addedUser && (
            <div className="bg-slate-200 fixed top-10 left-[50%] text-center translate-x-[-50%] px-8 py-8 rounded-lg border border-slate-400 text-emerald-700">
                <div>
                    <p>Added user successfully!</p>
                </div>
            </div>
        )

        }
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-lg flex flex-col gap-4">
                <p className="text-xl font-medium">Welcome to Finance Tracker</p>
                
                <label htmlFor="name-input">Your name:
                <input 
                type="text"
                id="name-input"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({
                    ...prev,
                    name: e.target.value
                }))}
                className="border px-3 py-2 rounded-xl border-slate-300 w-full mt-2"
                /></label>

                <label htmlFor="email-input">Your email:
                <input 
                type="email"
                id="email-input"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({
                    ...prev,
                    email: e.target.value
                }))}
                className="border px-3 py-2 rounded-xl border-slate-300 w-full mt-2"
                />
                </label>

                <label htmlFor="password-input">Your password:
                <input 
                type="password"
                id="password-input"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser(prev => ({
                    ...prev,
                    password: e.target.value
                }))}
                className="border px-3 py-2 rounded-xl border-slate-300 w-full mt-2"
                />
                </label>

                <button className=" border-2 w-fit px-5 py-2 mx-auto cursor-pointer rounded-lg border-slate-500 hover:bg-indigo-50 hover:border-slate-400 duration-150" onClick={handleAddUser}>Signup</button>
            
            <div className="text-sm flex gap-2 items-center">
            
            <p className="mt-0.5">Have an account?</p>
            <Link to={`/login`} className="underline hover:opacity-75 font-medium text-indigo-400 duration-150">Login here</Link>
            </div>
            
            </div>
            
        </div>

        </>
    )
}