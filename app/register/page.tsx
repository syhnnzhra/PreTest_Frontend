"use client";
import React, { useState, ChangeEvent } from "react";
import TextInput from "../components/form/inputText";
import { redirect } from 'next/navigation'

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmationChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordConfirmation(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(
                "https://book-crud-service-6dmqxfovfq-et.a.run.app/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        password_confirmation: passwordConfirmation,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                setError(true);
                setErrorMessage(errorData.message);
            } else {
                console.log("Registration successful");
                redirect('/');
            }
        } catch (error) {
            setError(true);
            setErrorMessage("An error occurred while registering");
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    Register
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="#"
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <TextInput
                            label="Name"
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleNameChange}
                        />

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
                            autoComplete="new-password"
                            required
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />

                        <TextInput
                            label="Confirm Password"
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            type="password"
                            autoComplete="new-password"
                            required
                            placeholder="Confirm your password"
                            value={passwordConfirmation}
                            onChange={handlePasswordConfirmationChange}
                        />

                        <div>
                            <button
                                type="button"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </button>
                        </div>
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                            role="alert"
                        >
                            {errorMessage}
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default RegisterPage;
