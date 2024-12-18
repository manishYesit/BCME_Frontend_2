// // // // // "use client";
// // // // // import { useState, useEffect } from "react";
// // // // // import CustomeTable from "../../../component/Custom_Table/CustomTable";
// // // // // import "../../../../public/dist/css/style.css";
// // // // // import apiEndpoints from "../../../../config/apiEndpoints";
// // // // // import axios from "axios";
// // // // // import { useSelector } from "react-redux";
// // // // // import { RootState } from "../../../store/index";

// // // // // export default function UserManagement() {
// // // // //   const token = useSelector((state: RootState) => state.auth.token);
// // // // //   const [refresh, setRefresh] = useState<any>(null);
// // // // //   const [isCollapsed, setIsCollapsed] = useState<any>(false);
// // // // //   const [data, setData]: [any, Function] = useState([]);
// // // // //   const [error, setError] = useState<any>(null);
// // // // //   const [pageIndex, setPageIndex] = useState<any>(0);
// // // // //   const [pageSize, setPageSize] = useState<any>(5);

// // // // //   console.log("checkdataaa", data);

// // // // //   const dummyData = [
// // // // //     {
// // // // //       sno: 1,
// // // // //       name: "John Doe",
// // // // //       amount: "$1000",
// // // // //       status: "Active",
// // // // //       date: "2023-12-01",
// // // // //     },
// // // // //     {
// // // // //       sno: 2,
// // // // //       name: "Jane Smith",
// // // // //       amount: "$2000",
// // // // //       status: "Inactive",
// // // // //       date: "2023-11-15",
// // // // //     },
// // // // //     {
// // // // //       sno: 3,
// // // // //       name: "David Johnson",
// // // // //       amount: "$1500",
// // // // //       status: "Active",
// // // // //       date: "2023-10-10",
// // // // //     },
// // // // //     {
// // // // //       sno: 4,
// // // // //       name: "Emma Brown",
// // // // //       amount: "$1200",
// // // // //       status: "Inactive",
// // // // //       date: "2023-09-21",
// // // // //     },
// // // // //     {
// // // // //       sno: 5,
// // // // //       name: "Michael Green",
// // // // //       amount: "$1800",
// // // // //       status: "Active",
// // // // //       date: "2023-08-17",
// // // // //     },
// // // // //     {
// // // // //       sno: 6,
// // // // //       name: "Sophia White",
// // // // //       amount: "$1100",
// // // // //       status: "Active",
// // // // //       date: "2023-07-29",
// // // // //     },
// // // // //     {
// // // // //       sno: 7,
// // // // //       name: "William Black",
// // // // //       amount: "$1300",
// // // // //       status: "Inactive",
// // // // //       date: "2023-06-05",
// // // // //     },
// // // // //     {
// // // // //       sno: 8,
// // // // //       name: "Olivia Harris",
// // // // //       amount: "$1600",
// // // // //       status: "Active",
// // // // //       date: "2023-05-22",
// // // // //     },
// // // // //     {
// // // // //       sno: 9,
// // // // //       name: "Liam Clark",
// // // // //       amount: "$1400",
// // // // //       status: "Inactive",
// // // // //       date: "2023-04-15",
// // // // //     },
// // // // //     {
// // // // //       sno: 10,
// // // // //       name: "Ava Lewis",
// // // // //       amount: "$1700",
// // // // //       status: "Active",
// // // // //       date: "2023-03-30",
// // // // //     },
// // // // //   ];

// // // // //   useEffect(() => {
// // // // //     if (token) {
// // // // //       fetchData(token);
// // // // //     }
// // // // //   }, [refresh, token, pageIndex, pageSize]);

// // // // //   async function fetchData(token: any) {
// // // // //     try {
// // // // //       const result = await axios.get(apiEndpoints.getAskCodeData, {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //       });
// // // // //       setData(result.data.data);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching data:", error);

// // // // //       setError("Failed to fetch FAQ data. Please try again later.");
// // // // //     }
// // // // //   }

