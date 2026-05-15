import { Navigate } from "react-router-dom";


export default function ProtectedRoute({activeUser, children, loadingUser}) {

   if (loadingUser) {
        return (
            <div className="p-6 flex items-center justify-center h-screen">
                <p className="text-center">Waking up server... this could take up to a minute</p>
            </div>
        )
    }
   
    if (!activeUser || activeUser === null) {
    return <Navigate to={`/login`} />
   }
    
    return children
}