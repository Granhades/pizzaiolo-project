// src/pages/HomePage.js
import React from "react";

function HomePage() {
    return (
        <div className="min-h-screen bg-yellow-50">
            {/* Hero */}
            <header className="max-w-5xl mx-auto px-6 py-16 text-center">
                <h1 className="text-5xl font-extrabold text-red-700">🍕 Pizzaiolo</h1>
                <p className="mt-4 text-gray-700 text-lg">
                    Hi! I’m <span className="font-semibold">Granhades</span>. This is my full-stack pizza ordering app.
                    The backend is built with <span className="font-semibold">Java (Spring Boot)</span> and{" "}
                    <span className="font-semibold">MongoDB</span>, while the frontend is{" "}
                    <span className="font-semibold">React + JavaScript</span>.
                </p>

                {/* Tech badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-white shadow text-sm">React</span>
                    <span className="px-3 py-1 rounded-full bg-white shadow text-sm">JavaScript</span>
                    <span className="px-3 py-1 rounded-full bg-white shadow text-sm">Tailwind CSS</span>
                    <span className="px-3 py-1 rounded-full bg-white shadow text-sm">Spring Boot</span>
                    <span className="px-3 py-1 rounded-full bg-white shadow text-sm">MongoDB Atlas</span>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <a
                        href="https://github.com/Granhades/pizzaiolo-project"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition"
                    >
                        📂 View Repository
                    </a>
                    <a
                        href="/menu"
                        className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition"
                    >
                        🍕 Open Menu
                    </a>
                </div>
            </header>

            {/* Overview */}
            <main className="max-w-5xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-6">
                <section className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-bold text-red-700 mb-3">Project Overview</h2>
                    <ul className="list-disc list-inside text-gray-800 space-y-2">
                        <li>🍴 Customers browse the menu, add items to a basket, and place orders</li>
                        <li>👨‍🍳 Kitchen staff can track incoming orders and update their status</li>
                        <li>🛠 Admins manage dishes (CRUD) and monitor orders</li>
                        <li>💾 Backend data stored in MongoDB Atlas</li>
                    </ul>
                </section>

                <section className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-bold text-red-700 mb-3">Backend Architecture</h2>
                    <p className="text-gray-700">
                        The backend follows a layered design with <strong>Order</strong>, <strong>Dish</strong>,{" "}
                        <strong>User</strong>, and <strong>OrderItem</strong> entities, plus repositories and controllers.
                    </p>
                    <div className="mt-4 flex gap-3 flex-wrap">
                        <a
                            href="https://raw.githubusercontent.com/Granhades/pizzaiolo-project/main/backend-uml-structure.png"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-yellow-100 hover:bg-yellow-200 text-red-700 font-semibold px-4 py-2 rounded-lg shadow transition"
                        >
                            📐 View UML
                        </a>
                    </div>
                </section>

                <section className="bg-white rounded-2xl shadow p-6 md:col-span-2">
                    <h2 className="text-xl font-bold text-red-700 mb-3">About Me</h2>
                    <p className="text-gray-700">
                        I’m <span className="font-semibold">Granhades</span>, building this project to practice and
                        showcase full-stack development. I’m focused on clean architecture, backend development in Java,
                        and modern frontend with React.
                    </p>
                    <div className="mt-4">
                        <a
                            href="https://github.com/Granhades"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-black text-white font-semibold px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
                        >
                            ⭐ GitHub Profile
                        </a>
                    </div>
                </section>
            </main>

            <footer className="text-center text-xs text-gray-500 pb-8">
                © {new Date().getFullYear()} Pizzaiolo • Built with ❤️ by Granhades
            </footer>
        </div>
    );
}

export default HomePage;