// // // // //   const columns1 = [
// // // // //     {
// // // // //       Headers: "ex",
// // // // //       id: "ex",
// // // // //       Cell: ({ row }) => (
// // // // //         <div className="d-flex justify-content-between">
// // // // //           <div>
// // // // //             <button
// // // // //               onClick={() => row.toggleRowExpanded()}
// // // // //               style={{
// // // // //                 border: "none",
// // // // //                 background: "transparent",
// // // // //                 cursor: "pointer",
// // // // //                 color: "#007bff",
// // // // //               }}
// // // // //             >
// // // // //               {row.isExpanded ? "-" : "+"}
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       ),
// // // // //     },
// // // // //     {
// // // // //       Header: "S.No.",
// // // // //       accessor: "sno",
// // // // //       sortType: "basic",
// // // // //     },
// // // // //     {
// // // // //       Header: "Full Name",
// // // // //       accessor: "name",
// // // // //     },
// // // // //     {
// // // // //       Header: "Amount",
// // // // //       accessor: "amount",
// // // // //     },
// // // // //     {
// // // // //       Header: "Status",
// // // // //       accessor: "status",
// // // // //     },
// // // // //     {
// // // // //       Header: "Date",
// // // // //       accessor: "date",
// // // // //     },
// // // // //     {
// // // // //       Header: "Action",
// // // // //       id: "action",
// // // // //       Cell: ({ row }) => (
// // // // //         <div className="d-flex justify-content-between">
// // // // //           <div>
// // // // //             <button
// // // // //               className="btn btn-primary btn-sm"
// // // // //               onClick={() => handleEdit(row.original)}
// // // // //             >
// // // // //               Edit
// // // // //             </button>
// // // // //             <button
// // // // //               className="btn btn-danger btn-sm ms-2"
// // // // //               onClick={() => handleDelete(row.original)}
// // // // //             >
// // // // //               Delete
// // // // //             </button>
// // // // //             <span style={{ margin: "4px" }}>
// // // // //               <input type="checkbox" {...row.getToggleRowSelectedProps()} />
// // // // //             </span>
// // // // //           </div>
// // // // //         </div>
// // // // //       ),
// // // // //     },
// // // // //   ];

// // // // //   const handleDelete = (selectedIds: string[]) => {
// // // // //     console.log("Deleting items with ids:", selectedIds);
// // // // //   };

// // // // //   const handleEdit = (selectedIds: string[]) => {
// // // // //     console.log("Editing items with ids:", selectedIds);
// // // // //   };

// // // // //   const toggleCollapse = () => {
// // // // //     setIsCollapsed(!isCollapsed);
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <div className="container mt-5">
// // // // //         <div className="">
// // // // //           <p>
// // // // //             <a
// // // // //               className="btn btn-primary table-collapse"
// // // // //               role="button"
// // // // //               aria-expanded={!isCollapsed}
// // // // //               aria-controls="collapseExample"
// // // // //               onClick={toggleCollapse}
// // // // //             >
// // // // //               open
// // // // //             </a>
// // // // //           </p>
// // // // //           <div
// // // // //             className={`collapse ${!isCollapsed ? "show" : ""}`}
// // // // //             id="collapseExample"
// // // // //           >
// // // // //             <CustomeTable
// // // // //               columns={columns1}
// // // // //               data={dummyData}
// // // // //               onDelete={handleDelete}
// // // // //               onEdit={handleEdit}
// // // // //               pageIndex={pageIndex}
// // // // //               pageSize={pageSize}
// // // // //               setPageIndex={setPageIndex}
// // // // //               setPageSize={setPageSize}
// // // // //             />
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* <hr /> */}
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // }

// // // // "use client";
// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import { ProductService } from "./service/ProductService";
// // // // import { Button } from "primereact/button";
// // // // import CustomTable from "../../../component/Custom_Table/CustomTable";

// // // // export default function Products() {
// // // //   const [data, setData] = useState<any>([]);

// // // //   const [globalFilter, setGlobalFilter] = useState<any>(null);

