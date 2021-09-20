import React, { useState, useEffect } from "react";
import Aside from "../Components/Aside";
import { useHistory } from "react-router-dom";
import { getTasks } from "../api/api";
import { Modal, Button } from "react-bootstrap";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import {
  PROCESS_DAY_GROUP,
  durationMins2Days,
  formatTimeSpent,
  formatNowDay,
} from "../Components/Function";
import moment from "moment";
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
function Report() {
  const history = useHistory();
  const [dateRange, setDateRange] = useState("Options");
  const [data, setData] = useState(false);
  const [show, setShow] = useState(false);
  const [totalTimer, setTotalTimer] = useState("Total time in a period");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [perO, setPerO] = useState();
  const [perM, setPerM] = useState();
  const [perT, setPerT] = useState();
  const [perC, setPerC] = useState();
  if (localStorage.getItem("user") === null) {
    alert("Chưa đăng nhập, quay về trang Login.");
    history.push("/");
  }

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getTasks()
      .then((e) => e.data)
      .then((data) => setData(data))
      .catch((err) => err);
  }, []);
  let timeO = 0;
  let timeM = 0;
  let timeT = 0;
  let timeC = 0;

  const totalTimerInRange = (e) => {
    setDateRange(e);
    if (
      data &&
      e === "Today" &&
      formatNowDay(PROCESS_DAY_GROUP(data).reverse()[0].date) ===
        formatNowDay(new Date())
    ) {
      let time0 = formatTimeSpent(
        Math.floor(
          PROCESS_DAY_GROUP(data)
            .reverse()[0]
            .tasks.map((e) => {
              let O = 0;
              let M = 0;
              let T = 0;
              let C = 0;
              if (!e.end_time) {
                alert("Exist not completed tasks");
              }
              let d = durationMins2Days(e.start_time, e.end_time);
              let arr = e.tags;
              let equally = d / arr.length;
              arr.forEach((e) => {
                if (e === 1) {
                  O = equally;
                  timeO += O;
                }
                if (e === 2) {
                  M = equally;
                  timeM += M;
                }
                if (e === 3) {
                  T = equally;
                  timeT += T;
                }
                if (e === 4) {
                  C = equally;
                  timeC += C;
                }
              });
              return d;
            })
            .reduce((pre, cur) => pre + cur)
        )
      );
      let sum = timeO + timeM + timeT + timeC;
      let perO = timeO / sum;
      let perM = timeM / sum;
      let perT = timeT / sum;
      let perC = timeC / sum;
      setPerO(perO);
      setPerM(perM);
      setPerT(perT);
      setPerC(perC);
      setTotalTimer(time0);
    } else if (
      formatNowDay(PROCESS_DAY_GROUP(data).reverse()[0].date) !==
      formatNowDay(new Date())
    ) {
      setTotalTimer(0);
    }
    if (data && e === "Yesterday") {
      let check = PROCESS_DAY_GROUP(data).filter(
        (e) =>
          formatNowDay(e.date) === formatNowDay(moment().add(-1, "days")._d)
      );
      if (check.length > 0) {
        let time1 = formatTimeSpent(
          Math.floor(
            check[0].tasks
              .map((e) => {
                let O = 0;
                let M = 0;
                let T = 0;
                let C = 0;
                if (!e.end_time) {
                  alert("Exist not completed tasks");
                }
                let d = durationMins2Days(e.start_time, e.end_time);
                let arr = e.tags;
                let equally = d / arr.length;
                arr.forEach((e) => {
                  if (e === 1) {
                    O = equally;
                    timeO += O;
                  }
                  if (e === 2) {
                    M = equally;
                    timeM += M;
                  }
                  if (e === 3) {
                    T = equally;
                    timeT += T;
                  }
                  if (e === 4) {
                    C = equally;
                    timeC += C;
                  }
                });
                return d;
              })
              .reduce((pre, cur) => pre + cur)
          )
        );
        let sum = timeO + timeM + timeT + timeC;
        let perO = timeO / sum;
        let perM = timeM / sum;
        let perT = timeT / sum;
        let perC = timeC / sum;
        setPerO(perO);
        setPerM(perM);
        setPerT(perT);
        setPerC(perC);
        setTotalTimer(time1);
      } else {
        return 0;
      }
    }
  };

  return (
    <>
      <div className="main ">
        <div className="d-flex">
          <Aside />
          <main className="job col-9">
            <header className="job__Title border-bottom border-dark">
              <h4>Productivity report</h4>
            </header>

            <section className="col-12 container d-flex justify-content-between mt-2">
              <div>
                <h4>{`${dateRange}: ${totalTimer}`}</h4>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {dateRange}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li
                    className="border-bottom dropdown-item"
                    onClick={() => totalTimerInRange("Today")}
                  >
                    Today
                  </li>
                  <li
                    className="border-bottom dropdown-item"
                    onClick={() => totalTimerInRange("Yesterday")}
                  >
                    Yesterday
                  </li>
                  <li
                    className="border-bottom dropdown-item"
                    onClick={() => totalTimerInRange("This week")}
                  >
                    This week
                  </li>
                  <li
                    className="border-bottom dropdown-item"
                    onClick={() => totalTimerInRange("Last week")}
                  >
                    Last week
                  </li>
                  <li
                    className="border-bottom dropdown-item"
                    onClick={() => totalTimerInRange("This month")}
                  >
                    This month
                  </li>
                  <li
                    className="border-bottom dropdown-item"
                    onClick={() => totalTimerInRange("Last month")}
                  >
                    Last month
                  </li>
                  <li
                    className="dropdown-item "
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    Date range
                  </li>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          totalTimerInRange("Date range");
                          handleClose();
                        }}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </ul>
              </div>
            </section>
            <div className="d-flex justify-content-around">
              <div className="col-5">
                <PieChart perO={perO} perM={perM} perT={perT} perC={perC} />
              </div>
              <div className="col-6">
                <BarChart perO={perO} perM={perM} perT={perT} perC={perC} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Report;