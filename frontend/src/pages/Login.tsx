import { useState } from "react"
import { Link } from "react-router-dom";
export default function Login ({loginUser}) {
    
    const [existingUser, setExistingUser] = useState({
        email: "",
        password: ""
    })

    async function handleLogin() {
        await loginUser(existingUser);

        setExistingUser({
            email: "",
            password: ""
        })
    }
    
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-6 rounded-lg flex flex-col gap-4">
                    <p className="text-xl font-medium">Login to Finance Tracker</p>

                    <label htmlFor="email-input">Your email:
                    <input 
                    type="email"
                    id="email-input"
                    placeholder="Email"
                    value={existingUser.email}
                    onChange={(e) => setExistingUser(prev => ({
                        ...prev,
                        email: e.target.value
                    }))}
                    className="border-slate-300 border px-3 py-2 rounded-xl w-full mt-2"
                    /></label>

                    <label htmlFor="password-input">Your password:
                    <input 
                    type="password"
                    id="password-input"
                    placeholder="Password"
                    value={existingUser.password}
                    onChange={(e) => setExistingUser(prev => ({
                        ...prev,
                        password: e.target.value
                    }))}
                    className="border-slate-300 border px-3 py-2 rounded-xl w-full mt-2"
                    />
                    </label>
                    <button className=" border-2 w-fit px-5 py-2 mx-auto cursor-pointer rounded-lg border-slate-500 hover:bg-indigo-50 hover:border-slate-400 duration-150" onClick={handleLogin}>Login</button>
                <div className="text-sm flex gap-2 items-center">
            
                <p className="mt-0.5">Don't have an account?</p>
                <Link to={`/`} className="underline hover:opacity-75 font-medium text-indigo-400 duration-150">Signup here</Link>
                </div>
                
                </div>
            </div>
        </>
    )
}