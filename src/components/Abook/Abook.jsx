import React, { useEffect, useState } from "react";
import "./Abook.css";
import Header from "../Header/Header";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const baseUrl = "https://api.subhadipmandal.engineer"

  const fetchdata = async () => {
    setLoading(true);
    fetch(baseUrl+"/fesem/book/fetch")
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
        setLoading(false);
        
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);


  const handleSubmit = async(e) => {
    if(tempBook === ""){
      alert("Please select a slot to block");
      return;
    }
    
    try {
      const res = await axios.post(baseUrl+"/fesem/book", {
        bookingTime : tempBook,
        userName : "admin"
      });
      console.log(tempBook)
      console.log(res.data);
      fetchdata()
      console.log(tempBook)
    } catch (error) {
      console.log(error);
    }
    fetchdata()
    console.log("hello")
  }

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
                style={{ textAlign: "center" }}
                scope="colgroup"
              >
                Time
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
                              var y = null;
                              y = !avail ? string : y;
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
            
              <div className="button">
                <input onClick={()=>{console.log("h") + handleSubmit()}} type="button" value="Block Slot" />
              </div>
            
            <div
              onClick={() => {
                navigate("/");
              }}
            >
              <div className="button">
                <input type="button" value="Go Back" />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Abook;