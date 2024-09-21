import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "../components/statsCard";

const DashboardHome = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formVisible, setFormVisible] = useState(false); 

  // Employee form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [nic, setNic] = useState("");
  const [contact, setContact] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  // Fetch employees and departments on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/employees/getemployees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/employees/getdepartments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchEmployees();
    fetchDepartments();
  }, []);

  // Handle form submit
  const handleAddEmployee = async () => {
    const newEmployee = {
      first_name: firstName,
      last_name: lastName,
      email,
      address,
      position,
      nic_number: nic,
      contact_no: contact,
      hire_date: hireDate,
      department_id: departmentId,  // Send department ID, not the name
    };

    try {
      await axios.post("http://localhost:8800/api/employees/addemployees", newEmployee);
      setFormVisible(false); // Close the form after successful submission
      // Refetch employees
      const response = await axios.get("http://localhost:8800/api/employees/getemployees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hi Avishka</h1>
      </div>

         <div className="grid  mb-8">
       <StatsCard  />
      </div>

      {/* Add Employee Form Toggle */}
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setFormVisible(!formVisible)}
      >
        {formVisible ? "Close Form" : "Add New Employee"}
      </button>

      {/* Add Employee Form */}
      {formVisible && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Add new employee</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="date"
              placeholder="Hire Date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="p-2 border rounded"
            />
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.department_id} value={department.department_id}>
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-purple-600 text-white px-4 py-2 mt-4 rounded"
            onClick={handleAddEmployee}
          >
            Add
          </button>
        </div>
      )}

      {/* Employee Table Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">All Employees</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Employee Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id} className="bg-gray-100">
                  <td className="border px-4 py-2">{`${employee.first_name} ${employee.last_name}`}</td>
                  <td className="border px-4 py-2">{employee.address}</td>
                  <td className="border px-4 py-2">
                    {departments.find(d => d.department_id === employee.department_id)?.department_name || 'N/A'}
                  </td>
                  <td className="border px-4 py-2">{employee.email}</td>
                  <td className="border px-4 py-2">{employee.position}</td>
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

export default DashboardHome;
