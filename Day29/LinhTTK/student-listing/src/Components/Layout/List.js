import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Header from './Header';
import { getStudent } from '../../Components/Api/api';

const removeItem = (arr, e) => {
  const index = arr.indexOf(e);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return e;
};

const group = (e) => {
  const arr = [];
  e.forEach((item) => {
    const index = arr.findIndex((_item) => {
      return _item.rank === item.rank;
    });
    if (index === -1) {
      arr.push(item);
      removeItem(e, item);
    }
  });
  return arr;
};
List.propTypes = {};

export default function List(props) {
  const [list, setList] = useState();
  useEffect(() => {
    getStudent()
      .then((e) => e.data)
      .then((data) => setList(data))
      .catch(alert('ERR!!'));
  }, []);
  let newArray = [];
  let totalArray = [];
  if (list) {
    newArray = [...list];
    totalArray.push(
      group(newArray),
      group(newArray),
      group(newArray),
      group(newArray),
      newArray
    );
  }
  return (
    <>
      <Header />
      <section className="d-flex flex-row flex-wrap justify-content-evenly">
        {list &&
          totalArray.map((arr, i) => {
            return (
              <div key={i} className="d-flex flex-column">
                <p>{`Team ${i + 1}`}</p>
                <Table className="list border">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Rank</th>
                    </tr>
                  </thead>
                  {arr.map((e, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{e.full_name}</td>
                          <td>{e.rank}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              </div>
            );
          })}
      </section>
    </>
  );
}
