// src/components/Price.jsx
import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Price = () => {                                        
    const { currentUser } = useSelector(state => state.user);
    return (
        <div className='w-full dark:text-white py-32'>
            <div className="container mx-auto max-w-screen-lg">
                <div>
                    <h2 className="text-3xl font-bold tracki text-center mt-12 sm:text-5xl">Pricing</h2>
                    <p className="max-w-3xl mx-auto mt-4 text-xl text-center">Get started on our free plan and upgrade when you are ready.</p>
                </div>
                <div className="mt-24 grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="relative p-8 border border-gray-200 rounded-2xl shadow-lg flex flex-col">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">Free</h3>
                            <p className="mt-4 flex items-baseline">
                                <span className="text-5xl font-extrabold tracking-tight">$0</span><span className="ml-1 text-xl font-semibold">/month</span>
                            </p>
                            <p className="mt-6">You just want to discover</p>
                            <ul role="list" className="mt-6 space-y-6">
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">10 Credits</span>
                                </li>
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">Generate video (2 credits)</span>
                                </li>
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">Quizz (1 credit)</span>
                                </li>
                            </ul>
                        </div>
                        {currentUser ? (
                            <div className="mt-8 flex justify-center">
                                <stripe-buy-button
                                    buy-button-id="buy_btn_1Po200HBpqHCFPe1TUiPHScT"
                                    publishable-key="pk_test_51PTQvdHBpqHCFPe1MyLl4KND4al0GQE2z7SwMta8kKQDnthQdT2VVxMwfXJtqA33gVM02vcRLYWltwi7XNt7u1wx00iuPoz789"
                                >
                                </stripe-buy-button>
                            </div>
                        ) : (
                            <a className="bg-purple-50 text-purple-700 hover:bg-purple-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium" href='/sign-up'>
                                Signup for free
                            </a>
                        )}
                    </div>
                    <div className="relative p-8 border border-gray-200 rounded-2xl shadow-lg flex flex-col">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">Pro</h3>
                            <p className="absolute top-0 py-1.5 px-4 bg-purple-700 text-white rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
                                Most popular
                            </p>
                            <p className="mt-4 flex items-baseline">
                                <span className="text-5xl font-extrabold tracking-tight">$12</span><span className="ml-1 text-xl font-semibold">/month</span>
                            </p>
                            <p className="mt-6">You want to learn and have a personal assistant</p>
                            <ul role="list" className="mt-6 space-y-6">
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">30 credits</span>
                                </li>
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">Powered by GPT-4 (more accurate)</span>
                                </li>
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">Generate video (2 credits)</span>
                                </li>
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">Quizz (1 credit)</span>
                                </li>
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">Analytics on the quizz</span>
                                </li>
                            </ul>
                        </div>
                        {currentUser ? (
                            <div className="mt-8 flex justify-center">
                                <stripe-buy-button
                                    buy-button-id="buy_btn_1Po1RUHBpqHCFPe17LVl66Jh"
                                    publishable-key="pk_test_51PTQvdHBpqHCFPe1MyLl4KND4al0GQE2z7SwMta8kKQDnthQdT2VVxMwfXJtqA33gVM02vcRLYWltwi7XNt7u1wx00iuPoz789"
                                >
                                </stripe-buy-button>
                            </div>
                        ) : (
                            <a className="bg-purple-50 text-purple-700 hover:bg-purple-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium" href='/sign-up'>
                                Signup for free
                            </a>
                        )}
                    </div>
                    <div className="relative p-8 border border-gray-200 rounded-2xl shadow-lg flex flex-col">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">Enterprise</h3>
                            <p className="mt-4 flex items-baseline">
                                <span className="text-5xl font-extrabold tracking-tight">$30</span><span className="ml-1 text-xl font-semibold">/month</span>
                            </p>
                            <p className="mt-6">For businesses that need more features</p>
                            <ul role="list" className="mt-6 space-y-6">
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">Unlimited credits</span>
                                </li>
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">Priority support</span>
                                </li>
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">Generate video (1 credit)</span>
                                </li>
                                <li className="flex">
                                    <FaRegCheckCircle className="flex-shrink-0 w-6 h-6 text-purple-700" />
                                    <span className="ml-3">Advanced analytics</span>
                                </li>
                            </ul>
                        </div>
                        {currentUser ? (
                            <div className="mt-8 flex justify-center">
                                <stripe-buy-button
                                    buy-button-id="buy_btn_1Po1wvHBpqHCFPe10lKOYsm5"
                                    publishable-key="pk_test_51PTQvdHBpqHCFPe1MyLl4KND4al0GQE2z7SwMta8kKQDnthQdT2VVxMwfXJtqA33gVM02vcRLYWltwi7XNt7u1wx00iuPoz789"
                                >
                                </stripe-buy-button>
                            </div>
                        ) : (
                            <a className="bg-purple-50 text-purple-700 hover:bg-purple-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium" href='/sign-up'>
                                Signup for free
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Price;
