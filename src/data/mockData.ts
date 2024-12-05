import { Task, LeaderboardEntry, FacultyTask } from '../types';

export const tasks: Task[] = [
  { id: 1, title: "Complete Project Milestone 1", deadline: "2024-11-25", status: "completed", points: 1000 },
  { id: 2, title: "Submit Weekly Report", deadline: "2024-11-22", status: "completed", points: 500 },
  { id: 3, title: "Prepare Presentation", deadline: "2024-11-28", status: "completed", points: 800 },
  { id: 4, title: "Team Meeting Notes", deadline: "2024-11-21", status: "pending", points: 300 },
];

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Smith", points: 5500, avatar: "S" },
  { rank: 2, name: "Alex Johnson", points: 4350, avatar: "A" },
  { rank: 3, name: "Mike Brown", points: 3200, avatar: "M" },
  { rank: 4, name: "Emma Davis", points: 2100, avatar: "E" },
  { rank: 5, name: "John Doe", points: 1800, avatar: "J" },
];

export const studentData = {
  name: "Harika Nalabolu",
  points: 2300
};

export const facultyData = {
  name: "vihitha",
  points: 2300
};

export const facultytasks: FacultyTask[] = [
  { id: 1, title: "Student Mentor meeting", deadline: "2024-11-25", status: "pending", points: 1000 },
  { id: 2, title: "check-in with student", deadline: "2024-11-22", status: "pending", points: 500 },
  { id: 3, title: "Research ", deadline: "2024-11-28", status: "completed", points: 800 },
  { id: 4, title: "Attend FLC", deadline: "2024-11-21", status: "pending", points: 300 },
  { id: 5, title: "NRMN & CAM training", deadline: "2024-11-21", status: "pending", points: 300 },

];