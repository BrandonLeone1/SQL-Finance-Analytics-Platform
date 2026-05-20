import {Link} from 'react-router-dom';

export default function Info () {
    return (
        <>
        <div className="max-w-5xl mx-auto p-6 flex items-center justify-center h-screen">
        
        <div className="flex flex-col gap-6 p-6 border rounded-xl border-slate-400">
        <p className="text-3xl font-semibold">How is signup/login being handled and where is my data stored?</p>
        
        <p className="max-w-[65ch] text-lg">When you signup your password is securely handled via Bcrypt. It is hashed and stored in a securely hosted PostgreSQL database. Your data is used for nothing other than logging in. The email address given is not required to be valid - there is no account verification. </p>
        
        <Link to={`/`} className="underline hover:opacity-75 text-indigo-400 duration-150 text-sm w-fit">Back to signup</Link>
        </div>
        </div>
        </>
    )
}