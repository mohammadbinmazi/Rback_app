// import React, { useState } from "react";
// import jsPDF from "jspdf";

// const StaffDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [task, setTask] = useState("");
//   const [reports, setReports] = useState([]);
//   const [report, setReport] = useState("");
//   const [notices, setNotices] = useState([]);
//   const [notice, setNotice] = useState("");
//   const [attendance, setAttendance] = useState([]);
//   const [file, setFile] = useState(null);
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const handleAddTask = () => {
//     if (task.trim()) {
//       setTasks([...tasks, task]);
//       setTask("");
//     }
//   };

//   const handleAddReport = () => {
//     if (report.trim()) {
//       setReports([...reports, report]);
//       setReport("");
//     }
//   };

//   const handleAddNotice = () => {
//     if (notice.trim()) {
//       setNotices([...notices, notice]);
//       setNotice("");
//     }
//   };

//   const handleClockIn = () => {
//     const now = new Date();
//     const time = now.toLocaleTimeString();
//     const date = now.toLocaleDateString();
//     setAttendance([...attendance, `Clocked in at ${time} on ${date}`]);
//   };

//   const handleClockOut = () => {
//     const now = new Date();
//     const time = now.toLocaleTimeString();
//     const date = now.toLocaleDateString();
//     setAttendance([...attendance, `Clocked out at ${time} on ${date}`]);
//   };

//   const handleUpload = () => {
//     if (file) {
//       setUploadedFiles([...uploadedFiles, file.name]);
//       setFile(null);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("Staff Dashboard Summary", 20, 20);

//     let y = 30;

//     const addListToPDF = (title, list) => {
//       doc.setFontSize(12);
//       doc.text(`${title}:`, 20, y);
//       y += 6;
//       list.forEach((item, index) => {
//         doc.text(`${index + 1}. ${item}`, 25, y);
//         y += 6;
//       });
//       y += 4;
//     };

//     addListToPDF("Tasks", tasks);
//     addListToPDF("Reports", reports);
//     addListToPDF("Notices", notices);
//     addListToPDF("Attendance", attendance);
//     addListToPDF("Uploaded Files", uploadedFiles);

//     doc.save("staff_dashboard.pdf");
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <div className="max-w-4xl mx-auto space-y-10">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-blue-400">Staff Dashboard</h1>
//           <div className="space-x-2">
//             <button
//               onClick={generatePDF}
//               className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 text-white"
//             >
//               Download PDF
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Task Management */}
//         <section className="bg-gray-800 rounded-2xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Task Management</h2>
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               value={task}
//               onChange={(e) => setTask(e.target.value)}
//               placeholder="Enter a new task"
//               className="flex-1 border rounded px-3 py-2 text-white placeholder-white bg-gray-700"
//             />
//             <button
//               onClick={handleAddTask}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Add
//             </button>
//           </div>
//           <ul className="list-disc list-inside mt-3">
//             {tasks.map((t, i) => (
//               <li key={i}>{t}</li>
//             ))}
//           </ul>
//         </section>

//         {/* Issue Reporting */}
//         <section className="bg-gray-800 rounded-2xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Report an Issue</h2>
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               value={report}
//               onChange={(e) => setReport(e.target.value)}
//               placeholder="Describe issue"
//               className="flex-1 border rounded px-3 py-2 text-white placeholder-white bg-gray-700"
//             />
//             <button
//               onClick={handleAddReport}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               Submit
//             </button>
//           </div>
//           <ul className="list-disc list-inside mt-3">
//             {reports.map((r, i) => (
//               <li key={i}>{r}</li>
//             ))}
//           </ul>
//         </section>

//         {/* Notice Board */}
//         <section className="bg-gray-800 rounded-2xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Notice Board</h2>
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               value={notice}
//               onChange={(e) => setNotice(e.target.value)}
//               placeholder="Enter a notice"
//               className="flex-1 border rounded px-3 py-2 text-white placeholder-white bg-gray-700"
//             />
//             <button
//               onClick={handleAddNotice}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Post
//             </button>
//           </div>
//           <ul className="list-disc list-inside mt-3">
//             {notices.map((n, i) => (
//               <li key={i}>{n}</li>
//             ))}
//           </ul>
//         </section>

//         {/* Attendance */}
//         <section className="bg-gray-800 rounded-2xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Attendance</h2>
//           <div className="flex space-x-2">
//             <button
//               onClick={handleClockIn}
//               className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//             >
//               Clock In
//             </button>
//             <button
//               onClick={handleClockOut}
//               className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//             >
//               Clock Out
//             </button>
//           </div>
//           <ul className="list-disc list-inside mt-3">
//             {attendance.map((a, i) => (
//               <li key={i}>{a}</li>
//             ))}
//           </ul>
//         </section>

