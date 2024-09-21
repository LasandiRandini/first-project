import { useEffect, useState } from "react";
import axios from "axios";

const StatsCard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total employees
        const employeeResponse = await axios.get("http://localhost:8800/api/employees/noofemployees");
        setTotalEmployees(employeeResponse.data.totalEmployees);

        // Fetch total departments
        const departmentResponse = await axios.get("http://localhost:8800/api/departments/noofdepartments");
        setTotalDepartments(departmentResponse.data.totalDepartments);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex justify-between items-center p-4  bg-white shadow rounded-md space-x-40">
      {/* Total Employees */}
      <div className="flex-1 p-3 bg-purple-100 rounded-lg text-center">
        <h3 className="text-sm text-gray-600">Total Employees</h3>
        <p className="text-2xl font-semibold text-purple-700">{totalEmployees}</p>
      </div>
      {/* Total Departments */}
      <div className="flex-1 p-3 bg-green-100 rounded-lg text-center">
        <h3 className="text-sm text-gray-600">Total Departments</h3>
        <p className="text-2xl font-semibold text-green-700">{totalDepartments}</p>
      </div>
    </div>
  );
};

export default StatsCard;
