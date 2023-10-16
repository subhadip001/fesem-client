import React, { useEffect } from "react";
import Header from "../Header/Header";
import "./Invoice.css";
import image from "./iit.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "./firebase";
import axios from "axios";

function Invoice() {
  const userName = JSON.parse(sessionStorage.getItem("name"));
  const userEmail = JSON.parse(sessionStorage.getItem("email"));
  const dept = JSON.parse(sessionStorage.getItem("dept"));
  const contactNo = JSON.parse(sessionStorage.getItem("contactNo"));
  const enrollNo = JSON.parse(sessionStorage.getItem("enrollNo"));
  const service = JSON.parse(sessionStorage.getItem("service"));
  const price = JSON.parse(sessionStorage.getItem("price"));
  const bookingCode = JSON.parse(sessionStorage.getItem("bookingTime"));
  const str = bookingCode;
  const bookingId = str.split("_")[0].split(" ")[1].split("(")[1].split("/");
  const bId = "F-" + bookingId[0] + bookingId[1] + bookingId[2].split(")")[0] + str.split("_")[1];
  const navigate = useNavigate();
  var coating = "";
  if (price % 50 == 0) {
    coating = "No";
  } else {
    coating = "Yes";
  }

  const addInvoice = async (downloadUrl) => {
    try {
      const res = await axios.post(
        "https://ni5f54c6p9.execute-api.ap-south-1.amazonaws.com/prod/fesem/addInvoice",
        {
          userEmail: userEmail,
          bookingTime: bookingCode,
          invoiceUrl: downloadUrl,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPdfDocument = (rootElementId) => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`invoice_${bId}.pdf`);

      const pdfData = pdf.output("blob");
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `invoice_${bId}.pdf`);
      const uploadTask = uploadBytesResumable(storageRef, pdfData);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress of the upload
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          // Upload completed
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Download URL:", downloadURL);
            addInvoice(downloadURL);
            setTimeout(() => {
              sessionStorage.setItem(
                "bookingsAvailableThisWeek",
                JSON.stringify(0)
              );
              navigate("/");
            }, 2000);
          });
        }
      );
    });
  };
  useEffect(() => {
    downloadPdfDocument("divToDownload");
  }, []);
  const arr = [
    "9:30 A.M - 11:00A.M",
    "11:30 A.M - 1:00P.M",
    "2:00 P.M - 3:30P.M",
    "4:00 P.M - 5:30P.M",
  ];
  return (
    <div id="divToDownload">
      <div className="invoice">
        <div className="logoHead">
          <img className="iitlogo" src={image} />
          <div className="headingiit">
            <h2 className="headLogo">
              Department of Mechanical & Industrial Engineering
            </h2>
            <h2 className="headLogo">Indian Institute of Technology Roorkee</h2>
            <h2 className="headLogo2">`Booking Form Date : {bookingCode.split("_")[0]}`</h2>
            <br />
          </div>
        </div>
      </div>
      <br />
      
      <div className="invoice-form">
        <div className="flexbox">
          <div className="flexitem1">Username:</div>
          <div className="flexitem2">{`${userName}`}</div>
          <div className="flexitem3">Department:</div>
          <div className="flexitem4">{`${dept}`}</div>
        </div>
        <div className="flexbox">
          <div className="flexitem1">Enrollment No:</div>
          <div className="flexitem2">{`${enrollNo}`}</div>
          <div className="flexitem3">Signature:</div>
          <div className="flexitem4"></div>
        </div>
        <div className="flexbox">
          <div className="flexitem5">Contact Details:</div>
          <div className="flexitem3">Booking Slot:</div>
          <div className="flexitem4">{`${arr[bookingCode.split("_")[1]]}`}</div>
        </div>

        <div className="flexbox">
          <div className="flexitem1">Email:</div>
          <div className="flexitem2">{`${userEmail}`}</div>
          <div className="flexitem3">Booking ID:</div>
          <div className="flexitem4">{bId}</div>
        </div>
        <div className="flexbox">
          <div className="flexitem1">Contact No:</div>
          <div className="flexitem2">{`${contactNo}`}</div>
          <div className="flexitem3">Total Charges</div>
          <div className="flexitem4">{`${price}`}</div>
        </div>
        <div className="flexbox">
          <div className="flexitem5">Sample Details:</div>
          <div className="flexitem3">Service Name:</div>
          <div className="flexitem4">{`${service}`}</div>
        </div>
        <div className="flexbox">
          <div className="flexitem1">Coating:</div>
          <div className="flexitem2">{coating}</div>
          <div className="flexitem3">No of Samples:</div>
          <div className="flexitem4">1</div>
        </div>
        <div className="flexbox">
          <div className="flexitem1">Supervisor Name:</div>
          <div className="flexitem2"></div>
          <div className="flexitem3">Supervisor Signature</div>
          <div className="flexitem4"></div>
        </div>
      </div>
      <>
        <p></p>
      </>
      <div className="invoice-form">
        <div className="flexbox">
          <div className="flexitem6">For MIED Once Use Only</div>
        </div>
        <div className="flexbox">
          <div className="flexitem7">Payment Reciept No: __________</div>
          <div className="flexitem7">Date: __________</div>
          <div className="flexitem7">Amount Paid: __________</div>
        </div>
        <div className="flexbox">
          <div className="flexitem6">For FESEM Operator</div>
        </div>

        <div className="flexbox">
          <div className="flexitem8">Form Recieved: Yes/No</div>
          <div className="flexitem7">Payment Recieved: Yes/No</div>
        </div>
        <div className="flexbox">
          <div className="flexitem9">Operator Signature : __________</div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
