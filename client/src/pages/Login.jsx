import React, { useState } from "react";
import { usersAPI } from "../api/api";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const { refetch } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await usersAPI.login({ email, password })
        if (response.user) {
            await refetch()
            navigate("/")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#1f1f1f] border border-white/10 rounded-xl p-6">
                <h1 className="text-2xl font-semibold text-white text-start">
                    Welcome Back
                </h1>
                <p className="text-gray-400 text-sm text-start mt-1">
                    Login to your account
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="
                                w-full
                                px-4 py-2.5
                                rounded-lg
                                bg-[#121212]
                                border border-white/10
                                text-gray-200
                                placeholder-gray-500
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500/30
                            "
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="
                                w-full
                                px-4 py-2.5
                                rounded-lg
                                bg-[#121212]
                                border border-white/10
                                text-gray-200
                                placeholder-gray-500
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500/30
                            "
                        />
                    </div>

                    <button
                        type="submit"
                        className="
                            w-full
                            py-2.5
                            rounded-lg
                            bg-blue-600
                            text-white
                            font-medium
                            hover:bg-blue-700
                            transition
                            "
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
