import { db } from '../db.js';

// Get total count of departments
export const getNoDepartment = (req, res) => {
    try {
      const sql = 'SELECT COUNT(*) as totalDepartments FROM department';
      
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error fetching total departments count' });
        } else if (result.length === 0) {
          return res.status(404).json({ message: 'No departments found' });
        } else {
          return res.status(200).json({ totalDepartments: result[0].totalDepartments });
        }
      });
    } catch (error) {
      console.error('Error while fetching total departments count:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Get all employees
export const getEmployees = (req, res) => {
    try {
      const sql = 'SELECT first_name,last_name FROM employee';
  
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error fetching employees' });
        } else if (result.length === 0) {
          return res.status(404).json({ message: 'No employees found' });
        } else {
          return res.status(200).json(result);
        }
      });
    } catch (error) {
      console.error('Error while fetching employees:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
 // Add a new department
export const addDepartment = (req, res) => {
  const { department_code, department_name, manager_name } = req.body;

  const sql = 'INSERT INTO department (department_code, department_name, manager_name) VALUES (?, ?, ?)';

  db.query(sql, [department_code, department_name, manager_name], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding department' });
    } else {
      return res.status(201).json({ message: 'Department added successfully' });
    }
  });
};
  
  // Get all departments
  export const getAllDepartments = (req, res) => {
    try {
      const sql = 'SELECT * FROM department';
      
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error fetching departments' });
        } else if (result.length === 0) {
          return res.status(404).json({ message: 'No departments found' });
        } else {
          return res.status(200).json(result);
        }
      });
    } catch (error) {
      console.error('Error while fetching departments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
 // Get all managers
export const getManagers = (req, res) => {
  try {
    const sql = 'SELECT manager_id, manager_name FROM manager';

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching managers' });
      } else if (result.length === 0) {
        return res.status(404).json({ message: 'No managers found' });
      } else {
        return res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Error while fetching managers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new manager
export const addManagers = (req, res) => {
  const { manager_name } = req.body;
  try {
    const sql = 'INSERT INTO manager (manager_name) VALUES (?)';

    db.query(sql, [manager_name], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating manager' });
      } else {
        return res.status(201).json({ managerId: result.insertId, message: 'Manager created successfully' });
      }
    });
  } catch (error) {
    console.error('Error while creating manager:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Manager (unchanged)
export const updateManager = (req, res) => {
  const { managerId } = req.params;
  const { manager_name } = req.body;

  const sql = 'UPDATE manager SET manager_name = ? WHERE manager_id = ?';

  db.query(sql, [manager_name, managerId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating manager' });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Manager not found' });
    } else {
      return res.status(200).json({ message: 'Manager updated successfully' });
    }
  });
};

export const deleteManager = (req, res) => {
  const { id } = req.params; // Ensure 'id' matches the route parameter

  const sql = 'DELETE FROM manager WHERE manager_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting manager' });
    } else {
      return res.status(200).json({ message: 'Manager deleted successfully' });
    }
  });
};

export const getDepManagers = (req, res) => {
  const sql = 'SELECT manager_id, manager_name FROM manager';
  
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching managers' });
    } else {
      return res.status(200).json(result);
    }
  });
};