// // // //   useEffect(() => {
// // // //     const dummyData = [
// // // //       {
// // // //         sno: 1,
// // // //         name: "John Doe",
// // // //         amount: "$1000",
// // // //         status: "Active",
// // // //         date: "2023-12-01",
// // // //       },
// // // //       {
// // // //         sno: 2,
// // // //         name: "Jane Smith",
// // // //         amount: "$2000",
// // // //         status: "Inactive",
// // // //         date: "2023-11-15",
// // // //       },
// // // //       {
// // // //         sno: 3,
// // // //         name: "David Johnson",
// // // //         amount: "$1500",
// // // //         status: "Active",
// // // //         date: "2023-10-10",
// // // //       },
// // // //       {
// // // //         sno: 4,
// // // //         name: "Emma Brown",
// // // //         amount: "$1200",
// // // //         status: "Inactive",
// // // //         date: "2023-09-21",
// // // //       },
// // // //       {
// // // //         sno: 5,
// // // //         name: "Michael Green",
// // // //         amount: "$1800",
// // // //         status: "Active",
// // // //         date: "2023-08-17",
// // // //       },
// // // //       {
// // // //         sno: 6,
// // // //         name: "Sophia White",
// // // //         amount: "$1100",
// // // //         status: "Active",
// // // //         date: "2023-07-29",
// // // //       },
// // // //       {
// // // //         sno: 7,
// // // //         name: "William Black",
// // // //         amount: "$1300",
// // // //         status: "Inactive",
// // // //         date: "2023-06-05",
// // // //       },
// // // //       {
// // // //         sno: 8,
// // // //         name: "Olivia Harris",
// // // //         amount: "$1600",
// // // //         status: "Active",
// // // //         date: "2023-05-22",
// // // //       },
// // // //       {
// // // //         sno: 9,
// // // //         name: "Liam Clark",
// // // //         amount: "$1400",
// // // //         status: "Inactive",
// // // //         date: "2023-04-15",
// // // //       },
// // // //       {
// // // //         sno: 10,
// // // //         name: "Ava Lewis",
// // // //         amount: "$1700",
// // // //         status: "Active",
// // // //         date: "2023-03-30",
// // // //       },
// // // //     ];

// // // //     setData(dummyData);

// // // //     // ProductService.getProducts().then((data) => data(data));
// // // //   }, []);

// // // //   // const formatCurrency = (value) => {
// // // //   //   return value.toLocaleString("en-US", {
// // // //   //     style: "currency",
// // // //   //     currency: "USD",
// // // //   //   });
// // // //   // };

// // // //   const handleAdd = () => {
// // // //     console.log("Add data");
// // // //   };

// // // //   const handleEdit = (data) => {
// // // //     console.log("Edit data", data);
// // // //   };

// // // //   const handleDelete = (productsToDelete) => {
// // // //     console.log("Delete data", productsToDelete);
// // // //   };

// // // //   const handleExport = () => {
// // // //     console.log("Export CSV");
// // // //   };

// // // //   const columns = [
// // // //     { field: "name", header: "Name" },
// // // //     { field: "category", header: "Category" },
// // // //     {
// // // //       field: "price",
// // // //       header: "Price",
// // // //       // body: (rowData) => formatCurrency(rowData.price),
// // // //     },
// // // //     { field: "rating", header: "Reviews" },
// // // //     { field: "inventoryStatus", header: "Status" },
// // // //     {
// // // //       field: "actions",
// // // //       header: "Actions",
// // // //       body: (rowData) => (
// // // //         <React.Fragment>
// // // //           <Button icon="pi pi-pencil" onClick={() => handleEdit(rowData)} />
// // // //           <Button
// // // //             icon="pi pi-trash"
// // // //             severity="danger"
// // // //             onClick={() => handleDelete([rowData])}
// // // //           />
// // // //         </React.Fragment>
// // // //       ),
// // // //     },
// // // //   ];

// // // //   return (
// // // //     <div>
// // // //       <CustomTable
// // // //         data={data}
// // // //         columns={columns}
// // // //         onAdd={handleAdd}
// // // //         onEdit={handleEdit}
// // // //         onDelete={handleDelete}
// // // //         onExport={handleExport}
// // // //         globalFilter={globalFilter}
// // // //         setGlobalFilter={setGlobalFilter}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";
// // // import React, { useState, useEffect } from "react";
// // // import { Button } from "primereact/button";
// // // import CustomTable from "../../../component/Custom_Table/CustomTable";

// // // export default function Products() {
// // //   const [data, setData] = useState([]);
// // //   const [globalFilter, setGlobalFilter] = useState(null);
// // //   const [selectedRows, setSelectedRows] = useState([]); // State for selected rows

