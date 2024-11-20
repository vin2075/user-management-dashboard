import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setFormData({ name: res.data.name, email: res.data.email });
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, formData);
      navigate("/");
    } catch (error) {
      alert("Failed to update user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditUser;
