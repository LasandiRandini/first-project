import { db } from "../db.js";

// Get the total number of employees
export const getNoEmployees = (req, res) => {
  try {
    const sql = 'SELECT COUNT(*) as totalEmployees FROM employee';
    
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching total employees count' });
      } else if (result.length === 0) {
        return res.status(404).json({ message: 'No employees found' });
      } else {
        return res.status(200).json({ totalEmployees: result[0].totalEmployees });
      }
    });
  } catch (error) {
    console.error('Error while fetching total employees count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all departments
export const getDepartments = (req, res) => {
  try {
    const sql = 'SELECT department_id, department_name FROM department';

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

// Create a new employee
export const addEmployees = (req, res) => {
  const { first_name, last_name, email, address, contact_no, hire_date, position, nic_number, department_id } = req.body;
  
  try {
    const sql = 'INSERT INTO employee (first_name, last_name, email, address, contact_no, hire_date, position, nic_number, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [first_name, last_name, email, address, contact_no, hire_date, position, nic_number, department_id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating employee' });
      } else {
        return res.status(201).json({ employeeId: result.insertId, message: 'Employee created successfully' });
      }
    });
  } catch (error) {
    console.error('Error while creating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all employees
export const getAllEmployees = (req, res) => {
  try {
    const sql = 'SELECT * FROM employee';
    
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
