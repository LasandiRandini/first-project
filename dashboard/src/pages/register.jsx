import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import BACKGORUND from '../images/back.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    admin_name: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }

    if (name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      } else {
        setPasswordError('');
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please correct the errors before submitting.',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8800/api/admins/register', { ...formData });
      console.log('User added:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'User added successfully',
      });

      navigate('/'); // Navigate to login or other page after registration

    } catch (error) {
      console.error('Error adding user:', error);

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.error || 'An error occurred during registration',
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGORUND})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      </div>
      <div className="relative z-10 bg-gray-800 p-8 opacity-70 rounded-3xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Register</h2>
          <p className="mt-2 text-sm text-gray-400">Create a new account</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>
          <div>
            <label htmlFor="admin_name" className="block text-sm font-medium text-gray-200">Admin Name</label>
            <input
              type="text"
              id="admin_name"
              name="admin_name"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.admin_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/Login" className="text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
