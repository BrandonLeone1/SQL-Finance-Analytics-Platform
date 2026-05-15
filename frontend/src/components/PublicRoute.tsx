import { Navigate } from "react-router-dom";

export default function PublicRoute ({activeUser, children, loadingUser}) {

    if (loadingUser) {
        return (
            <div className="p-6">
                <p>Waking up server... this could take up to a minute</p>
            </div>
        )
    }
    
    if (activeUser) {
        return <Navigate to={`/dashboard`} />
    }

    return children
}