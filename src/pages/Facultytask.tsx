/import React, { useState, useEffect } from 'react';
import { getTasks, updateTask } from '../services/taskService';
import { Task } from '../types';

export const Facultytask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [studentChecks, setStudentChecks] = useState<{ [key: number]: boolean }>({});
  const [zoomLink, setZoomLink] = useState("");

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Open the modal for a specific task
  const handleCheckInClick = (taskId: number) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
    setStudentChecks({});
    setZoomLink("");
  };

  // Handle sending Zoom link
  const handleSendZoomLink = () => {
    if (zoomLink.trim() === "") {
      alert("Please enter a Zoom link before sending.");
      return;
    }
    alert(`Zoom link "${zoomLink}" sent.`);
  };

  // Handle confirming the task completion
  const handleConfirm = async () => {
    if (selectedTaskId !== null) {
      try {
        // Update task status in the backend
        await updateTask(selectedTaskId, { status: 'completed' });

        // Update task status in the state
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === selectedTaskId ? { ...task, status: 'completed' } : task
          )
        );
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
    setIsModalOpen(false);
    setSelectedTaskId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Faculty Tasks</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  readOnly
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <span className="font-medium">{task.title}</span>
                  <p className="text-sm text-gray-600">Points: {task.points}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Due: {task.deadline}</span>
                {(task.title === 'Student Mentor meeting' || task.title === 'check-in with student') &&
                  task.status !== 'completed' && (
                    <button
                      onClick={() => handleCheckInClick(task.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                    >
                      Check-In
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedTaskId === 1 ? "Student Mentor Meeting Check-In" : "Student Check-In"}
            </h2>
            {selectedTaskId === 1 && (
              <div className="mb-4">
                <label htmlFor="zoom-link" className="block text-sm font-medium mb-2">
                  Zoom Link
                </label>
                <input
                  type="text"
                  id="zoom-link"
                  value={zoomLink}
                  onChange={(e) => setZoomLink(e.target.value)}
                  placeholder="Enter Zoom link"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <button
                  onClick={handleSendZoomLink}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Send
                </button>
              </div>
            )}
            {selectedTaskId !== 1 && (
              <div className="space-y-2">
                {/* Student list */}
                {[
                  { id: 1, name: "Student A" },
                  { id: 2, name: "Student B" },
                  { id: 3, name: "Student C" },
                  { id: 4, name: "Student D" },
                  { id: 5, name: "Student E" },
                ].map((student) => (
                  <div key={student.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`student-${student.id}`}
                      checked={studentChecks[student.id] || false}
                      onChange={(e) => setStudentChecks((prev) => ({ ...prev, [student.id]: e.target.checked }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor={`student-${student.id}`} className="text-sm font-medium">
                      {student.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-200 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