// // //   useEffect(() => {
// // //     const dummyData = [
// // //       {
// // //         sno: 1,
// // //         name: "John Doe",
// // //         amount: "$1000",
// // //         status: "Active",
// // //         date: "2023-12-01",
// // //       },
// // //       {
// // //         sno: 2,
// // //         name: "Jane Smith",
// // //         amount: "$2000",
// // //         status: "Inactive",
// // //         date: "2023-11-15",
// // //       },
// // //       {
// // //         sno: 3,
// // //         name: "David Johnson",
// // //         amount: "$1500",
// // //         status: "Active",
// // //         date: "2023-10-10",
// // //       },
// // //       {
// // //         sno: 4,
// // //         name: "Emma Brown",
// // //         amount: "$1200",
// // //         status: "Inactive",
// // //         date: "2023-09-21",
// // //       },
// // //       {
// // //         sno: 5,
// // //         name: "Michael Green",
// // //         amount: "$1800",
// // //         status: "Active",
// // //         date: "2023-08-17",
// // //       },
// // //       {
// // //         sno: 6,
// // //         name: "Sophia White",
// // //         amount: "$1100",
// // //         status: "Active",
// // //         date: "2023-07-29",
// // //       },
// // //       {
// // //         sno: 7,
// // //         name: "William Black",
// // //         amount: "$1300",
// // //         status: "Inactive",
// // //         date: "2023-06-05",
// // //       },
// // //       {
// // //         sno: 8,
// // //         name: "Olivia Harris",
// // //         amount: "$1600",
// // //         status: "Active",
// // //         date: "2023-05-22",
// // //       },
// // //       {
// // //         sno: 9,
// // //         name: "Liam Clark",
// // //         amount: "$1400",
// // //         status: "Inactive",
// // //         date: "2023-04-15",
// // //       },
// // //       {
// // //         sno: 10,
// // //         name: "Ava Lewis",
// // //         amount: "$1700",
// // //         status: "Active",
// // //         date: "2023-03-30",
// // //       },
// // //     ];

// // //     setData(dummyData);
// // //   }, []);

// // //   const handleAdd = () => {
// // //     console.log("Add data");
// // //   };

// // //   const handleEdit = (data) => {
// // //     console.log("Edit data", data);
// // //   };

// // //   const handleDelete = (selectedRows) => {
// // //     console.log("Delete data", selectedRows);
// // //   };

// // //   const handleExport = () => {
// // //     console.log("Export CSV");
// // //   };

// // //   const columns = [
// // //     { field: "name", header: "Name" },
// // //     { field: "amount", header: "Amount" },
// // //     { field: "status", header: "Status" },
// // //     {
// // //       field: "actions",
// // //       header: "Actions",
// // //       body: (rowData) => (
// // //         <>
// // //           <Button icon="pi pi-pencil" onClick={() => handleEdit(rowData)} />
// // //           <Button
// // //             icon="pi pi-trash"
// // //             severity="danger"
// // //             onClick={() => handleDelete([rowData])}
// // //           />
// // //         </>
// // //       ),
// // //     },
// // //   ];

// // //   return (
// // //     <div>
// // //       <CustomTable
// // //         data={data}
// // //         columns={columns}
// // //         onAdd={handleAdd}
// // //         onEdit={handleEdit}
// // //         onDelete={handleDelete}
// // //         onExport={handleExport}
// // //         globalFilter={globalFilter}
// // //         setGlobalFilter={setGlobalFilter}
// // //         selectedRows={selectedRows}
// // //         setSelectedRows={setSelectedRows}
// // //         selectionMode="multiple"
// // //       />
// // //     </div>
// // //   );
// // // }

// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { Button } from "primereact/button";
// // import CustomTable from "../../../component/Custom_Table/CustomTable";

// // export default function Products() {
// //   const [data, setData] = useState([]);
// //   const [globalFilter, setGlobalFilter] = useState(null);
// //   const [selectedRows, setSelectedRows] = useState([]); // State for selected rows
// //   const [selectionMode, setSelectionMode] = useState("multiple"); // "multiple" for multi-row select, "single" for single row select