//         {/* File Upload */}
//         <section className="bg-gray-800 rounded-2xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
//           <div className="flex space-x-2">
//             <input
//               type="file"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="flex-1 border rounded px-3 py-2 text-white placeholder-white bg-gray-700 file:text-black"
//             />
//             <button
//               onClick={handleUpload}
//               className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//             >
//               Upload
//             </button>
//           </div>
//           <ul className="list-disc list-inside mt-3">
//             {uploadedFiles.map((f, i) => (
//               <li key={i}>{f}</li>
//             ))}
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default StaffDashboard;
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const StaffDashboard = () => {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [task, setTask] = useState("");
  const [reports, setReports] = useState(
    () => JSON.parse(localStorage.getItem("reports")) || []
  );
  const [report, setReport] = useState("");
  const [notices, setNotices] = useState(
    () => JSON.parse(localStorage.getItem("notices")) || []
  );
  const [notice, setNotice] = useState("");
  const [attendance, setAttendance] = useState(
    () => JSON.parse(localStorage.getItem("attendance")) || []
  );
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(
    () => JSON.parse(localStorage.getItem("uploadedFiles")) || []
  );

  // Sync to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const handleAddReport = () => {
    if (report.trim()) {
      setReports([...reports, report]);
      setReport("");
    }
  };

  const handleAddNotice = () => {
    if (notice.trim()) {
      setNotices([...notices, notice]);
      setNotice("");
    }
  };

  const handleClockIn = () => {
    const now = new Date();
    const entry = `Clocked in at ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}`;
    setAttendance([...attendance, entry]);
  };

  const handleClockOut = () => {
    const now = new Date();
    const entry = `Clocked out at ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}`;
    setAttendance([...attendance, entry]);
  };

  const handleUpload = () => {
    if (file) {
      setUploadedFiles([...uploadedFiles, file.name]);
      setFile(null);
    }
  };

  const handleLogout = () => {
    window.location.href = "/login"; // Only redirect, do not remove token
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Staff Dashboard Summary", 20, 20);

    let y = 30;
    const addList = (title, items) => {
      doc.setFontSize(12);
      doc.text(`${title}:`, 20, y);
      y += 6;
      items.forEach((item, idx) => {
        doc.text(`${idx + 1}. ${item}`, 25, y);
        y += 6;
      });
      y += 4;
    };

    addList("Tasks", tasks);
    addList("Reports", reports);
    addList("Notices", notices);
    addList("Attendance", attendance);
    addList("Uploaded Files", uploadedFiles);

    doc.save("staff_dashboard.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-400">Staff Dashboard</h1>
          <div className="space-x-2">
            <button
              onClick={generatePDF}
              className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 text-white"
            >
              Download PDF
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Task Management */}
        <section className="bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Task Management</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter a new task"
              className="flex-1 border rounded px-3 py-2 text-white placeholder-white bg-gray-700"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <ul className="list-disc list-inside mt-3">
            {tasks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>

        {/* Report Issues */}
        <section className="bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Report an Issue</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Describe issue"
              className="flex-1 border rounded px-3 py-2 text-white placeholder-white bg-gray-700"
            />
            <button
              onClick={handleAddReport}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Submit
            </button>
          </div>
          <ul className="list-disc list-inside mt-3">
            {reports.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        {/* Notice Board */}
        <section className="bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Notice Board</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={notice}
              onChange={(e) => setNotice(e.target.value)}
              placeholder="Enter a notice"
              className="flex-1 border rounded px-3 py-2 text-white placeholder-white bg-gray-700"
            />
            <button
              onClick={handleAddNotice}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Post
            </button>
          </div>
          <ul className="list-disc list-inside mt-3">
            {notices.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </section>

        {/* Attendance */}
        <section className="bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Attendance</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleClockIn}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Clock In
            </button>
            <button
              onClick={handleClockOut}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Clock Out
            </button>
          </div>
          <ul className="list-disc list-inside mt-3">
            {attendance.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>

        {/* File Upload */}
        <section className="bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
          <div className="flex space-x-2">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="flex-1 border rounded px-3 py-2 text-white placeholder-white bg-gray-700 file:text-black"
            />
            <button
              onClick={handleUpload}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Upload
            </button>
          </div>
          <ul className="list-disc list-inside mt-3">
            {uploadedFiles.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default StaffDashboard;
