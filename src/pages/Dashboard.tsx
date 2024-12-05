/*import React, { useEffect, useState } from 'react';*/
import { TaskProgress } from '../components/TaskProgress';
import { getTasks } from '../services/taskService';
import { getUsers } from '../services/userService';
import { getAuthUser } from '../services/authService';

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [studentData, setStudentData] = useState({ name: '', points: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const taskData = await getTasks();
        const userData = await getUsers();
        const authUser = await getAuthUser();

        setTasks(taskData);

        // Sort users by points to create leaderboard
        const sortedLeaderboard = userData.sort((a: any, b: any) => b.points - a.points);
        setLeaderboardData(sortedLeaderboard);

        // Set student data (current logged-in user)
        setStudentData(authUser);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const totalPoints = tasks
    .filter((task: any) => task.status === 'completed')
    .reduce((sum, task: any) => sum + task.points, 0);

  const getBadgeInfo = () => {
    if (totalPoints >= 5000) return { type: 'Gold', color: 'yellow-500', emoji: '🏆' };
    if (totalPoints >= 3000) return { type: 'Silver', color: 'gray-400', emoji: '🥈' };
    if (totalPoints >= 1000) return { type: 'Bronze', color: 'amber-600', emoji: '🥉' };
    return null;
  };

  const badgeInfo = getBadgeInfo();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="text-dark py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {studentData.name}! 👋
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-dark-100">
              Current Points: <span className="font-semibold">{totalPoints}</span>
            </p>
            {badgeInfo && (
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${badgeInfo.color}/10`}>
                <span className="text-lg">{badgeInfo.emoji}</span>
                <span className={`font-medium text-${badgeInfo.color}`}>
                  {badgeInfo.type} Badge
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Progress Component */}
          <TaskProgress tasks={tasks} />
          
          {/* Leaderboard */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Top 5 Leaders</h2>
            <div className="space-y-4">
              {leaderboardData.slice(0, 5).map((player: any) => (
                <div key={player.id} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {player.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.points} points</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      {player.rank || leaderboardData.indexOf(player) + 1}
                    </div>
                    {player.points >= 5000 && <span className="text-yellow-500">🏆</span>}
                    {player.points >= 3000 && player.points < 5000 && <span className="text-gray-400">🥈</span>}
                    {player.points >= 1000 && player.points < 3000 && <span className="text-amber-600">🥉</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
