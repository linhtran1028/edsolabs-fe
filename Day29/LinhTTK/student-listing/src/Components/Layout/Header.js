import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Header() {
  const history = useHistory();
  const handleHome = (e) => {
    history.push('/');
  };
  const handleList = (e) => {
    history.push('/List');
  };
  const handleClickLogout = (e) => {
    history.push('/Login');
    localStorage.clear();
  };
  return (
    <>
      <main className="header ">
        <header className="header  border-bottom border-dark ">
          <div className="container justify-content-end d-flex">
            <p className="me-1">Welcome,Admin</p>
            <Dropdown>
              <Dropdown.Toggle variant="variant"></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleClickLogout()}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
        <form className="header d-flex justify-content-center mt-5">
          <Button
            variant="outline-dark"
            className="border-bottom-0 col-2 rounded-0 rounded-top"
            onClick={() => handleHome()}
          >
            Students List
          </Button>
          <Button
            variant="outline-dark"
            className="border-bottom-0 col-2 rounded-0 rounded-top"
            onClick={() => handleList()}
          >
            Teams
          </Button>
        </form>
      </main>
    </>
  );
}
