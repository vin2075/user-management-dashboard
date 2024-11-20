import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function UserDashboard({ users, setUsers }) {
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>User Dashboard</h1>
        <Link to="/add-user" className="add-user-btn">Add New User</Link>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.department}</td>
              <td>
                <Link to={`/edit-user/${user.id}`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;