// //   useEffect(() => {
// //     const dummyData = [
// //       {
// //         sno: 1,
// //         name: "John Doe",
// //         amount: "$1000",
// //         status: "Active",
// //         date: "2023-12-01",
// //       },
// //       {
// //         sno: 2,
// //         name: "Jane Smith",
// //         amount: "$2000",
// //         status: "Inactive",
// //         date: "2023-11-15",
// //       },
// //       {
// //         sno: 3,
// //         name: "David Johnson",
// //         amount: "$1500",
// //         status: "Active",
// //         date: "2023-10-10",
// //       },
// //       {
// //         sno: 4,
// //         name: "Emma Brown",
// //         amount: "$1200",
// //         status: "Inactive",
// //         date: "2023-09-21",
// //       },
// //       {
// //         sno: 5,
// //         name: "Michael Green",
// //         amount: "$1800",
// //         status: "Active",
// //         date: "2023-08-17",
// //       },
// //       {
// //         sno: 6,
// //         name: "Sophia White",
// //         amount: "$1100",
// //         status: "Active",
// //         date: "2023-07-29",
// //       },
// //       {
// //         sno: 7,
// //         name: "William Black",
// //         amount: "$1300",
// //         status: "Inactive",
// //         date: "2023-06-05",
// //       },
// //       {
// //         sno: 8,
// //         name: "Olivia Harris",
// //         amount: "$1600",
// //         status: "Active",
// //         date: "2023-05-22",
// //       },
// //       {
// //         sno: 9,
// //         name: "Liam Clark",
// //         amount: "$1400",
// //         status: "Inactive",
// //         date: "2023-04-15",
// //       },
// //       {
// //         sno: 10,
// //         name: "Ava Lewis",
// //         amount: "$1700",
// //         status: "Active",
// //         date: "2023-03-30",
// //       },
// //     ];

// //     setData(dummyData);
// //   }, []);

// //   const handleAdd = () => {
// //     console.log("Add data");
// //   };

// //   const handleEdit = (data) => {
// //     console.log("Edit data", data);
// //   };

// //   const handleDelete = (selectedRows) => {
// //     console.log("Delete data", selectedRows);
// //   };

// //   const handleExport = () => {
// //     console.log("Export CSV");
// //   };

// //   const columns = [
// //     { field: "name", header: "Name" },
// //     { field: "amount", header: "Amount" },
// //     { field: "status", header: "Status" },
// //     {
// //       field: "actions",
// //       header: "Actions",
// //       body: (rowData) => (
// //         <>
// //           <Button icon="pi pi-pencil" onClick={() => handleEdit(rowData)} />
// //           <Button
// //             icon="pi pi-trash"
// //             severity="danger"
// //             onClick={() => handleDelete([rowData])}
// //           />
// //         </>
// //       ),
// //     },
// //   ];

// //   return (
// //     <div>
// //       <CustomTable
// //         data={data}
// //         columns={columns}
// //         selectedRows={selectedRows}
// //         setSelectedRows={setSelectedRows}
// //         onAdd={handleAdd}
// //         onEdit={handleEdit}
// //         onDelete={handleDelete}
// //         onExport={handleExport}
// //         globalFilter={globalFilter}
// //         setGlobalFilter={setGlobalFilter}
// //         selectionMode={selectionMode} // Pass the selection mode here ("single" or "multiple")
// //       />
// //       <div className="p-mt-3">
// //         <Button
// //           label="Switch to Single Selection"
// //           icon="pi pi-check"
// //           onClick={() => setSelectionMode("single")}
// //           className="p-button-text"
// //         />
// //         <Button
// //           label="Switch to Multiple Selection"
// //           icon="pi pi-check"
// //           onClick={() => setSelectionMode("multiple")}
// //           className="p-button-text p-ml-2"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "primereact/button";
// import CustomTable from "../../../component/Custom_Table/CustomTable";

// export default function Products() {
//   const [data, setData] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState(null);
//   const [selectedRows, setSelectedRows] = useState([]);

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
//         name: "Sophia White",
//         amount: "$1100",
//         status: "Active",
//         date: "2023-07-29",
//       },
//       {
//         sno: 7,
//         name: "William Black",
//         amount: "$1300",
//         status: "Inactive",
//         date: "2023-06-05",
//       },
//       {
//         sno: 8,
//         name: "Olivia Harris",
//         amount: "$1600",
//         status: "Active",
//         date: "2023-05-22",
//       },
//       {
//         sno: 9,
//         name: "Liam Clark",
//         amount: "$1400",
//         status: "Inactive",
//         date: "2023-04-15",
//       },
//       {
//         sno: 10,
//         name: "Ava Lewis",
//         amount: "$1700",
//         status: "Active",
//         date: "2023-03-30",
//       },
//     ];

