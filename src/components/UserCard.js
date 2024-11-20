import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserCard = ({ user }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <Link to={`/edit-user/${user.id}`}>
        <button>Edit</button>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default UserCard;
