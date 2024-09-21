import { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerComponent = () => {
  const [managerName, setManagerName] = useState('');
  const [managerId, setManagerId] = useState(null);
  const [managers, setManagers] = useState([]);

  // Fetch all managers
  useEffect(() => {
    axios.get('http://localhost:8800/api/departments/getmanagers')
      .then(response => setManagers(response.data))
      .catch(error => console.error('Error fetching managers:', error));
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setManagerName(e.target.value);
  };

  // Add new manager (POST)
  const addManager = () => {
    if (managerName.trim() === '') {
      alert('Manager name is required');
      return;
    }

    axios.post('http://localhost:8800/api/departments/addmanagers', { manager_name: managerName })
      .then(response => {
        setManagers([...managers, { manager_id: response.data.managerId, manager_name: managerName }]); // Update list with new manager
        setManagerName(''); // Clear input
      })
      .catch(error => console.error('Error adding manager:', error));
  };

  // Update manager
  const updateManager = () => {
    if (!managerId || managerName.trim() === '') {
      alert('Manager ID and name are required');
      return;
    }

    axios.put(`http://localhost:8800/api/departments/updatemanagers/${managerId}`, { manager_name: managerName })
      .then(() => {
        // Update managers array locally
        const updatedManagers = managers.map(manager =>
          manager.manager_id === managerId ? { ...manager, manager_name: managerName } : manager
        );
        setManagers(updatedManagers);

        // Reset form state
        setManagerName('');
        setManagerId(null);
      })
      .catch(error => {
        console.error('Error updating manager:', error);
        alert('Failed to update manager. Please try again.');
      });
  };

  const deleteManager = (id) => {
    axios.delete(`http://localhost:8800/api/departments/deletemanagers/${id}`)
      .then(() => {
        const filteredManagers = managers.filter(manager => manager.manager_id !== id);
        setManagers(filteredManagers);
      })
      .catch(error => console.error('Error deleting manager:', error));
  };

  // Set manager for updating
  const handleEdit = (manager) => {
    setManagerName(manager.manager_name);
    setManagerId(manager.manager_id);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manager Table</h1>

      {/* Input for manager name */}
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          value={managerName}
          onChange={handleInputChange}
          placeholder="Enter Manager Name"
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={managerId ? updateManager : addManager}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded transition-all">
          {managerId ? 'Update Manager' : 'Add Manager'}
        </button>
      </div>

      {/* Manager List */}
      <h2 className="text-2xl font-medium mb-4 text-gray-700">Managers List</h2>
      {managers.length > 0 ? (
        <ul className="space-y-4">
          {managers.map((manager) => (
            <li key={manager.manager_id} className="bg-gray-100 p-4 rounded shadow-md flex justify-between items-center">
              <span className="text-lg text-gray-800">{manager.manager_name}</span>
              <div className="space-x-3">
                <button
                  onClick={() => handleEdit(manager)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded transition-all">
                  Edit
                </button>
                <button
                  onClick={() => deleteManager(manager.manager_id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition-all">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No managers available. Please add one.</p>
      )}
    </div>
  );
};

export default ManagerComponent;
