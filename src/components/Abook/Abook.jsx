import React, { useEffect, useState } from "react";
import "./Abook.css";
import Header from "../Header/Header";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const nextDate = (index) => {
  var today = new Date();
  today.setDate(today.getDate() + ((index - 1 - today.getDay() + 7) % 7) + 1);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const string = `${days[index % 7]} (${("0" + today.getDate()).slice(-2)}/${(
    "0" +
    (today.getMonth() + 1)
  ).slice(-2)}/${today.getFullYear() % 100})`;
  return string;
};

function Abook() {
  const [detail, setDetail] = useState(new Map());
  const [bid, setBid] = useState("");
  const [tempBook, setTempBook] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const arr = [0, 1, 2, 3, 4, 5];
  const slots = [0, 1, 2, 3];
  const details = new Map();
  const baseUrl =
    "https://ni5f54c6p9.execute-api.ap-south-1.amazonaws.com/prod";

  const fetchdata = async () => {
    fetch(baseUrl + "/fesem/book/fetch")
      .then(async (res) => {
        var body = await res.json();
        body.array?.map((items) => {
          details.set(items.bookingCode, items.userName);
        });
        setDetail(details);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
        window.location.reload();
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (tempBook !== "") {
      fetch(baseUrl + "/fesem/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingTime: tempBook,
          userName: "admin",
        }),
      })
        .then((data) => {
          data.json();
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
      var det = new Map();
      det = detail;
      det.set(tempBook, "admin");
      setDetail(det);
      setBid("");
      setTempBook("");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 30);
    }
  };

  return (
    <>
      <Header />
      <>
        <LoadingSpinner loading={loading} />
        <div
          className="table"
          style={loading ? { display: "none" } : { display: "block" }}
        >
          <p className="title" style={{ fontWeight: "bold" }}>
            Welcome Admin, Block the slots by clicking the slot and clicking
            Block Slot
          </p>
          <table className="booking-details">
            <col />
            <colgroup span="4"></colgroup>
            <tr>
              <td rowSpan="2"></td>
              <th
                colSpan="4"
                className="time"
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  textDecoration: "underline",
                }}
                scope="colgroup"
              >
                Slot Time
              </th>
            </tr>
            <tr>
              <th scope="col">9:30 A.M - 11:00A.M</th>
              <th scope="col">11:30 A.M - 1:00P.M</th>
              <th scope="col">2:00 P.M - 3:30P.M</th>
              <th scope="col">4:00 P.M - 5:30P.M</th>
            </tr>
            {detail !== undefined &&
              arr.map(function (v, i) {
                return (
                  <tr key={i}>
                    <th scope="row">{`${nextDate(i + 1)}`}</th>

                    {slots.map(function (value, x) {
                      const string = `${nextDate(i + 1)}_${value}`;
                      const avail = detail.get(`${nextDate(i + 1)}_${value}`);
                      return (
                        <td key={value}>
                          <button
                            id={`${i}${x}`}
                            onClick={() => {
                              var y = !avail ? string : null;
                              setTempBook(y);

                              setBid(`${i}${x}`);
                            }}
                            className="table-button"
                            style={
                              bid === `${i}${x}`
                                ? { backgroundColor: "orange" }
                                : avail === "admin"
                                ? { backgroundColor: "grey" }
                                : avail
                                ? { backgroundColor: "red" }
                                : { backgroundColor: "#51CA26" }
                            }
                            disabled={avail}
                          >
                            {avail === "admin"
                              ? "Not-Available"
                              : !avail
                              ? "Available"
                              : "Booked"}
                          </button>{" "}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </table>
          <div className="adminForm">
            <form onSubmit={handleSubmit}>
              <div className="button">
                <input type="submit" value="Block Slot" />
              </div>
            </form>
            <form
              onSubmit={() => {
                navigate("/");
              }}
            >
              <div className="button">
                <input type="submit" value="Go Back" />
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
}

export default Abook;
