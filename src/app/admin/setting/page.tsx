"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import apiEndpoints from "../../../../config/apiEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "../../../component/Modals/AdminSettingModal";
import { IoHome } from "react-icons/io5";

export default function Settings() {
  interface Setting {
    sn: string;
    title: string;
    details: string;
    id: any;
  }

  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<any | null>(null);
  const [refresh, setRefresh] = useState(false);

  //   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedDetails(null);
  };

  const handleOpen = (row: any) => {
    setSelectedDetails(row);
    setOpen(true);
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token, refresh]);

  async function fetchData(token: any) {
    const result = await axios.get(apiEndpoints.getAllSettings, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(result.data.data);
  }

  function createInnerHTML(details: any) {
    return <span dangerouslySetInnerHTML={{ __html: details }}></span>;
  }

  let rows = data.map((obj: any, index: any) => {
    let templateObj = {
      sn: `${++index}`,
      title: obj.title ?? "",
      details: createInnerHTML(obj.details),
    };
    return templateObj;
  });

  console.log("datafind", data);

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div
            className="row mb-2 admin_setin_header"
            style={{
              background: "#E7F2F8",
              borderRadius: "5px",
              padding: "5px",
              height: "40px",
            }}
          >
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <span className="homeIcon">
                  <IoHome style={{ margin: "5px", marginBottom: "6px" }} />
                </span>
                <Link href="dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active">Admin Setting List</li>
            </ol>
          </div>
        </div>
      </section>

      <div className="table-container_admin">
        <table
          id="dynamic-table"
          className="table table-bordered "
          //   className="table table-striped table-bordered table-hover"
        >
          <thead>
            <tr className="admin_table">
              <th className="serial_no">SN</th>
              <th className="table_title">Title</th>
              <th className="table_information">Information</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, index: any) => (
              <tr className="admin_table_row" key={row.id}>
                <td>{index + 1}</td>
                <td>{row.title}</td>
                <td
                  className="table_information"
                  dangerouslySetInnerHTML={{ __html: row.details }}
                ></td>
                <td>
                  <button
                    className="action_button"
                    //   onClick={handleOpen}
                    onClick={() => handleOpen(row)}
                  >
                    <FaPencilAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          open={open}
          handleClose={handleClose}
          title="Custom Modal Title"
          description="This is a customizable modal description."
          buttonText="Confirm"
          selectedDetails={selectedDetails}
          onButtonClick={() => {
            console.log("Button clicked!");
            setRefresh((prev) => !prev);
          }}
        />
      </div>
    </>
  );
}
