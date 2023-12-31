/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import TextInput from "../components/form/inputText";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { userLogin } from "@/lib/UserAuth";

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        // event.preventDefault();

        const response = await userLogin({ email, password });
        // Your form submission logic here
        if (response != "User authenticated") {
            setError(true);
            setErrorMessage(response);
        }
    };
    return (
        <>
            <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="w-auto h-10 mx-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="#"
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        {error && (
                            <div
                                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                                role="alert"
                            >
                                <span className="font-medium">
                                    Warning alert!
                                </span>{" "}
                                {errorMessage}
                            </div>
                        )}
                        <TextInput
                            label="Email address"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />

                        <TextInput
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />

                        <div>
                            <button
                                type="button"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleSubmit}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-sm text-center text-gray-500">
                        Not a member?{" "}
                        <a
                            href="#"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};
export default page;
