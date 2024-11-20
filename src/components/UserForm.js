import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm({ onSave }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch user details if editing
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchUserDetails(id);
    }
  }, [id]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await response.json();
      setFormData({
        firstName: data.name.split(' ')[0],
        lastName: data.name.split(' ')[1],
        email: data.email,
        phone: data.phone,
        department: '', // Add logic to set the department if available
        address: data.address.street,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form to add or edit user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Edit user
      await updateUser(formData);
    } else {
      // Add new user
      await addUser(formData);
    }
  };

  // Add a new user
  const addUser = async (user) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          address: { street: user.address },
          company: { name: user.department },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      onSave(data); // Call onSave to notify parent component of the new user
      navigate('/'); // Navigate to dashboard after adding
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Update an existing user
  const updateUser = async (user) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          address: { street: user.address },
          company: { name: user.department },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      onSave(data); // Call onSave to notify parent component of the updated user
      navigate('/'); // Navigate to dashboard after editing
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          placeholder="Department"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} User</button>
      </form>
    </div>
  );
}

export default UserForm;
