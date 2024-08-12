import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI } from "../services/operations/authAPI";
import Input from "../components/common/Input";
import Password from "../components/common/Password";

const Login = () => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const submit = async (data) => {
        await dispatch(loginAPI({data, navigate}));
    };

    return (
        <div className="w-full h-full min-h-screen flex items-center justify-center flex-col py-10 px-2">
            <h1 className="text-[2rem] leading-[3rem] font-semibold mb-3">
                FlashCards
            </h1>
            <div className="w-full h-full max-w-[720px] flex items-center flex-col p-8 border">
                <h1 className="text-2xl mb-6 w-full">Login</h1>
                <form
                    onSubmit={handleSubmit(submit)}
                    className="w-full flex flex-col gap-4"
                >
                    <Input
                        star="true"
                        label="Email"
                        placeholder="email@address.com"
                        type="text"
                        className="bg-transparent"
                        name="email"
                        errors={errors?.email}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />

                    <Password
                        star="true"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        name="password"
                        className="bg-transparent"
                        errors={errors?.password}
                        {...register("password", {
                            required: "Enter a Password",
                        })}
                    />

                    <button
                        type="submit"
                        className="max-w-max px-3 py-2 bg-blue-500 text-white "
                        disabled={loading}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
