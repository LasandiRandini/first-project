import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';


const JWT_SECRET = 'your_secret_key';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login request:', { email, password });

        
        const query = 'SELECT * FROM admin WHERE email = ?';
        const [rows] = await db.promise().execute(query, [email]);

        console.log('Database query result:', rows);

        if (rows.length === 0) {
            return res.status(400).send({ error: 'User not found' });
        }

        const user = rows[0]; 

       
        if (!user || !user.password) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

       
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        
        const token = jwt.sign(
            { admin_id: user.admin_id, email: user.email }, 
            JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        
        res.status(200).send({ message: 'Login successful', token });
        console.log('Login successful');
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).send({ error: 'Internal server error' });
    }
};



export const register = async (req , res) => {
    const { email, admin_name, password } = req.body;

    try {
        // Check if email already exists
        const checkQuery = 'SELECT * FROM admin WHERE email = ?';
        const [rows] = await db.promise().execute(checkQuery, [email]);

        if (rows.length > 0) {
            return res.status(409).send({ error: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new admin into the database
        const insertQuery = 'INSERT INTO admin (email, admin_name, password) VALUES (?, ?, ?)';
        const values = [email, admin_name, hashedPassword];
        await db.promise().execute(insertQuery, values);

        // Create JWT token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        // Send response
        res.status(201).send({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(400).send({ error: 'User registration failed' });
    }
};

export const logout = async (req, res) => {
    try {
      
      res.status(200).send({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout failed:", error);
      return res.status(500).send({ error: 'Internal server error' });
    }
  };