//     setData(dummyData);
//   }, []);

//   // Handle Add New Data
//   const handleAdd = () => {
//     // You can implement a modal or form to add new data
//     const newData = {
//       sno: data.length + 1,
//       name: "New User",
//       amount: "$1000",
//       status: "Active",
//       date: new Date().toISOString().split("T")[0],
//     };
//     setData([...data, newData]); // Update the data with the new entry
//   };

//   // Handle Edit Data
//   const handleEdit = (data) => {
//     console.log("Edit data", data);
//     // Implement logic to edit the data, probably via a form or modal
//   };

//   // Handle Delete Data
//   const handleDelete = (selectedRows) => {
//     const newData = data.filter(
//       (row) => !selectedRows.some((selected) => selected.sno === row.sno)
//     );
//     setData(newData); // Remove the selected rows from the data state
//     console.log("Delete data", selectedRows);
//   };

//   // Handle Export to CSV
//   const handleExport = () => {
//     console.log("Export CSV");
//     // Add logic to export the selected rows or all rows to CSV
//   };

//   const columns = [
//     { field: "name", header: "Name" },
//     { field: "amount", header: "Amount" },
//     { field: "status", header: "Status" },
//     {
//       field: "actions",
//       header: "Actions",
//       body: (rowData) => (
//         <>
//           <Button icon="pi pi-pencil" onClick={() => handleEdit(rowData)} />
//           <Button
//             icon="pi pi-trash"
//             severity="danger"
//             onClick={() => handleDelete([rowData])}
//           />
//         </>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <CustomTable
//         data={data}
//         columns={columns}
//         selectedRows={selectedRows}
//         setSelectedRows={setSelectedRows}
//         onAdd={handleAdd}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         onExport={handleExport}
//         globalFilter={globalFilter}
//         setGlobalFilter={setGlobalFilter}
//       />
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import CustomTable from "../../../component/Custom_Table/CustomTable";
import { unparse } from "json2csv"; // For CSV export
import * as XLSX from "xlsx"; // For Excel import

export default function AskAnExpert() {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        sno: 1,
        name: "John Doe",
        amount: "$1000",
        status: "Active",
        date: "2023-12-01",
      },
      {
        sno: 2,
        name: "Jane Smith",
        amount: "$2000",
        status: "Inactive",
        date: "2023-11-15",
      },
      {
        sno: 3,
        name: "David Johnson",
        amount: "$1500",
        status: "Active",
        date: "2023-10-10",
      },
      {
        sno: 4,
        name: "Emma Brown",
        amount: "$1200",
        status: "Inactive",
        date: "2023-09-21",
      },
      {
        sno: 5,
        name: "Michael Green",
        amount: "$1800",
        status: "Active",
        date: "2023-08-17",
      },
      {
        sno: 6,
        name: "Michael Green",
        amount: "$1800",
        status: "Active",
        date: "2023-08-17",
      },
      // ... More data
    ];
    setData(dummyData);
  }, []);

  // Handle Add New Data
  const handleAdd = () => {
    alert("Add button clicked");
    // You can implement your add functionality here
  };

  // Handle Edit Data
  const handleEdit = (data) => {
    console.log("Edit data", data);
    // Implement logic to edit the data
  };

  const handleDelete = (selectedRows) => {
    if (selectedRows.length > 0) {
      setData(data.filter((row) => !selectedRows.includes(row))); // Filter out selected rows from data
      alert("Deleted selected rows");
    } else {
      alert("No rows selected");
    }
  };

  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const columns = [
    { field: "name", header: "Name" },
    { field: "amount", header: "Amount" },
    { field: "status", header: "Status" },
    {
      field: "actions",
      header: "Actions",
      body: (rowData) => (
        <>
          <Button
            icon="pi pi-pencil"
            onClick={() => handleEdit(rowData)}
            style={{ background: "none", color: "#69AA46", border: "none" }}
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            onClick={() => handleDelete([rowData])}
            style={{ background: "none", color: "#c62828", border: "none" }}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <CustomTable
        data={data}
        columns={columns}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onAdd={handleAdd}
        onDelete={handleDelete}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        selectionMode="checkbox"
        // onImport={handleImport}
        expandedRows={expandedRows}
        setExpandedRows={setExpandedRows}
        showExportButton={true}
      />
    </div>
  );
}
