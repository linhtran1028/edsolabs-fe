import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getUser } from '../../Components/Api/api';

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const aut = async () => {
    const res = await getUser(username, password);
    const { data } = res;
    console.log(data);
    if (username === '' || password === '') {
      alert('Chưa đăng nhập');
    } else if (username !== 'admin@gmail.com') {
      alert('Nhập lại email');
    } else if (password !== 'admin') {
      alert('Nhập lại mật khẩu');
    }
    if (username === 'admin@gmail.com' && password === 'admin') {
      alert('Đăng nhập thành công');
      history.push('/');
    } else {
      alert('Đăng nhập lại');
    }
  };
  const handleClick = (value) => {
    localStorage.setItem('user', username);
    aut();
  };
  return (
    <main className="container d-flex justify-content-center align-items-center">
      <Card border="secondary">
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title>Admin Login</Card.Title>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="add">Email</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="add">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Button
            variant="outline-dark"
            className="mt-3"
            onClick={(value) => handleClick(value)}
          >
            Login
          </Button>
        </Card.Body>
      </Card>
    </main>
  );
}
