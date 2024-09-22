

import { useState, useContext } from 'react'; 
import { FaUserAlt, FaBuilding, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const { logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate('/'); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative h-screen flex flex-col">
      <div className="md:hidden p-2 bg-white text-black fixed top-0 z-10">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          <FaBars />
        </button>
      </div>

      <div
        className={`fixed top-0 h-full bg-white border border-opacity-100 border-gray-300 text-gray-800 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 `}
      >
        <div className="p-4 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold mb-10 hidden md:block">Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <Link to="/EmployeeMain" className="flex items-center p-2 hover:bg-blue-200 rounded">
                  <FaUserAlt className="mr-2 md:mr-0" />
                  <span className="hidden md:block text-1xl font-bold">Employees</span>
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/DepartmentMain" className="flex items-center p-2 hover:bg-blue-200 rounded">
                  <FaBuilding className="mr-2 md:mr-0" />
                  <span className="hidden md:block font-bold">Department</span>
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/Setting" className="flex items-center p-2 hover:bg-blue-200 rounded">
                  <FaBuilding className="mr-2 md:mr-0" />
                  <span className="hidden md:block font-bold">Setting</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="p-4 md:p-4 flex flex-col justify-between">
          <div className="font-bold hidden md:block">
            <p>Sachila</p>
            <small>Admin</small>
          </div>
          <button
            onClick={handleLogout}
            className="text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
