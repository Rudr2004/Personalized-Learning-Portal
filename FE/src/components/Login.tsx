import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "@/store/slices/userSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios'
import { toast } from "sonner";

const Login = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("registeredUser");
            const res = await fetch("http://localhost:2000/api/v1/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            console.log("Server returned:", data);

            if (data.status) {
                toast.success("Logged in Successfully 🚀");
                navigate("/");
            } else {
                toast.error(data.message || "Failed to login. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Server error. Please try again later.");
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
            <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-lg p-8 border  shadow-xl">
                <h2 className="text-2xl text-center font-bold text-white mb-2">Login to LearnHub</h2>
                <p className="text-slate-300 mb-6 text-sm">Welcome back, please enter your details.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="bg-transparent border  text-white placeholder-slate-400 focus:border-cyan-400"
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="bg-transparent border text-white placeholder-slate-400 focus:border-cyan-400"
                        required
                    />
                    <Button
                        type="submit"
                        className="w-full mt-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-2 shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Login
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm text-slate-300">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="underline cursor-pointer hover:text-cyan-300"
                    >
                        Register
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
