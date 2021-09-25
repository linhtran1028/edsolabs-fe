import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  InputGroup,
  FormControl,
  Dropdown,
  Button,
  Table,
} from 'react-bootstrap';
import { getStudent } from '../../components/api/api';
import moment from 'moment';
import Header from './Header';
const firstName = (value) => {
  let name = value.split(' ');
  return name[0];
};

const lastName = (value) => {
  let name = value.split(' ');
  return name[1];
};
const gender = (value) => {
  if (value === 'M') {
    return 'Male';
  } else if (value === 'F') {
    return 'Female';
  }
};

const findAge = (value) => {
  return moment(value.dob, '').fromNow().split(' ')[0];
};

export default function HomePage(props) {
  const history = useHistory();
  const [student, setStudent] = useState();
  const [show, setShow] = useState(5);
  const [name, setName] = useState('');
  const [sex, setGender] = useState('gender');
  const [age, setAge] = useState('');
  const [search, setSearch] = useState(false);
  useEffect(() => {
    getStudent()
      .then((e) => e.data)
      .then((data) => setStudent(data))
      .catch((err) => err);
  }, []);
  if (localStorage.getItem('user') === '') {
    alert('Chưa đăng nhập');
    history.push('/Login');
  }
  const handleClick = () => {
    setShow(0);
    setSearch(!search);
  };

  return (
    <>
      <main>
        <Header />
        <section className=" container mt-5">
          <div className=" d-flex justify-content-end">
            <InputGroup
              className="mb-3 mx-3"
              onChange={(e) => setName(e.target.value.trim().toLowerCase())}
              value={name}
            >
              <FormControl
                placeholder="Search name"
                aria-label="Search name"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Dropdown>
              <Dropdown.Toggle variant="variant" className=" border mx-3">
                {sex}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setGender('Male')}>
                  Male
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setGender('Female')}>
                  Female
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <InputGroup
              className="mb-3 mx-3"
              onChange={(e) => {
                setAge(e.target.value.trim());
              }}
              value={age}
            >
              <FormControl
                placeholder="Age"
                aria-label="Age"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            {search ? (
              <Button
                variant="outline-dark"
                className=" active"
                onClick={() => handleClick()}
              >
                <i className="fas fa-search "></i>
              </Button>
            ) : (
              <Button variant="outline-dark" onClick={() => handleClick()}>
                <i className="fas fa-search "></i>
              </Button>
            )}
          </div>
          <div>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Rank</th>
                </tr>
              </thead>
              <tbody>
                {student &&
                  student.map((e, index) => {
                    if (index < show) {
                      return (
                        <tr key={index}>
                          <td>{e.id}</td>
                          <td>{firstName(e.full_name)}</td>
                          <td>{lastName(e.full_name)}</td>
                          <td>{gender(e.gender)}</td>
                          <td>{findAge(e)}</td>
                          <td>{e.rank}</td>
                        </tr>
                      );
                    } else if (search === true) {
                      if (
                        e.full_name.toLowerCase().includes(name) &&
                        gender(e.gender) === sex &&
                        findAge(e) === age
                      ) {
                        return (
                          <tr key={index}>
                            <td>{e.id}</td>
                            <td>{firstName(e.full_name)}</td>
                            <td>{lastName(e.full_name)}</td>
                            <td>{gender(e.gender)}</td>
                            <td>{findAge(e)}</td>
                            <td>{e.rank}</td>
                          </tr>
                        );
                      } else if (
                        e.full_name.toLowerCase().includes(name) &&
                        age === '' &&
                        gender(e.gender) === sex
                      ) {
                        return (
                          <tr key={index}>
                            <td>{e.id}</td>
                            <td>{firstName(e.full_name)}</td>
                            <td>{lastName(e.full_name)}</td>
                            <td>{gender(e.gender)}</td>
                            <td>{findAge(e)}</td>
                            <td>{e.rank}</td>
                          </tr>
                        );
                      } else if (
                        name === '' &&
                        gender(e.gender) === sex &&
                        findAge(e) === age
                      ) {
                        return (
                          <tr key={index}>
                            <td>{e.id}</td>
                            <td>{firstName(e.full_name)}</td>
                            <td>{lastName(e.full_name)}</td>
                            <td>{gender(e.gender)}</td>
                            <td>{findAge(e)}</td>
                            <td>{e.rank}</td>
                          </tr>
                        );
                      } else if (
                        e.full_name.toLowerCase().includes(name) &&
                        findAge(e) === age &&
                        sex === 'gender'
                      ) {
                        return (
                          <tr key={index}>
                            <td>{e.id}</td>
                            <td>{firstName(e.full_name)}</td>
                            <td>{lastName(e.full_name)}</td>
                            <td>{gender(e.gender)}</td>
                            <td>{findAge(e)}</td>
                            <td>{e.rank}</td>
                          </tr>
                        );
                      } else if (
                        e.full_name.toLowerCase().includes(name) &&
                        age === '' &&
                        sex === 'gender'
                      ) {
                        return (
                          <tr key={index}>
                            <td>{e.id}</td>
                            <td>{firstName(e.full_name)}</td>
                            <td>{lastName(e.full_name)}</td>
                            <td>{gender(e.gender)}</td>
                            <td>{findAge(e)}</td>
                            <td>{e.rank}</td>
                          </tr>
                        );
                      } else if (
                        name === '' &&
                        age === '' &&
                        gender(e.gender) === sex
                      ) {
                        return (
                          <tr key={index}>
                            <td>{e.id}</td>
                            <td>{firstName(e.full_name)}</td>
                            <td>{lastName(e.full_name)}</td>
                            <td>{gender(e.gender)}</td>
                            <td>{findAge(e)}</td>
                            <td>{e.rank}</td>
                          </tr>
                        );
                      } else if (
                        name === '' &&
                        findAge(e) === age &&
                        sex === 'gender'
                      ) {
                        return (
                          <tr key={index}>
                            <td>{e.id}</td>
                            <td>{firstName(e.full_name)}</td>
                            <td>{lastName(e.full_name)}</td>
                            <td>{gender(e.gender)}</td>
                            <td>{findAge(e)}</td>
                            <td>{e.rank}</td>
                          </tr>
                        );
                      }
                    }
                    return undefined;
                  })}
              </tbody>
            </Table>
            {show <= 25 && !search && (
              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-dark"
                  onClick={(e) => setShow(show + 6)}
                >
                  Load More Student
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
