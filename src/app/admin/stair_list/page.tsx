// "use client";
// import axios from "axios";
// // import { DataTable } from 'react-basic-datatable';
// import FilteredTable from "@/component/Filtering/Filtering";
// import LinkButton from "@/component/LinkButton";
// import LinkText from "@/component/LinkText";
// import ModalComponent from "@/component/Modals/ModalComponent";
// import { useState, useEffect } from "react";
// import Actions from "@/component/Actions";
// import Link from "next/link";
// import apiEndpoints from "../../../../config/apiEndpoints";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store/index";
// import { CircularProgress } from "@mui/material";

// export default function stairList() {
//   const [refresh, setRefresh] = useState<any>(false);
//   interface Stair {
//     sn: string;
//     title: string;
//     information: string;
//     link: string;
//     delete_status: string;
//     actions: string;
//   }

//   const token = useSelector((state: RootState) => state.auth.token);
//   const [data, setData]: [any, Function] = useState([]);

//   // const columns = [
//   //     { label: "S.N", field: "sn" },
//   //     { label: "Title", field: "title" },
//   //     { label: "Data", field: "information"},
//   //     { label: "Link", field: ""},
//   //     { label: "Status", field: "delete_status" }
//   // ];

//   const columns = [
//     {
//       name: "S.N",
//       selector: (row: Stair) => row.sn,
//       sortable: true,
//       width: "100px",
//     },
//     {
//       name: "Title",
//       selector: (row: Stair) => row.title,
//       sortable: true,
//       width: "200px",
//     },
//     {
//       name: "Data",
//       selector: (row: Stair) => row.information,
//       sortable: true,
//       width: "400px",
//       wrap: true,
//     },
//     {
//       name: "Link",
//       selector: (row: Stair) => row.link,
//       sortable: true,
//       width: "200px",
//     },
//     {
//       name: "Status",
//       selector: (row: Stair) => row.delete_status,
//       sortable: true,
//       width: "100px",
//     },
//     {
//       name: "Actions",
//       selector: (row: Stair) => row.actions,
//       sortable: true,
//       width: "200px",
//     },
//   ];

//   const fields = [
//     { name: "title", label: "Title" },
//     { name: "information", label: "Details" },
//   ];

//   // const showingLength = [10, 50, 100];

//   useEffect(() => {
//     if (token) {
//       fetchData(token);
//     }
//   }, [refresh, token]);

//   async function fetchData(token: any) {
//     const result = await axios.get(apiEndpoints.getStairData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setData(result.data.data);
//   }

//   let rows = data.map((obj: any, index: any) => {
//     let templateObj = {
//       sn: `${++index}`,
//       title: obj.title ?? "",
//       information: obj.information ?? "",
//       link: <LinkText label={"code"} />,
//       delete_status:
//         obj.delete_status == 2 ? (
//           <LinkButton label={"Inactive"} />
//         ) : (
//           <LinkButton label={"Active"} />
//         ),
//       actions: (
//         <Actions
//           setRefresh={setRefresh}
//           refresh={refresh}
//           id={obj.id}
//           initialData={{
//             title: obj.title,
//             information: obj.information,
//           }}
//           updateUrl={apiEndpoints.updateStairData}
//           deleteUrl={apiEndpoints.deleteStairData}
//           token={token}
//         />
//       ),
//     };
//     return templateObj;
//   });

//   return (
//     <>
//       <section className="content-header">
//         <div className="container-fluid">
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <h1>Stair List</h1>
//             </div>
//             <div className="col-sm-6">
//               <ol className="breadcrumb float-sm-right">
//                 <li className="breadcrumb-item">
//                   <Link href="dashboard">Home</Link>
//                 </li>
//                 <li className="breadcrumb-item active">Stairs</li>
//               </ol>
//             </div>
//           </div>
//           <div className="row mb-2">
//             <div className="col-sm-6 float-sm-left">
//               <ModalComponent
//                 fields={fields}
//                 apiUrl={apiEndpoints.addStairData}
//                 token={token}
//                 title="Add Stair Information"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//       {console.log(rows)}
//       {rows.length ? (
//         <FilteredTable columns={columns} data={rows} />
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
//     </>
//   );
// }

"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import apiEndpoints from "../../../../config/apiEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTable from "../../../component/Custom_Table/CustomTable";
import { Button } from "primereact/button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdDone } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { IoHome } from "react-icons/io5";

