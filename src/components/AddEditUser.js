import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddEditUser({ users, setUsers }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    department: '',
  });

  useEffect(() => {
    if (id) {
      const user = users.find((user) => user.id === parseInt(id, 10));
      if (user) setFormData(user);
    }
  }, [id, users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      const updatedUsers = users.map((user) =>
        user.id === parseInt(id, 10) ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
    } else {
      const newUser = { ...formData, id: users.length + 1 };
      setUsers([...users, newUser]);
    }
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Edit User' : 'Add New User'}</h2>
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
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          placeholder="Department"
          required
        />
        <button type="submit">{id ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
}

export default AddEditUser;
