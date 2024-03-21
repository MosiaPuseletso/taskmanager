'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/redux/store";

import { createAccount } from "@/src/api";

export default function SignUp() {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const form = document.querySelector("form");

        const handleSubmit = (event: any) => {
            event.preventDefault();

            const email = document.getElementById('email') as HTMLInputElement;
            const password = document.getElementById('password') as HTMLInputElement;
            const confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement;

            if (password.value !== confirmPassword.value) {
                alert("Passwords do not match. Please try again.");
                return;
            } else {
                const newAccount = {
                    email: email.value,
                    password: password.value,
                };
                dispatch(createAccount(newAccount)).then(() => {
                    router.push('/signin');
                });
                
            }
        };

        form?.addEventListener("submit", handleSubmit);

        return () => {
            form?.removeEventListener("submit", handleSubmit);
        };
    }, [dispatch]);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm z-10">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
                        </div>
                        <div className="mt-2">
                            <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member? <Link href='/signin' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</Link>
                </p>
            </div>
        </div>
    )
}