export default function StairList({}) {
  const [refresh, setRefresh] = useState<any>(false);
  interface RowData {
    [key: string]: any;
  }

  interface ColumnOptions {
    rowIndex: number;
  }
  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [inputTitle, setInputTitle] = useState<string | null>(null);
  const [inputInformation, setInputInformation] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [linkRowId, setLinkRowId] = useState<string | null>(null);
  const [open, setOpen] = useState<any>(false);
  const toast = useRef<Toast>(null);

  console.log("stairCodeDataById", data);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    width: "50%",
    gap: "16px",
    border: "1px solid #000",
  };

  const boxStyle = {
    marginBottom: "20px",
    marginTop: "20px",
    backgroundColor: "#F5F5F5",
    borderTop: "1px solid #E5E5E5",
    padding: "19px 20px 20px"
  }

  const headerStyle = {
    fontWeight: 400,
    fontSize: "14px",
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [refresh, token]);

  async function fetchData(token: any) {
    try {
      const { data } = await axios.get(apiEndpoints.getStairData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const columns = [
    {
      field: "sn",
      header: "S.N",
      body: (_: RowData, { rowIndex }: ColumnOptions) => rowIndex + 1,
    },
    { field: "title", header: "Title", sortable:true },
    { field: "information", header: "Data", sortable:true },
    {
      field: "id",
      header: "Link",
      body: (rowData: any) => (
        <>
          {rowData.id && (
            <Link href={`/admin/stair_list/link_list/${rowData.id} `}>
              <p>Code</p>
            </Link>
          )}
        </>
      ),
    },
    {
      field: "Status",
      header: "Status",
      sortable:true,
      body: (rowData: any) => (
        <Button
          label={rowData.status === true ? "Active" : "Inactive"}
          style={{
            background: rowData.status === true ? "green" : "red",
            color: "#FFF",
            border: "none",
            height: "20px",
          }}
          onClick={() =>{
            const action = rowData.status === true ? "deactivate" : "activate";
            if (window.confirm(`Are you sure you want to ${action} ?`)) {
              handleStatusUpdate(rowData, rowData.status === true ? 2 : 1);
            }
          }
            // handleStatusUpdate(rowData, rowData.status === true ? 2 : 1)
          }
        />
      ),
    },
    {
      field: "actions",
      header: "Actions",
      body: (rowData: any) => (
        <div className="" style={{ width: "120px" }}>
          <Button
            icon="pi pi-pencil"
            onClick={() => handleEdit(rowData)}
            style={{
              background: "none",
              color: "#69AA46",
              border: "none",
            }}
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            onClick={() => handleDelete(rowData)}
            style={{ background: "none", color: "#c62828", border: "none" }}
          />
        </div>
      ),
    },
  ];

  ///crud------------

  const handleValidationForm = () => {
    if (!inputTitle) {
      setFormError("Required.");
      return false;
    }
    if (!inputInformation) {
      setFormError("Required.");
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!handleValidationForm()) {
      return;
    }
    try {
      const payload = {
        id: linkRowId,
        title: inputTitle,
        information: inputInformation,
        linkType: 0,
      };
      let apiUrl = linkRowId
        ? apiEndpoints.updateStairData
        : apiEndpoints.addStairData;

      let method = linkRowId ? axios.put : axios.post;
      const result = await method(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.current?.show({
        severity: "success",
        detail: linkRowId
          ? "Row Updated successfully!"
          : "Row added successfully!",
        life: 3000,
      });
      handleClose();
      fetchData(token);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  // Handle Edit Data
  const handleEdit = (rowData: any) => {
    setInputTitle(rowData.title);
    setInputInformation(rowData.information);
    setLinkRowId(rowData.id);
    setOpen(true);
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
            apiEndpoints.deleteStairData,
            { id: rowData.id },
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

  const handleStatusUpdate = async (rowData: any, newStatus: number) => {
    try {
      const payload = { id: rowData.id, status: newStatus };

      const response = await axios.post(
        apiEndpoints.stairDataStatusUpdate,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.current?.show({
          severity: newStatus === 1 ? "success" : "error",
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
        detail: "Failed to update status.",
        life: 3000,
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleOpen = () => {
    setOpen(true);
    setLinkRowId(null);
  };

  // Reset form fields
  const resetForm = () => {
    setInputTitle(null);
    setInputInformation(null);
    setFormError(null);
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
              <li className="breadcrumb-item active">Stairs List</li>
            </ol>
          </div>
        </div>
      </section>
      {data.length ? (
        <div>
          <CustomTable
            data={data}
            columns={columns}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            onAdd={handleOpen}
            showExportButton={false}
            showDeleteButton={false}
            showImportButton={false}
            showExpandButton={false}
            headerText="Stair List"
            setImageHeaderText="Set On Image" onDelete={undefined} rowExpansionTemplate={undefined} exportToCSV={undefined} selectionMode={undefined}          />
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
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div id="modal-modal-title" className="modal_header">
              <div>{linkRowId ? "Update Stair Information" : "Add Stair Information"}</div>
              <div
                style={{ fontWeight: 600, cursor: "pointer", fontSize: "18px" }}
                onClick={handleClose}
              >
                X
              </div>
            </div>

            <Box>
              <Box display="flex" alignItems="center" gap="12px" ml={2}>
                <Box flex={1}>
                  <label style={headerStyle}>Title</label>
                </Box>
                <Box flex={3}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={inputTitle || ""}
                    onChange={(e) => setInputTitle(e.target.value)}
                    style={{ width: "80%" }}
                  />
                  {!inputTitle && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap="12px" mt={2} ml={2}>
                <Box flex={1}>
                  <label style={headerStyle}>Information</label>
                </Box>
                <Box flex={3}>
                  <textarea
                    className="form-control"
                    placeholder="Information"
                    value={inputInformation || ""}
                    onChange={(e) => setInputInformation(e.target.value)}
                    style={{
                      width: "80%",
                      height: "80px",
                      overflowY: "auto",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  />
                  {!inputInformation && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={boxStyle}>
                <Box ml={8}>
                  <button
                    type="button"
                    className="modal_submit_btn"
                    onClick={handleSubmit}
                  >
                    <MdDone size={20} /> {linkRowId ? "Update" : "Submit"}
                  </button>
                  {!linkRowId && (<button
                    type="button"
                    className="modal_submit_btn"
                    style={{
                      backgroundColor: "#8B9AA3",
                    }}
                    onClick={resetForm}
                  >
                    <VscDebugRestart size={20} /> Reset
                  </button>)}
                </Box>
              </Box>
            </Box>

            {/* Close Button */}
            <div style={{
              paddingTop: "12px",
              paddingBottom: "14px",
              backgroundColor: "#EFF3F8", 
              borderTopColor: "#E4E9EE", 
              padding: "15px",
              borderTop: "1px solid #e5e5e5"
            }}>
              <button
                type="button"
                className="modal_close_btn"
                onClick={handleClose}
              >
                <span>X</span> Close
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      <Toast ref={toast} />
      <ConfirmDialog />
    </>
  );
}
