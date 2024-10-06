import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function SignUp() {
    const navigation = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
            const userCredential = await auth.createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;

            navigation("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-blue-500 p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-semibold text-white mb-4">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <input
                        className="w-full mb-2 p-2 border rounded"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="w-full mb-2 p-2 border rounded"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className="w-full bg-blue-500 text-black py-2 rounded"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
                <p className="mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500">Log In</Link>
                </p>
            </div>
        </div>
  )
}
