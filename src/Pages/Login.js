import React, { useState }from "react";
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login( {setIsAuth} ){

    let navigate = useNavigate(); 
    const [email, setEmail ]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState("");

    const handleSignIn = async (e) => {
        e.preventDefault(); 
        try{
            await auth.signInWithEmailAndPassword(email, password);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/Home")
        } catch (error) {
            setError("Invaild email or password.");
        }
    };


    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true)
            navigate("/Home")
        });
    };

    return <div>
        <div className ="flex items-center justify-center h-screen">
            <div className="bg-red-500 p-6 rounded-lg shadow-md w-96">
                <p className="flex items-center justify-center text-xl font-semibold mb-4 text-white">Sign In With Email to Continue</p>
                <div>
                    <form onSubmit={handleSignIn}>
                        <input className="w-full mb-2 p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required>
                        </input>
                        <input className="w-full mb-2 p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required>
                        </input>
                        <button className="w-full bg-white py-2 rounded text-red-500" type="submit">
                        Sign In
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
                <div className="flex items-center justify-center">
                    <button className="flex items-center justify-center py-6 font-bold" onClick={signInWithGoogle}>Sign In with Google</button>
                </div> 
            </div>
        </div>
    </div>
}

export default Login; 