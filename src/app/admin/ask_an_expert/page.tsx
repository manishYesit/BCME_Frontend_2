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
import { Dialog } from "primereact/dialog";

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
  const [filters, setFilters] = useState<any[]>([]);
  const [applyMode, setApplyMode] = useState<string>('AND');
  const [applyFilter, setApplyFilter] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState(data);

  // console.log("checkiiinpuQuil", chatData);
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
  }, [refresh, token, statusFilter, dateFilter, selectedQueryRows, applyFilter]);

  useEffect(() => {
    // Sync filteredData with data when data prop changes
    setFilteredData(data);
  }, [data]);

  const handleStatusFilter = (e: any) => {
    setStatusFilter(e.value);
  };

  const handleDateFilter = (e: any) => {
    setDateFilter(e.value);
  };

  const handleApplyMode = (e: any) => {
    setApplyMode(e.value);
  };

  const handleAddFilter = () => {
    setFilters([...filters, { column: '', condition: '', value: '' }]);
  }

  function updateFilter(index: number, key: string | number, value: any) {
    const updatedFilters = [...filters];
    updatedFilters[index][key] = value;
    setFilters(updatedFilters);
  }

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

        if (applyFilter) {
          updatedData = updatedData.filter((row: any) => {
            return filters.every((filter: any) => {
              const columnValue = row[filter.column];
              switch (filter.condition) {
                case 'equals':
                  return columnValue === filter.value;
                case 'contains':
                  return columnValue.includes(filter.value);
                case 'greater than':
                  return columnValue > filter.value;
                case 'less than':
                  return columnValue < filter.value;
                default:
                  return true;
              }
            });
          });
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

  const handleEmailQuery = (rowData: any) => {
    confirmDialog({
      message: "Do you want to send query on email?",
      header: "Email Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",

      accept: async () => {
        try {
          await axios.post(
            apiEndpoints.sendQueryOnEmail,
            { id: rowData.contact_id, type: rowData.question_type },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.current?.show({
            severity: "success",
            detail: "Email sent successfully!",
            life: 3000,
          });
          fetchData(token);
        } catch (error) {
          console.error("Error deleting:", error);
          toast.current?.show({
            severity: "error",
            detail: "Error sending the email.",
            life: 3000,
          });
        }
      },
    });
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

  const handleMultiDelete = (selectedRows: any) => {
    // console.log("selected rows is", selectedRows);
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

  const handleApply = () => {
    const applyFilters = () => {
      return data.filter((row: any) => {

        if (applyMode === 'AND') {
          return filters.every((filter) => matchCondition(row[filter.column], filter));
        } else {
          return filters.some((filter) => matchCondition(row[filter.column], filter));
        }
      });
    };

    const matchCondition = (fieldValue: any, filter: any) => {

      if (!fieldValue || !filter.value) return false;
      // console.log("fieldValue & filter value is", fieldValue, filter.value, fieldValue === filter.value);
      switch (filter.condition) {
        case 'equals':
          return fieldValue == filter.value;
        case 'not_equal':
          return fieldValue != filter.value;
        case 'contains':
          if (filter.value == "all") {
            return true;
          } else if (filter.value == "open" || filter.value == "closed") {
            setStatusFilter(filter.value);
          } else if (filter.value == "thisMonth" || filter.value == "thisYear") {
            setDateFilter(filter.value);
          } else {
            return fieldValue.toString().includes(filter.value);
          }
        case 'less_than':
          return fieldValue < filter.value;
        case 'less_or_equal':
          return fieldValue <= filter.value;
        case 'greater than':
          return fieldValue > filter.value;
        case 'greater_or_equal':
          return fieldValue >= filter.value;
        case 'is_null':
          return fieldValue === null || fieldValue === undefined;
        case 'is_not_null':
          return fieldValue !== null && fieldValue !== undefined;
        case 'is_in':
          return Array.isArray(filter.value) && filter.value.includes(fieldValue);
        case 'is_not_in':
          return Array.isArray(filter.value) && !filter.value.includes(fieldValue);
        case 'begin_with':
          return fieldValue?.toString().startsWith(filter.value);
        case 'does_not_begin_with':
          return !fieldValue?.toString().startsWith(filter.value);
        case 'ends_with':
          return fieldValue?.toString().endsWith(filter.value);
        case 'does_not_end_with':
          return !fieldValue?.toString().endsWith(filter.value);
        default:
          return true;
      }
    };

    const result = applyFilters();
    // setData(result);
    setFilteredData(result);
    setDialogVisible(false); // Close dialog after applying
  };

  const removeFilter = (index: any) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
  };

  const resetFilters = () => {
    setFilters([]);
    setStatusFilter('all');
    setDateFilter('all');
    fetchData(token);
  };

  const getConditionOptions = (column: any) => {
    if (['contact_status', 'contact_created'].includes(column)) {
      return [{ label: 'contains', value: 'contains' }];
    }
    if (['sn'].includes(column)) {
      return [
        { label: 'equals', value: 'equals' },
        { label: 'not equal', value: 'not_equal' },
        { label: 'less', value: 'less_than' },
        { label: 'less or equal', value: 'less_or_equal' },
        { label: 'greater', value: 'greater_than' },
        { label: 'greater or equal', value: 'greater_or_equal' },
        { label: 'is null', value: 'is_null' },
        { label: 'is not null', value: 'is_not_null' },
        { label: 'is in', value: 'is_in' },
        { label: 'is not in', value: 'is_not_in' },
      ];
    }
    if (['fullname', 'actions', 'contact_price'].includes(column)) {
      return [
        { label: 'equals', value: 'equals' },
        { label: 'not equal', value: 'not_equal' },
        { label: 'begin with', value: 'begin_with' },
        { label: 'does not begin with', value: 'does_not_begin_with' },
        { label: 'ends with', value: 'ends_with' },
        { label: 'does not end with', value: 'does_not_end_with' },
        { label: 'contains', value: 'contains' },
        { label: 'does not contain', value: 'does_not_contain' },
        { label: 'is null', value: 'is_null' },
        { label: 'is not null', value: 'is_not_null' },
        { label: 'is in', value: 'is_in' },
        { label: 'is not in', value: 'is_not_in' },
      ];
    }
    return [
      { label: 'Equals', value: 'equals' },
      { label: 'Contains', value: 'contains' },
      { label: 'Greater Than', value: 'greater than' },
      { label: 'Less Than', value: 'less than' },
    ];
  };

  const getValueInput = (filter: any, index: any) => {
    if (filter.column === 'contact_status') {
      // const statusOptions = ['All', 'Open', 'Closed'];
      return (
        <Dropdown
          value={filter.value}
          options={[
            { label: "All", value: "all" },
            { label: "Open", value: "open" },
            { label: "Closed", value: "closed" },
          ]}
          onChange={(e) => updateFilter(index, 'value', e.value)}
          placeholder="Select Status"
          style={{ flexBasis: '30%', flexGrow: 0 }}
        />
      );
    } else if (filter.column === 'contact_created') {
      const dateOptions = ['All', 'This Month', 'This Year'];
      return (
        <Dropdown
          value={filter.value}
          options={[
            { label: "All", value: "all" },
            { label: "This month", value: "thisMonth" },
            { label: "This Year", value: "thisYear" },
          ]}
          onChange={(e) => updateFilter(index, 'value', e.value)}
          placeholder="Select Date Range"
          style={{ flexBasis: '30%', flexGrow: 0 }}
        />
      );
    } else {
      return (
        <input
          type="text"
          onChange={(e) => updateFilter(index, 'value', e.target.value)}
          style={{ flexBasis: '30%', flexGrow: 0 }}
          placeholder="Enter value"
          value={filter.value}
        />
      );
    }
  };

  const handleStatusUpdate = async (rowData: any, newStatus: number) => {
    try {
      const payload = { id: rowData.contact_id, status: newStatus };

      const response = await axios.post(apiEndpoints.askQuestionStatus, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.current?.show({
          severity: newStatus === 1 ? "success" : "error",
          detail: "Status updated successfully!",
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

  const handleSendMessage = async (rowData: any) => {
    try {
      const payload = {
        contactId: selectedQueryRows,
        msg: inpuChatValue,
        amount: inputAmount,
        type: inputAmount ? "amount" : rowData.userId,
      };

      const response = await axios.post(
        apiEndpoints.saveCodeMessage,
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

  const columnMapping = [
    {
      field: "sn",
      header: "S. No.",
    },
    {
      field: "fullname",
      header: "Full Name",
    },
    {
      field: "contact_price",
      header: "Amount",
    },
    {
      field: "contact_status",
      header: "Status"
    },
    {
      field: "contact_created",
      header: "Date",
    },
    {
      field: "actions",
      header: "Actions",
    }

  ];

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
            background: rowData.contact_status === 1 ? "#82AF6F" : "#F89406",
            color: "#FFF",
            border: "none",
            height: "20px",
          }}
          onClick={() => {
            const action = rowData.contact_status === 1 ? "close" : "open";
            // if (window.confirm(`Are you sure you want to ${action} this query?`)) {
            //   handleStatusUpdate(rowData, rowData.contact_status === 1 ? 2 : 1);
            // }
            confirmDialog({
              message: `Are you sure you want to ${action} this query?`,
              header: "Confirmation",
              icon: "pi pi-info-circle",
              defaultFocus: "reject",
              acceptClassName: "p-button-danger",

              accept: async () => {
                await handleStatusUpdate(rowData, rowData.contact_status === 1 ? 2 : 1);
              }
            })
          }

            // handleStatusUpdate(rowData, rowData.contact_status === 1 ? 2 : 1)
          }
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
            onClick={() => handleEmailQuery(rowData)}
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
          <span className="chat-header-text">{data?.question_type === 1 ? 'Code by Address' : 'Ask Expert'}</span>
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
            onClick={(e) => setShowAmountField((prev: any) => !prev)}
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
            onClick={() => handleSendMessage(data)}
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
        <h1 className="queries-heading">
          Code Queries
          <small> <i className="ace-icon fa fa-angle-double-right"></i> List </small>
          <div className="right-tags" style={{ float: "right", fontSize: "14px" }}>
            <Link href="/admin/view_search_data" style={{ margin: 'auto', color: '#307ecc' }}>
              View Data
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/admin/map_view" style={{ margin: 'auto', color: '#307ecc' }}>
              View Data On Map
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a
              href="#"
              style={{ margin: 'auto', color: '#307ecc' }}
              onClick={handleExportData}
            >
              Export Data
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
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
      {filteredData.length ? (
        <div className="ask-expert-table">
          <CustomTable
            data={filteredData}
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
          {/* <CircularProgress size="3rem" /> */} <p>Data Not Found</p>
        </div>
      )}
      <Toast ref={toast} />
      <ConfirmDialog />

      <Button icon="pi pi-search" className="p-button-text" onClick={() => setDialogVisible(true)} />
      <Dialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        header="Search..."
        style={{ width: '55vw' }}
        footer={
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px",
            borderTop: "1px solid #D6E1EA",
            marginTop: "5px",
            width: "100%",
            backgroundColor: "#EFF3F8"
          }}
          >
            <Button label="Reset" icon="pi pi-refresh" style={{ backgroundColor: "#6FB3E0", borderColor: "#6FB3E0", color: "#FFF" }} onClick={resetFilters} className="p-button-text" />
            {/* <Button label="Cancel" icon="pi pi-times" onClick={() => setDialogVisible(false)} className="p-button-text" /> */}
            <Button label="Find" icon="pi pi-search" style={{ backgroundColor: "#9585BF", borderColor: "#9585BF" }} onClick={handleApply} />
          </div>
        }
      >

        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>

          <Dropdown
            value={applyMode}
            options={[
              { label: "All", value: "AND" },
              { label: "Any", value: "OR" },
            ]}
            onChange={handleApplyMode}
            placeholder="Filter"
            style={{ width: "7rem" }}
          />
          <Button icon="pi pi-plus" onClick={handleAddFilter} style={{ backgroundColor: "#428BCA", borderColor: "#428BCA", marginLeft: "0.5rem" }} />
          {/* <label style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              value="AND"
              checked={applyMode === 'AND'}
              onChange={() => setApplyMode('AND')}
              style={{ marginRight: '0.5rem' }}
            />
            Apply All
          </label>
          <label>
            <input
              type="radio"
              value="OR"
              checked={applyMode === 'OR'}
              onChange={() => setApplyMode('OR')}
              style={{ marginRight: '0.5rem' }}
            />
            Apply Any
          </label> */}
        </div>
        <div className="filter-dialog">
          {filters.map((filter, index) => (
            <div key={index} className="filter-row" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <Dropdown
                value={filter.column}
                onChange={(e) => updateFilter(index, 'column', e.value)}
                options={columnMapping.map((item: any) => ({
                  label: item.header, // Replace `header` with the appropriate label property
                  value: item.field,  // Replace `field` with the appropriate value property
                }))}
                placeholder="Select Column"
                style={{ flexBasis: '30%', flexGrow: 0 }}
              />
              {/* <select
                onChange={(e) => updateFilter(index, 'column', e.target.value)}
                style={{ flex: 1 }}
                value={filter.column}
              >
                <option value="">Select Column</option>
                {columns.flatMap((item: any) => item.field).map((col: any) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select> */}
              {/* <select
                  onChange={(e) => updateFilter(index, 'condition', e.target.value)}
                  style={{ flex: 1 }}
                  value={filter.condition}
                >
                  <option value="">Select Condition</option>
                  <option value="equals">Equals</option>
                  <option value="contains">Contains</option>
                  <option value="greater than">Greater Than</option>
                  <option value="less than">Less Than</option>
                </select>
                <input
                  type="text"
                  onChange={(e) => updateFilter(index, 'value', e.target.value)}
                  style={{ flex: 2 }}
                  placeholder="Enter value"
                  value={filter.value}
                /> */}
              <Dropdown
                value={filter.condition}
                options={getConditionOptions(filter.column)}
                onChange={(e) => updateFilter(index, 'condition', e.value)}
                placeholder="Select Condition"
                style={{ flexBasis: '30%', flexGrow: 0 }}
              />
              {getValueInput(filter, index)}
              <Button
                icon="pi pi-times"
                className="p-button-text p-button-danger"
                onClick={() => removeFilter(index)}
                style={{ flexBasis: '10%', flexGrow: 0 }}
              />
            </div>
          ))}
        </div>
      </Dialog>
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