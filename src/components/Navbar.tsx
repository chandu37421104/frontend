import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/Dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/beaconsathletics.com/responsive_2020/images/svgs/logo_main.svg"
            className="h-8"
            alt="University of Massachusetts Boston"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            UMass Boston
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-white-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
              <Link to="/dashboard" className="block py-2 px-3 text-white hover:text-blue-700">Dashboard</Link>
            </li>
            <li>
              <Link to="/tasks" className="block py-2 px-3 text-white hover:text-blue-700">Tasks</Link>
            </li>
            <li>
              <Link to="/leaderboard" className="block py-2 px-3 text-white hover:text-blue-700">Leaderboard</Link>
            </li>
            <li>
              <Link to="/rewards" className="block py-2 px-3 text-white hover:text-blue-700">Rewards</Link>
            </li>
            <li>
              <Link to="/signin" className="block py-2 px-3 text-white hover:text-blue-700">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};