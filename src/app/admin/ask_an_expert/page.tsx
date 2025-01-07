// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "primereact/button";
// import CustomTable from "../../../component/Custom_Table/CustomTable";
// import { unparse } from "json2csv"; // For CSV export
// import * as XLSX from "xlsx"; // For Excel import
// import { IoHome } from "react-icons/io5";
// import Link from "next/link";

// export default function AskAnExpert() {
//   const [data, setData] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState(null);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [expandedRows, setExpandedRows] = useState([]);

//   useEffect(() => {
//     const dummyData = [
//       {
//         sno: 1,
//         name: "John Doe",
//         amount: "$1000",
//         status: "Active",
//         date: "2023-12-01",
//       },
//       {
//         sno: 2,
//         name: "Jane Smith",
//         amount: "$2000",
//         status: "Inactive",
//         date: "2023-11-15",
//       },
//       {
//         sno: 3,
//         name: "David Johnson",
//         amount: "$1500",
//         status: "Active",
//         date: "2023-10-10",
//       },
//       {
//         sno: 4,
//         name: "Emma Brown",
//         amount: "$1200",
//         status: "Inactive",
//         date: "2023-09-21",
//       },
//       {
//         sno: 5,
//         name: "Michael Green",
//         amount: "$1800",
//         status: "Active",
//         date: "2023-08-17",
//       },
//       {
//         sno: 6,
//         name: "Michael Green",
//         amount: "$1800",
//         status: "Active",
//         date: "2023-08-17",
//       },
//       // ... More data
//     ];
//     setData(dummyData);
//   }, []);

//   // Handle Add New Data
//   const handleAdd = () => {
//     alert("Add button clicked");
//     // You can implement your add functionality here
//   };

//   // Handle Edit Data
//   const handleEdit = (data) => {
//     console.log("Edit data", data);
//     // Implement logic to edit the data
//   };

//   const handleDelete = (selectedRows) => {
//     if (selectedRows.length > 0) {
//       setData(data.filter((row) => !selectedRows.includes(row))); // Filter out selected rows from data
//       alert("Deleted selected rows");
//     } else {
//       alert("No rows selected");
//     }
//   };

//   const handleImport = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const binaryStr = e.target.result;
//       const workbook = XLSX.read(binaryStr, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);
//       setData(jsonData);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const columns = [
//     { field: "name", header: "Name" },
//     { field: "amount", header: "Amount" },
//     { field: "status", header: "Status" },
//     {
//       field: "actions",
//       header: "Actions",
//       body: (rowData:any) => (
//         <>
//           <Button
//             icon="pi pi-pencil"
//             onClick={() => handleEdit(rowData)}
//             style={{ background: "none", color: "#69AA46", border: "none" }}
//           />
//           <Button
//             icon="pi pi-trash"
//             severity="danger"
//             onClick={() => handleDelete([rowData])}
//             style={{ background: "none", color: "#c62828", border: "none" }}
//           />
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       <section className="content-header">
//         <div className="container-fluid">
//           <div
//             className="row mb-2 admin_setin_header"
//             style={{
//               background: "#E7F2F8",
//               borderRadius: "5px",
//               padding: "5px",
//               height: "40px",
//             }}
//           >
//             <ol className="breadcrumb float-sm-right">
//               <li className="breadcrumb-item">
//                 <span className="homeIcon">
//                   <IoHome style={{ margin: "5px", marginBottom: "6px" }} />
//                 </span>
//                 <Link href="dashboard">Home</Link>
//               </li>
//               <li className="breadcrumb-item active">Code Queries</li>
//             </ol>
//           </div>
//         </div>
//       </section>
//       <div className="page-header">
// 					<h1>
// 						Code Queries
// 						<small>
// 							<i className="ace-icon fa fa-angle-double-right"></i>
// 							List
// 						</small>
// 						<div style={{float: "right", fontSize: "14px"}}>
// 							<a style={{margin: "auto", color:"#307ecc"}} href="https://staging.mybcme.com/master/viewsearchdata">
// 								View Data
// 							</a>
// 							&nbsp;&nbsp;
// 							<a style={{margin: "auto", color:"#307ecc"}} href="https://staging.mybcme.com/master/map_view">
// 								View Data On Map
// 							</a>
// 							&nbsp;&nbsp;
// 							<a style={{margin: "auto", color:"#307ecc"}} href="https://staging.mybcme.com/master/createXLS">
// 								Export Data
// 							</a>
// 							&nbsp;&nbsp;
// 							<a style={{margin: "auto", color:"#307ecc"}} href="https://staging.mybcme.com/master/exportsearchdata">
// 								Export Address Data
// 							</a>
// 						</div>
// 					</h1>
// 				</div>
//       <div>
//         <CustomTable
//           data={data}
//           columns={columns}
//           selectedRows={selectedRows}
//           setSelectedRows={setSelectedRows}
//           onAdd={handleAdd}
//           onDelete={handleDelete}
//           globalFilter={globalFilter}
//           setGlobalFilter={setGlobalFilter}
//           selectionMode="checkbox"
//           // onImport={handleImport}
//           expandedRows={expandedRows}
//           setExpandedRows={setExpandedRows}
//           showExportButton={true}
//         />
//       </div>
//     </>
//   );
// }


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
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { BsChatFill } from "react-icons/bs";
import { Toast } from "primereact/toast";
import { LuClock9 } from "react-icons/lu";
import { FaShare } from "react-icons/fa";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { IoHome } from "react-icons/io5";
import { Dropdown } from "primereact/dropdown";

