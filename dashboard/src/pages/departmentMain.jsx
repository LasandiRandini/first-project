import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "../components/statsCard";

const DepartmentHome = () => {
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]); // New state to hold manager data
  const [formVisible, setFormVisible] = useState(false);

  // Department form states
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [managerName, setManagerName] = useState("");

  // Fetch departments and managers on component mount
  useEffect(() => {
    const fetchDepartmentsAndManagers = async () => {
      try {
        const departmentResponse = await axios.get("http://localhost:8800/api/departments/getdepartments");
        const managerResponse = await axios.get("http://localhost:8800/api/departments/getdepmanagers"); // Fetch managers

        setDepartments(departmentResponse.data);
        setManagers(managerResponse.data); // Set managers state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDepartmentsAndManagers();
  }, []);

  // Handle form submit to add a new department
  const handleAddDepartment = async () => {
    const newDepartment = {
      department_code: departmentCode,
      department_name: departmentName,
      manager_name: managerName, // Include selected manager_name
    };

    try {
      await axios.post("http://localhost:8800/api/departments/adddepartments", newDepartment);
      setFormVisible(false); // Close the form after successful submission
      // Refetch departments to update the list
      const response = await axios.get("http://localhost:8800/api/departments/getdepartments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hi Avishka</h1>
      </div>
      <div className="grid mb-8">
        <StatsCard />
      </div>

      {/* Toggle to show/hide the form */}
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setFormVisible(!formVisible)}
      >
        {formVisible ? "Close Form" : "Add New Department"}
      </button>

      {/* Add New Department Form */}
      {formVisible && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Department</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Department Code"
              value={departmentCode}
              onChange={(e) => setDepartmentCode(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="p-2 border rounded"
            />

            <select
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager.manager_id} value={manager.manager_name}>
                  {manager.manager_name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-purple-600 text-white px-4 py-2 mt-4 rounded"
            onClick={handleAddDepartment}
          >
            Add
          </button>
        </div>
      )}

      {/* Departments Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">All Departments</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Department Code</th>
                <th className="px-4 py-2">Department Name</th>
                <th className="px-4 py-2">Manager</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.department_id} className="bg-gray-100">
                  <td className="border px-4 py-2">{department.department_code}</td>
                  <td className="border px-4 py-2">{department.department_name}</td>
                  <td className="border px-4 py-2">{department.manager_name || 'N/A'}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-green-500 text-white px-4 py-1 rounded mr-2">Update</button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHome;
