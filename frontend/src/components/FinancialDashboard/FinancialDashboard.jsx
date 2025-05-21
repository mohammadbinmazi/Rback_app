import React, { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaWallet,
  FaReceipt,
  FaExchangeAlt,
  FaSignOutAlt,
  FaFilePdf,
} from "react-icons/fa";
import jsPDF from "jspdf";

const FinancialDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) setTransactions(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newName || !newAmount) return;

    // Validate newAmount: must start with + or - and contain numbers
    if (!/^[-+]?₹?\d+(\.\d+)?$/.test(newAmount)) {
      alert(
        "Invalid amount format! Use +₹500 or -₹300 format. Currency symbol optional."
      );
      return;
    }

    const newTransaction = {
      id: Date.now(),
      name: newName,
      amount: newAmount,
    };

    setTransactions([newTransaction, ...transactions]);
    setNewName("");
    setNewAmount("");
  };

  // Helper function to parse amount string into number
  // Examples: "+₹500" => 500, "-₹300" => -300, "400" => 400
  const parseAmount = (amountStr) => {
    // Remove currency symbols (₹) and commas
    let clean = amountStr.replace(/[₹,]/g, "").trim();

    // Parse as float
    const num = parseFloat(clean);

    // If it starts with '-' in the original string, make negative
    if (amountStr.trim().startsWith("-")) {
      return -Math.abs(num);
    }
    // Else positive
    return Math.abs(num);
  };

  // Calculate total income (sum of positive amounts)
  const totalIncome = transactions
    .map((tx) => parseAmount(tx.amount))
    .filter((amt) => amt > 0)
    .reduce((acc, val) => acc + val, 0);

  // Calculate total expenses (sum of negative amounts, absolute value)
  const totalExpenses = transactions
    .map((tx) => parseAmount(tx.amount))
    .filter((amt) => amt < 0)
    .reduce((acc, val) => acc + Math.abs(val), 0);

  // Calculate balance = income - expenses
  const balance = totalIncome - totalExpenses;

  const stats = [
    {
      title: "Total Income",
      value: `₹${totalIncome.toFixed(2)}`,
      icon: <FaMoneyBillWave />,
    },
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toFixed(2)}`,
      icon: <FaReceipt />,
    },
    {
      title: "Balance",
      value: `₹${balance.toFixed(2)}`,
      icon: <FaWallet />,
    },
    {
      title: "Transactions",
      value: `${transactions.length}`,
      icon: <FaExchangeAlt />,
    },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor("#fbbf24");
    doc.text("📊 Financial Report", 20, 20);

    doc.setFontSize(12);
    doc.setTextColor("#d1d5db");
    let y = 40;
    transactions.forEach((tx, i) => {
      doc.text(`${i + 1}. ${tx.name} - ${tx.amount}`, 20, y);
      y += 10;
    });

    doc.setTextColor("#fbbf24");
    doc.text(`💰 Income: ₹${totalIncome.toFixed(2)}`, 20, y + 10);
    doc.text(`💸 Expenses: ₹${totalExpenses.toFixed(2)}`, 20, y + 20);
    doc.text(`🧾 Balance: ₹${balance.toFixed(2)}`, 20, y + 30);

    doc.save("financial_report.pdf");
  };

  return (
    <div className="bg-gray-900">
      <div className="min-h-screen bg-gray-900 p-8 max-w-6xl mx-auto text-gray-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-yellow-400">
            💼 Cashier Dashboard
          </h2>
          <div className="flex gap-4">
            <button
              onClick={generatePDF}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-gray-100 px-4 py-2 rounded-md shadow"
            >
              <FaFilePdf /> Download PDF
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-gray-100 px-4 py-2 rounded-md shadow"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-gray-100 p-5 rounded-xl shadow-md flex items-center gap-4"
            >
              <div className="text-3xl">{stat.icon}</div>
              <div>
                <p className="text-sm">{stat.title}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-10">
          <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
            📋 Recent Transactions
          </h3>
          <ul className="divide-y divide-gray-700">
            {transactions.map((tx) => (
              <li key={tx.id} className="flex justify-between py-3 font-medium">
                <span>{tx.name}</span>
                <span
                  className={`${
                    parseAmount(tx.amount) > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {tx.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-inner">
          <h4 className="text-xl font-semibold text-yellow-400 mb-4">
            ➕ Add New Transaction
          </h4>
          <form onSubmit={handleAddTransaction} className="space-y-4">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Transaction Name"
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Amount (e.g. +₹500 or -₹300)"
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-600 text-gray-900 px-6 py-2 rounded-md hover:bg-yellow-700 shadow"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