export default function AskAnExpert({ }) {
  const [refresh, setRefresh] = useState<any>(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedQueryRows, setSelectedQueryRows] = useState([]);
  const [inpuChatValue, setInpuChatValue] = useState<string | null>(null);
  const [chatData, setChatData] = useState<any | null>(null);
  const [inputAmount, setInputAmount] = useState<any | null>(null);
  const [showAmountField, setShowAmountField] = useState<any | boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  console.log("checkiiinpuQuil", chatData);
  const toast = useRef<Toast>(null);

  // useEffect(() => {
  //   if (token) {
  //     fetchData(token);
  //     fetchChatData(token);
  //   }
  // }, [refresh, token, selectedQueryRows]);

  useEffect(() => {
    if (token) {
      fetchData(token);
      fetchChatData(token);
    }
  }, [refresh, token, statusFilter, dateFilter, selectedQueryRows]);

  const handleStatusFilter = (e: any) => {
    setStatusFilter(e.value);
  };

  const handleDateFilter = (e: any) => {
    setDateFilter(e.value);
  };

  async function fetchData(token: any) {
    try {
      const response = await axios.get(apiEndpoints.getAskCodeData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        let index = 1;
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let updatedData = response.data.data
          .map((row: any) => {
            if (row.user) {
              const date = new Date(row.contact_created);
              let month = monthNames[date.getMonth()];
              let day = String(date.getDate()).padStart(2, "0");
              let year = date.getFullYear();
              return {
                ...row,
                sn: index++,
                fullname: row.user.fullname,
                contact_created: `${month}-${day}-${year}`
              };
            }
            return null;
          })
          .filter(Boolean);

        // Apply status filter
        if (statusFilter === "open") {
          updatedData = updatedData.filter(
            (row: any) => row.contact_status === 1
          );
        } else if (statusFilter === "closed") {
          updatedData = updatedData.filter(
            (row: any) => row.contact_status === 2
          );
        }

        // Apply Date Filter

        let now = new Date();
        let thisMonth = monthNames[now.getMonth()];
        let thisYear = now.getFullYear();

        if (dateFilter === "thisMonth") {
          updatedData = updatedData.filter(
            (row: any) => row.contact_created.includes(thisMonth)
          );
        }

        if (dateFilter === "thisYear") {
          updatedData = updatedData.filter(
            (row: any) => row.contact_created.includes(`${thisYear}`)
          );
        }

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
      const fetchData = { id: selectedQueryRows };

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

  const handleExportData = async (e: any) => {
    e.preventDefault(); // Prevent default navigation
    try {
      // Call the API for exporting data
      const response = await axios.get(apiEndpoints.createXLS, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token here
        },
        responseType: 'blob', // Important for handling binary data
      });
      if (typeof window !== "undefined") {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported_data.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleExportAddressData = async (e: any) => {
    e.preventDefault(); // Prevent default navigation
    try {
      // Call the API for exporting address data
      const response = await axios.get(apiEndpoints.exportSearchData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token here
        },
        responseType: 'blob', // Important for handling binary data
      });
      if (typeof window !== "undefined") {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported_address_data.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (error) {
      console.error('Error exporting address data:', error);
    }
  };

  const handleDelete = (rowData: any) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",

      accept: async () => {
        try {
          await axios.post(
            apiEndpoints.deleteCodeQuery,
            { contact_id: rowData.contact_id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.current?.show({
            severity: "warn",
            detail: "Row deleted successfully!",
            life: 3000,
          });
          fetchData(token);
        } catch (error) {
          console.error("Error deleting:", error);
          toast.current?.show({
            severity: "error",
            detail: "Error deleting the row.",
            life: 3000,
          });
        }
      },
    });
  };

  const handleMultiDelete = (selectedRows:any) => {
    console.log("selected rows is", selectedRows);
    // return;
    confirmDialog({
      message: "Do you want to delete these records?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",

      accept: async () => {
        try {
          for (const row of selectedRows) {
            await axios.post(
              apiEndpoints.deleteCodeQuery,
              { contact_id: row.contact_id },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
          toast.current?.show({
            severity: "warn",
            detail: "Rows deleted successfully!",
            life: 3000,
          });
          fetchData(token);
        } catch (error) {
          console.error("Error deleting:", error);
          toast.current?.show({
            severity: "error",
            detail: "Error deleting the row.",
            life: 3000,
          });
        }
      },
    });
  };


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
        contactId: selectedQueryRows,
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
      field: "sn",
      header: "S. No.",
      sortable: true,
    },
    {
      field: "fullname",
      header: "Full Name",
      sortable: true,
      width: "120px",
    },
    { field: "contact_price", header: "Amount", sortable: true },
    // {
    //   field: "contact_status",
    //   header: "Status",
    //   width: "120px",
    //   body: (rowData: any) => (
    //     <Button
    //       label={rowData.contact_status === 1 ? "Open" : "Close"}
    //       style={{
    //         background: rowData.contact_status === 1 ? "#F89406" : "#F89406",
    //         color: "#FFF",
    //         border: "none",
    //         height: "20px",
    //       }}
    //       onClick={() =>
    //         handleStatusUpdate(rowData, rowData.contact_status === 1 ? 2 : 1)
    //       }
    //     />
    //   ),
    // },
    {
      field: "contact_status",
      header: (
        <div style={{ justifyContent: "space-between" }}>
          <span>Status</span>
          <Dropdown
            value={statusFilter}
            options={[
              { label: "All", value: "all" },
              { label: "Open", value: "open" },
              { label: "Closed", value: "closed" },
            ]}
            onChange={handleStatusFilter}
            placeholder="Filter"
            style={{ width: "120px" }}
          />
        </div>
      ),
      width: "120px",
      body: (rowData: any) => (
        <Button
          label={rowData.contact_status === 1 ? "Open" : "Closed"}
          style={{
            background: rowData.contact_status === 1 ? "#F89406" : "#D9534F",
            color: "#FFF",
            border: "none",
            height: "20px",
          }}
        />
      ),
    },
    {
      field: "contact_created",
      width: "120px",
      header: (
        <div style={{ justifyContent: "space-between" }}>
          <span>Date</span>
          <Dropdown
            value={dateFilter}
            options={[
              { label: "All", value: "all" },
              { label: "This month", value: "thisMonth" },
              { label: "This Year", value: "thisYear" },
            ]}
            onChange={handleDateFilter}
            placeholder="Filter"
            style={{ width: "120px" }}
          />
        </div>
      ),
    },
    {
      field: "actions",
      header: "Actions",
      body: (rowData: any) => (
        <div className="" style={{ width: "120px", display: 'flex' }}>

          <Button
            icon="pi pi-trash"
            severity="danger"
            onClick={() => handleDelete(rowData)}
            style={{ background: "none", color: "#337ab7", border: "none" }}
          />
          <Button
            icon="pi pi-envelope"
            style={{ background: "none", color: "#337ab7", border: "none" }}
          />
          <input
            type="checkbox"
            checked={selectedRows.some((row: any) => row.sn === rowData.sn)}
            onChange={(e: any) => {
              if (e.target.checked) {
                // Add row to selected rows
                setSelectedRows((prev: any[]) => [...prev, rowData]);
              } else {
                // Remove row from selected rows
                setSelectedRows((prev: any[]) =>
                  prev.filter((row: any) => row.sn !== rowData.sn)
                );
              }
            }}
          />
        </div>
      ),
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
    setSelectedQueryRows(data?.contact_id);

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
            <i className="ace-icon fa fa-angle-double-right"></i> List
          </small>
          <div style={{ float: "right", fontSize: "14px" }}>
            <Link href="/admin/view_search_data" style={{ margin: 'auto', color: '#307ecc' }}>
              View Data
            </Link>
            &nbsp;&nbsp;
            <Link href="/admin/map_view" style={{ margin: 'auto', color: '#307ecc' }}>
              View Data On Map
            </Link>
            &nbsp;&nbsp;
            <a
              href="#"
              style={{ margin: 'auto', color: '#307ecc' }}
              onClick={handleExportData}
            >
              Export Data
            </a>
            &nbsp;&nbsp;
            <a
              href="#"
              style={{ margin: 'auto', color: '#307ecc' }}
              onClick={handleExportAddressData}
            >
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
            onDelete={handleMultiDelete}
            rowExpansionTemplate={rowExpansionTemplate}
            showExportButton={false}
            showDeleteButton={true}
            showImportButton={false}
            showExpandButton={true}
            showAddButton={false}
            showCollapseButton={true}
            headerText="Code Queries" onAdd={undefined} exportToCSV={undefined} selectionMode={undefined} />
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


// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Link from "next/link";
// import apiEndpoints from "../../../../config/apiEndpoints";
// import { Button } from "primereact/button";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store/index";
// import { CircularProgress } from "@mui/material";
// import CustomTable from "../../../component/Custom_Table/CustomTable";
// import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
// import { BsChatFill } from "react-icons/bs";
// import { Toast } from "primereact/toast";
// import { LuClock9 } from "react-icons/lu";
// import { FaShare } from "react-icons/fa";
// // import ReactQuill from "react-quill";
// import dynamic from "next/dynamic";

// // Dynamically import ReactQuill with SSR disabled
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";
// import { IoHome } from "react-icons/io5";
// import { Dropdown } from "primereact/dropdown";

// export default function AskAnExpert({ }) {
//   const [refresh, setRefresh] = useState<any>(false);
//   const token = useSelector((state: RootState) => state.auth.token);
//   const [data, setData]: [any, Function] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState(null);
//   const [selectedRows, setSelectedRows] = useState<any[]>([]);
//   const [selectedQueryRows, setSelectedQueryRows] = useState([]);
//   const [inpuChatValue, setInpuChatValue] = useState<string | null>(null);
//   const [chatData, setChatData] = useState<any | null>(null);
//   const [inputAmount, setInputAmount] = useState<any | null>(null);
//   const [showAmountField, setShowAmountField] = useState<any | boolean>(false);
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [dateFilter, setDateFilter] = useState<string>("all");

//   console.log("checkiiinpuQuil", data);
//   const toast = useRef<Toast>(null);

//   useEffect(() => {
//     if (token) {
//       fetchData(token);
//       fetchChatData(token);
//     }
//   }, [refresh, token, statusFilter, dateFilter]);

//   const handleStatusFilter = (e: any) => {
//     setStatusFilter(e.value);
//   };

//   const handleDateFilter = (e: any) => {
//     setDateFilter(e.value);
//   };

//   // async function fetchData(token: any) {
//   //   try {
//   //     const response = await axios.get(apiEndpoints.getAskCodeData, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });

//   //     if (response.status === 200) {
//   //       let index = 1;
//   //       const updatedData = response.data.data
//   //         .map((row: any) => {
//   //           if (row.user) {
//   //             return {
//   //               ...row,
//   //               sn: index++,
//   //               fullname: row.user.fullname,
//   //             };
//   //           }
//   //           return null;
//   //         })
//   //         .filter(Boolean);
//   //       setData(updatedData);
//   //     } else {
//   //       console.error("Error: Failed to fetch data. Status:", response.status);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //   }
//   // }

//   const fetchData = async (token: any) => {
//     try {
//       const response = await axios.get(apiEndpoints.getAskCodeData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200) {
//         let index = 1;
//         const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         let updatedData = response.data.data
//           .map((row: any) => {
//             if (row.user) {
//               const date = new Date(row.contact_created);
//               let month = monthNames[date.getMonth()];
//               let day = String(date.getDate()).padStart(2, "0");
//               let year = date.getFullYear();
//               return {
//                 ...row,
//                 sn: index++,
//                 fullname: row.user.fullname,
//                 contact_created: `${month}-${day}-${year}`
//               };
//             }
//             return null;
//           })
//           .filter(Boolean);

//         // Apply status filter
//         if (statusFilter === "open") {
//           updatedData = updatedData.filter(
//             (row: any) => row.contact_status === 1
//           );
//         } else if (statusFilter === "closed") {
//           updatedData = updatedData.filter(
//             (row: any) => row.contact_status === 2
//           );
//         }

//         // Apply Date Filter

//         let now = new Date();
//         let thisMonth = monthNames[now.getMonth()];
//         let thisYear = now.getFullYear();

//         if (dateFilter === "thisMonth") {
//           updatedData = updatedData.filter(
//             (row: any) => row.contact_created.includes(thisMonth)
//           );
//         }

//         if (dateFilter === "thisYear") {
//           updatedData = updatedData.filter(
//             (row: any) => row.contact_created.includes(`${thisYear}`)
//           );
//         }

//         setData(updatedData);
//       } else {
//         console.error("Error: Failed to fetch data. Status:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   async function fetchChatData(token: any) {
//     try {
//       const fetchData = { id: selectedQueryRows };

//       const response = await axios.post(
//         apiEndpoints.getCodeQueryById,
//         fetchData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.status === 200) {
//         const htmlData = response.data;
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlData, "text/html");

//         const chatItems: any = [];
//         const messages = doc.querySelectorAll(".itemdiv.dialogdiv");
//         messages.forEach((message, index) => {
//           const time = message.querySelector(".time .green")?.textContent || "";
//           const name = message.querySelector(".name")?.textContent || "";
//           const text = message.querySelector(".text")?.innerHTML || "";

//           chatItems.push({ time, name, text, sn: index + 1 });
//         });
//         setChatData(chatItems);
//       }
//     } catch (error) {
//       console.error("Error fetching chat data:", error);
//     }
//   }

//   const handleExportData = async (e: any) => {
//     e.preventDefault(); // Prevent default navigation
//     try {
//       // Call the API for exporting data
//       const response = await axios.get(apiEndpoints.createXLS, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add Bearer token here
//         },
//         responseType: "blob", // Important for handling binary data
//       });
//       if (typeof window !== "undefined") {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "exported_data.xlsx";
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//       }
//     } catch (error) {
//       console.error("Error exporting data:", error);
//     }
//   };

//   const handleExportAddressData = async (e: any) => {
//     e.preventDefault(); // Prevent default navigation
//     try {
//       // Call the API for exporting address data
//       const response = await axios.get(apiEndpoints.exportSearchData, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add Bearer token here
//         },
//         responseType: "blob", // Important for handling binary data
//       });
//       if (typeof window !== "undefined") {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "exported_address_data.xlsx";
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//       }
//     } catch (error) {
//       console.error("Error exporting address data:", error);
//     }
//   };

//   const handleDelete = (rowData: any) => {
//     confirmDialog({
//       message: "Do you want to delete this record?",
//       header: "Delete Confirmation",
//       icon: "pi pi-info-circle",
//       defaultFocus: "reject",
//       acceptClassName: "p-button-danger",

//       accept: async () => {
//         try {
//           await axios.post(
//             apiEndpoints.deleteCodeQuery,
//             { contact_id: rowData.contact_id },
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           toast.current?.show({
//             severity: "warn",
//             detail: "Row deleted successfully!",
//             life: 3000,
//           });
//           fetchData(token);
//         } catch (error) {
//           console.error("Error deleting:", error);
//           toast.current?.show({
//             severity: "error",
//             detail: "Error deleting the row.",
//             life: 3000,
//           });
//         }
//       },
//     });
//   };

//   const handleMultiDelete = (selectedRows: any) => {
//     console.log("selected rows is", selectedRows);
//     // return;
//     confirmDialog({
//       message: "Do you want to delete these records?",
//       header: "Delete Confirmation",
//       icon: "pi pi-info-circle",
//       defaultFocus: "reject",
//       acceptClassName: "p-button-danger",

//       accept: async () => {
//         try {
//           for (const row of selectedRows) {
//             await axios.post(
//               apiEndpoints.deleteCodeQuery,
//               { contact_id: row.contact_id },
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//           }
//           toast.current?.show({
//             severity: "warn",
//             detail: "Rows deleted successfully!",
//             life: 3000,
//           });
//           fetchData(token);
//         } catch (error) {
//           console.error("Error deleting:", error);
//           toast.current?.show({
//             severity: "error",
//             detail: "Error deleting the row.",
//             life: 3000,
//           });
//         }
//       },
//     });
//   };

//   const handleStatusUpdate = async (rowData: any, newStatus: number) => {
//     try {
//       const payload = { domain_id: rowData.domain_id, status: newStatus };

//       const response = await axios.post(apiEndpoints.domainStatus, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200) {
//         toast.current?.show({
//           severity: "success",
//           detail:
//             newStatus === 1
//               ? "Activated successfully!"
//               : "Deactivated successfully!",
//           life: 3000,
//         });
//         fetchData(token);
//       }
//     } catch (error) {
//       toast.current?.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Failed to update status.",
//         life: 3000,
//       });
//     }
//   };

//   const handleSendMessage = async () => {
//     try {
//       const payload = {
//         contactId: selectedQueryRows,
//         msg: inpuChatValue,
//         amount: inputAmount,
//         type: inputAmount ? "amount" : "",
//       };

//       const response = await axios.post(
//         apiEndpoints.send_QueryMessage,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         fetchChatData(token);
//         setShowAmountField(false);
//         setInputAmount(null);
//         setChatData(null);
//         setInpuChatValue(null);
//       }
//     } catch (error) {
//       toast.current?.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Failed to update status.",
//         life: 3000,
//       });
//     }
//   };

//   const columns = [
//     {
//       field: "sn",
//       header: "S. No.",
//       sortable: true,
//     },
//     {
//       field: "fullname",
//       header: "Full Name",
//       sortable: true,
//       width: "120px",
//     },
//     { field: "contact_price", header: "Amount", sortable: true },
//     // {
//     //   field: "contact_status",
//     //   header: "Status",
//     //   width: "120px",
//     //   body: (rowData: any) => (
//     //     <Button
//     //       label={rowData.contact_status === 1 ? "Open" : "Close"}
//     //       style={{
//     //         background: rowData.contact_status === 1 ? "#F89406" : "#F89406",
//     //         color: "#FFF",
//     //         border: "none",
//     //         height: "20px",
//     //       }}
//     //       onClick={() =>
//     //         handleStatusUpdate(rowData, rowData.contact_status === 1 ? 2 : 1)
//     //       }
//     //     />
//     //   ),
//     // },
//     {
//       field: "contact_status",
//       header: (
//         <div style={{ justifyContent: "space-between" }}>
//           <span>Status</span>
//           <Dropdown
//             value={statusFilter}
//             options={[
//               { label: "All", value: "all" },
//               { label: "Open", value: "open" },
//               { label: "Closed", value: "closed" },
//             ]}
//             onChange={handleStatusFilter}
//             placeholder="Filter"
//             style={{ width: "120px" }}
//           />
//         </div>
//       ),
//       width: "120px",
//       body: (rowData: any) => (
//         <Button
//           label={rowData.contact_status === 1 ? "Open" : "Closed"}
//           style={{
//             background: rowData.contact_status === 1 ? "#F89406" : "#D9534F",
//             color: "#FFF",
//             border: "none",
//             height: "20px",
//           }}
//         />
//       ),
//     },
//     {
//       field: "contact_created",
//       width: "120px",
//       header: (
//         <div style={{ justifyContent: "space-between" }}>
//           <span>Date</span>
//           <Dropdown
//             value={dateFilter}
//             options={[
//               { label: "All", value: "all" },
//               { label: "This month", value: "thisMonth" },
//               { label: "This Year", value: "thisYear" },
//             ]}
//             onChange={handleDateFilter}
//             placeholder="Filter"
//             style={{ width: "120px" }}
//           />
//         </div>
//       ),
//     },
//     {
//       field: "actions",
//       header: "Actions",
//       body: (rowData: any) => (
//         <div className="" style={{ width: "120px", display: "flex" }}>
//           <Button
//             icon="pi pi-trash"
//             severity="danger"
//             onClick={() => handleDelete(rowData)}
//             style={{ background: "none", color: "#337ab7", border: "none" }}
//           />
//           <Button
//             icon="pi pi-envelope"
//             style={{ background: "none", color: "#337ab7", border: "none" }}
//           />
//           <input
//             type="checkbox"
//             checked={selectedRows.some((row: any) => row.sn === rowData.sn)}
//             onChange={(e: any) => {
//               if (e.target.checked) {
//                 // Add row to selected rows
//                 setSelectedRows((prev: any[]) => [...prev, rowData]);
//               } else {
//                 // Remove row from selected rows
//                 setSelectedRows((prev: any[]) =>
//                   prev.filter((row: any) => row.sn !== rowData.sn)
//                 );
//               }
//             }}
//           />
//         </div>
//       ),
//     },
//   ];

//   const modules = {
//     toolbar: [
//       ["bold", "italic"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       ["link"],
//       ["about"],
//     ],
//     clipboard: {
//       matchVisual: false,
//     },
//   };

//   const rowExpansionTemplate = (data: any) => {
//     setSelectedQueryRows(data?.contact_id);

//     return (
//       <div className="chat-container">
//         <div className="chat-header">
//           <BsChatFill className="chat-icon" size={20} />
//           <span className="chat-header-text">{data?.contact_subject}</span>
//         </div>

//         {chatData?.map((item: any, index: number) => (
//           <div className="chat-messages" key={index}>
//             <div className="chat-message">
//               <div className="user-message">
//                 <div
//                   className=""
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <div className="chat_title" style={{ color: "#478fca" }}>
//                     {" "}
//                     {item?.name}
//                   </div>
//                   <div>
//                     <LuClock9 />
//                     <span className="chat_title" style={{ color: "#69AA46" }}>
//                       {item?.time}
//                     </span>
//                   </div>
//                 </div>
//                 <div dangerouslySetInnerHTML={{ __html: item?.text }}></div>
//               </div>
//             </div>
//           </div>
//         ))}
//         <div className="chat_title m-3">
//           <a
//             href="#/"
//             style={{ color: "#478fca" }}
//             onClick={(e) => setShowAmountField(true)}
//           >
//             Ask for Payment
//           </a>
//         </div>
//         {showAmountField && (
//           <div className="chat-input">
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Amount"
//               value={inputAmount || ""}
//               onChange={(e) => setInputAmount(e.target.value)}
//               style={{ width: "90%", marginRight: "72px" }}
//             />
//           </div>
//         )}
//         <div className="chat-input">
//           <ReactQuill
//             value={inpuChatValue || ""}
//             onChange={(event: any) => setInpuChatValue(event)}
//             theme="snow"
//             style={{
//               width: "90%",
//               height: "250px",
//               overflowY: "auto",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               background: "white",
//             }}
//             modules={modules}
//           />
//           <button
//             type="button"
//             className="modal_send_btn"
//             onClick={handleSendMessage}
//           >
//             <FaShare size={20} /> Send
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <section className="content-header">
//         <div className="container-fluid">
//           <div
//             className="row mb-2 admin_setin_header"
//             style={{
//               background: "#E7F2F8",
//               borderRadius: "5px",
//               padding: "5px",
//               height: "40px",
//             }}
//           >
//             <ol className="breadcrumb float-sm-right">
//               <li className="breadcrumb-item">
//                 <span className="homeIcon">
//                   <IoHome style={{ margin: "5px", marginBottom: "6px" }} />
//                 </span>
//                 <Link href="dashboard">Home</Link>
//               </li>
//               <li className="breadcrumb-item active">Code Queries</li>
//             </ol>
//           </div>
//         </div>
//       </section>
//       <div className="page-header">
//         <h1>
//           Code Queries
//           <small>
//             <i className="ace-icon fa fa-angle-double-right"></i> List
//           </small>
//           <div style={{ float: "right", fontSize: "14px" }}>
//             <Link
//               href="/admin/view_search_data"
//               style={{ margin: "auto", color: "#307ecc" }}
//             >
//               View Data
//             </Link>
//             &nbsp;&nbsp;
//             <Link
//               href="/admin/map_view"
//               style={{ margin: "auto", color: "#307ecc" }}
//             >
//               View Data On Map
//             </Link>
//             &nbsp;&nbsp;
//             <a
//               href="#"
//               style={{ margin: "auto", color: "#307ecc" }}
//               onClick={handleExportData}
//             >
//               Export Data
//             </a>
//             &nbsp;&nbsp;
//             <a
//               href="#"
//               style={{ margin: "auto", color: "#307ecc" }}
//               onClick={handleExportAddressData}
//             >
//               Export Address Data
//             </a>
//           </div>
//         </h1>
//       </div>
//       {data.length ? (
//         <div>
//           <CustomTable
//             data={data}
//             columns={columns}
//             selectedRows={selectedRows}
//             setSelectedRows={setSelectedRows}
//             globalFilter={globalFilter}
//             setGlobalFilter={setGlobalFilter}
//             onDelete={handleMultiDelete}
//             rowExpansionTemplate={rowExpansionTemplate}
//             showExportButton={false}
//             showDeleteButton={true}
//             showImportButton={false}
//             showExpandButton={true}
//             showAddButton={false}
//             showCollapseButton={true}
//             headerText="Code Queries"
//             onAdd={undefined}
//             exportToCSV={undefined}
//             selectionMode={undefined}
//           />
//         </div>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <CircularProgress size="3rem" />
//         </div>
//       )}
//       <Toast ref={toast} />
//       <ConfirmDialog />
//     </>
//   );
// }

