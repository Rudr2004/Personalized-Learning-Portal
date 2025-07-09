import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:2000/api/v1/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.status) {
                localStorage.setItem("registeredUser", data.data.token);
                toast.success("Registered Successfully");
                navigate("/login");
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
            <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-lg p-8 border border-slate-300/20 shadow-xl">
                <h2 className="text-2xl text-center font-bold text-white mb-2">Join LearnHub</h2>
                <p className="text-slate-300 mb-6 text-sm text-center">Create your free account below.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="bg-transparent border border-slate-300/30 text-white placeholder-slate-400 focus:border-cyan-400"
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="bg-transparent border border-slate-300/30 text-white placeholder-slate-400 focus:border-cyan-400"
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="bg-transparent border border-slate-300/30 text-white placeholder-slate-400 focus:border-cyan-400"
                        required
                    />
                    <Button
                        type="submit"
                        className="w-full mt-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-2 shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Register
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm text-slate-300">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="underline cursor-pointer hover:text-cyan-300"
                    >
                        Login
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;
