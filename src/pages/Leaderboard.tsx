/import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

export const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const users = await getUsers();
        // Sort users by points in descending order and assign ranks
        const sortedData = users
          .sort((a: any, b: any) => b.points - a.points)
          .map((user: any, index: number) => ({
            ...user,
            rank: index + 1,
          }));
        setLeaderboardData(sortedData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-600">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          {leaderboardData.map((player: any) => (
            <div
              key={player.rank}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                  {player.name.charAt(0)} {/* First letter of the player's name */}
                </div>
                <div>
                  <p className="font-medium">{player.name}</p>
                  <p className="text-sm text-gray-600">{player.points} points</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">#{player.rank}</span>
                {player.points >= 5000 && (
                  <span className="text-yellow-500">🏆 Gold</span>
                )}
                {player.points >= 3000 && player.points < 5000 && (
                  <span className="text-gray-400">🥈 Silver</span>
                )}
                {player.points >= 1000 && player.points < 3000 && (
                  <span className="text-amber-600">🥉 Bronze</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
