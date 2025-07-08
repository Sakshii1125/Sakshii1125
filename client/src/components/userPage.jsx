import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

function UserPage() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    gender: "",
    profile: ""
  });

  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/user/');
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Edit user
      try {
        await axios.put(`http://localhost:4000/api/user/${editingId}`, formData);
        alert("User updated ✅");
        getUsers();
        setFormData({ username: "", name: "", email: "", gender: "", profile: "" });
        setEditingId(null);
        setShowForm(false);
      } catch (err) {
        console.log(err);
        alert("Failed to update ❌");
      }
    } else {
      // Add user
      try {
        await axios.post("http://localhost:4000/api/user/add", formData);
        alert("User added ✅");
        getUsers();
        setFormData({ username: "", name: "", email: "", gender: "", profile: "" });
        setShowForm(false);
      } catch (err) {
        console.log(err);
        alert("Failed to add ❌");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`);
      alert("Deleted ✅");
      getUsers();
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      gender: user.gender,
      profile: user.profile
    });
    setEditingId(user._id);
    setShowForm(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mx-4 mt-4">
        <h2 className="fw-bold text-primary">Users Info</h2>
        <Button variant="success" onClick={() => {
          setShowForm(!showForm);
          setFormData({ username: "", name: "", email: "", gender: "", profile: "" });
          setEditingId(null);
        }}>
          {showForm ? "Close Form" : "+ Add User"}
        </Button>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit} className='w-50 mx-auto border border-2 border-dark p-4 mt-4'>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" value={formData.username} onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" value={formData.email} onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" value={formData.gender} onChange={handleInput}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture URL</Form.Label>
            <Form.Control name="profile" value={formData.profile} onChange={handleInput} />
          </Form.Group>
          <Button type="submit" variant="primary">{editingId ? "Update" : "Add"}</Button>
        </Form>
      )}

      <table className="table table-bordered mt-4 mx-4 text-center">
        <thead className="table-dark">
          <tr>
            <th>Profile</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                <img
                  src={u.profile}
                  alt="profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
              </td>
              <td>{u.username}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.gender}</td>
              <td><Button variant="warning" size="sm" onClick={() => handleEdit(u)}>Edit</Button></td>
              <td><Button variant="danger" size="sm" onClick={() => handleDelete(u._id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserPage;
