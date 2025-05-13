import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaWallet,
  FaReceipt,
  FaExchangeAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const FinancialDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const stats = [
    { title: "Today's Sales", value: "₹12,500", icon: <FaMoneyBillWave /> },
    { title: "Cash in Hand", value: "₹5,800", icon: <FaWallet /> },
    { title: "Pending Bills", value: "₹2,300", icon: <FaReceipt /> },
    { title: "Transactions", value: "58", icon: <FaExchangeAlt /> },
  ];

  const [transactions, setTransactions] = useState([
    { id: 1, name: "Customer #1234", amount: "+₹800" },
    { id: 2, name: "Customer #1235", amount: "+₹1,200" },
    { id: 3, name: "Refund #1220", amount: "-₹300" },
  ]);

  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newName || !newAmount) return;

    const newTransaction = {
      id: transactions.length + 1,
      name: newName,
      amount: newAmount,
    };

    setTransactions([newTransaction, ...transactions]);
    setNewName("");
    setNewAmount("");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">
          💸 Cashier Dashboard
        </h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-5 rounded-xl shadow-md flex items-center gap-4"
          >
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <p className="text-sm">{stat.title}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          📋 Recent Transactions
        </h3>
        <ul className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex justify-between py-3 text-gray-700 font-medium"
            >
              <span>{tx.name}</span>
              <span
                className={`${
                  tx.amount.startsWith("+") ? "text-green-600" : "text-red-500"
                }`}
              >
                {tx.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 🧾 Add Transaction Form */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          ➕ Add New Transaction
        </h4>
        <form onSubmit={handleAddTransaction} className="space-y-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Transaction Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="Amount (e.g. +₹500 or -₹300)"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 shadow"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinancialDashboard;
