"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import apiEndpoints from "../../../../config/apiEndpoints";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { CircularProgress } from "@mui/material";
import CustomTable from "../../../component/Custom_Table/CustomTable";
import { ConfirmDialog } from "primereact/confirmdialog";
import { BsChatFill } from "react-icons/bs";
import { Toast } from "primereact/toast";
import { LuClock9 } from "react-icons/lu";
import { FaShare } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoHome } from "react-icons/io5";

export default function AskAnExpert({}) {
  const [refresh, setRefresh] = useState<any>(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [inpuChatValue, setInpuChatValue] = useState<string | null>(null);
  const [chatData, setChatData] = useState<any | null>(null);
  const [inputAmount, setInputAmount] = useState<any | null>(null);
  const [showAmountField, setShowAmountField] = useState<any | boolean>(false);

  console.log("checkiiinpuQuil", chatData);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (token) {
      fetchData(token);
      fetchChatData(token);
    }
  }, [refresh, token, selectedRows]);

  async function fetchData(token: any) {
    try {
      const response = await axios.get(apiEndpoints.getAskCodeData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        let index = 1;
        const updatedData = response.data.data.map((row: any) => {
          if (row.user) {
            return {
              ...row,
              sn: index++,
              fullname: row.user.fullname,
            };
          }
          return null;
        }).filter(Boolean);
        setData(updatedData);
      } else {
        console.error("Error: Failed to fetch data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchChatData(token: any) {
    try {
      const fetchData = { id: selectedRows };

      const response = await axios.post(
        apiEndpoints.getCodeQueryById,
        fetchData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const htmlData = response.data;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlData, "text/html");

        const chatItems: any = [];
        const messages = doc.querySelectorAll(".itemdiv.dialogdiv");
        messages.forEach((message, index) => {
          const time = message.querySelector(".time .green")?.textContent || "";
          const name = message.querySelector(".name")?.textContent || "";
          const text = message.querySelector(".text")?.innerHTML || "";

          chatItems.push({ time, name, text, sn: index + 1 });
        });
        setChatData(chatItems);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  }
  const handleStatusUpdate = async (rowData: any, newStatus: number) => {
    try {
      const payload = { domain_id: rowData.domain_id, status: newStatus };

      const response = await axios.post(apiEndpoints.domainStatus, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          detail:
            newStatus === 1
              ? "Activated successfully!"
              : "Deactivated successfully!",
          life: 3000,
        });
        fetchData(token);
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update status.",
        life: 3000,
      });
    }
  };

  const handleSendMessage = async () => {
    try {
      const payload = {
        contactId: selectedRows,
        msg: inpuChatValue,
        amount: inputAmount,
        type: inputAmount ? "amount" : "",
      };

      const response = await axios.post(
        apiEndpoints.send_QueryMessage,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        fetchChatData(token);
        setShowAmountField(false);
        setInputAmount(null);
        setChatData(null);
        setInpuChatValue(null);
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update status.",
        life: 3000,
      });
    }
  };

  const columns = [
    {
      field: "fullname",
      header: "Full Name",
      sortable: true,
      width: "120px",
    },
  ];

  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["about"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const rowExpansionTemplate = (data: any) => {
    setSelectedRows(data?.contact_id);

    return (
      <div className="chat-container">
        <div className="chat-header">
          <BsChatFill className="chat-icon" size={20} />
          <span className="chat-header-text">{data?.contact_subject}</span>
        </div>

        {chatData?.map((item: any, index: number) => (
          <div className="chat-messages" key={index}>
            <div className="chat-message">
              <div className="user-message">
                <div
                  className=""
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="chat_title" style={{ color: "#478fca" }}>
                    {" "}
                    {item?.name}
                  </div>
                  <div>
                    <LuClock9 />
                    <span className="chat_title" style={{ color: "#69AA46" }}>
                      {item?.time}
                    </span>
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: item?.text }}></div>
              </div>
            </div>
          </div>
        ))}
        <div className="chat_title m-3">
          <a
            href="#/"
            style={{ color: "#478fca" }}
            onClick={(e) => setShowAmountField(true)}
          >
            Ask for Payment
          </a>
        </div>
        {showAmountField && (
          <div className="chat-input">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={inputAmount || ""}
              onChange={(e) => setInputAmount(e.target.value)}
              style={{ width: "90%", marginRight: "72px" }}
            />
          </div>
        )}
        <div className="chat-input">
          <ReactQuill
            value={inpuChatValue || ""}
            onChange={(event: any) => setInpuChatValue(event)}
            theme="snow"
            style={{
              width: "90%",
              height: "250px",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "white",
            }}
            modules={modules}
          />
          <button
            type="button"
            className="modal_send_btn"
            onClick={handleSendMessage}
          >
            <FaShare size={20} /> Send
          </button>
        </div>
      </div>
    );
  };

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
              <li className="breadcrumb-item active">Code Queries</li>
            </ol>
          </div>
        </div>
      </section>
      <div className="page-header">
				<h1>
					Code Queries
					<small>
						<i className="ace-icon fa fa-angle-double-right"></i>
						List
					</small>
					<div style={{float: "right", fontSize: "14px"}}>
						<a style={{margin: "auto", color:"#307ecc"}} href="https://staging.mybcme.com/master/viewsearchdata">
							View Data
						</a>
						&nbsp;&nbsp;
						<a style={{margin: "auto", color:"#307ecc"}} href="https://staging.mybcme.com/master/map_view">
							View Data On Map
						</a>
						&nbsp;&nbsp;
						<a style={{margin: "auto", color:"#307ecc"}} href="https://staging.mybcme.com/master/createXLS">
							Export Data
						</a>
						&nbsp;&nbsp;
						<a style={{margin: "auto", color:"#307ecc"}} href="https://staging.mybcme.com/master/exportsearchdata">
							Export Address Data
						</a>
					</div>
				</h1>
			</div>
      {data.length ? (
        <div>
          <CustomTable
            data={data}
            columns={columns}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            rowExpansionTemplate={rowExpansionTemplate}
            showExportButton={false}
            showDeleteButton={false}
            showImportButton={false}
            showExpandButton={true}
            showAddButton={false}
            showCollapseButton={true}
            headerText="Code Queries"
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="3rem" />
        </div>
      )}
      <Toast ref={toast} />
      <ConfirmDialog />
    </>
  );
}