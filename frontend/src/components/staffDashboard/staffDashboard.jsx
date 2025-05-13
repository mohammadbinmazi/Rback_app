import React, { useState } from "react";
import {
  FaSignOutAlt,
  FaClipboardCheck,
  FaBoxes,
  FaExclamationTriangle,
  FaPlusCircle,
} from "react-icons/fa";

const StaffDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [tasks, setTasks] = useState([
    { id: 1, title: "Clean inventory shelves", completed: false },
    { id: 2, title: "Label new stock", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");

  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState("");

  const inventory = [
    { name: "Wheat Flour", stock: 12 },
    { name: "Rice", stock: 5 },
    { name: "Sugar", stock: 2 },
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleReportIssue = (e) => {
    e.preventDefault();
    if (!newIssue.trim()) return;
    setIssues([...issues, { id: Date.now(), message: newIssue }]);
    setNewIssue("");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">📋 Staff Dashboard</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Inventory Overview */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          <FaBoxes className="inline mr-2" /> Inventory Low Stock Alert
        </h3>
        <ul className="divide-y divide-gray-200">
          {inventory
            .filter((item) => item.stock <= 10)
            .map((item, index) => (
              <li
                key={index}
                className="py-2 flex justify-between text-gray-700"
              >
                <span>{item.name}</span>
                <span className="text-red-600 font-semibold">
                  {item.stock} left
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          <FaClipboardCheck className="inline mr-2" /> Daily Tasks
        </h3>
        <ul className="mb-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between py-2 text-gray-700"
            >
              <span
                className={`${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`text-sm px-3 py-1 rounded ${
                  task.completed ? "bg-green-200" : "bg-yellow-200"
                }`}
              >
                {task.completed ? "Done" : "Mark as Done"}
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddTask} className="flex gap-3">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <FaPlusCircle />
          </button>
        </form>
      </div>

      {/* Issue Reporting */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          <FaExclamationTriangle className="inline mr-2 text-red-500" /> Report
          an Issue
        </h3>
        <form onSubmit={handleReportIssue} className="mb-4">
          <textarea
            rows="3"
            placeholder="Describe the issue..."
            value={newIssue}
            onChange={(e) => setNewIssue(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
          >
            Submit Issue
          </button>
        </form>
        <ul className="list-disc list-inside text-gray-700">
          {issues.map((issue) => (
            <li key={issue.id}>{issue.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StaffDashboard;
