import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`
      );
      setUsers((prev) => [...prev, ...res.data]);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 5
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default UserList;
