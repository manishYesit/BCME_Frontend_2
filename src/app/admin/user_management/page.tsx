// "use client";
// import axios from "axios";
// // import { DataTable } from 'react-basic-datatable';
// import FilteredTable from "@/component/Filtering/Filtering";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import AddUserModal from "@/component/Modals/AddUserModal";
// import LinkButton from "@/component/LinkButton";
// import Actions from "@/component/Actions";
// import apiEndpoints from "../../../../config/apiEndpoints";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store/index";
// import { CircularProgress } from "@mui/material";

// export default function UserManagement() {
//   const [refresh, setRefresh] = useState<any>(false);
//   interface User {
//     sn: string;
//     fullname: string;
//     email: string;
//     phone: string;
//     status_plrb: string;
//     email_subscribed: string;
//     delete_status: string;
//     actions: string;
//   }

//   const token = useSelector((state: RootState) => state.auth.token);
//   const [data, setData]: [any, Function] = useState([]);

//   // const columns = [
//   //     { label: "S.N", field: "sn" },
//   //     { label: "Full Name", field: "fullname" },
//   //     { label: "Email", field: "email" },
//   //     { label: "Phone", field: "phone" },
//   //     { label: "PLRB Member", field: "status_plrb" },
//   //     { label: "eMail Opt Out", field: "email_subscribed" },
//   //     { label: "Status", field: "delete_status" }
//   // ];

//   const columns = [
//     { name: "S.N", selector: (row: User) => row.sn, sortable: true },
//     {
//       name: "Full Name",
//       selector: (row: User) => row.fullname,
//       sortable: true,
//     },
//     { name: "Email", selector: (row: User) => row.email, sortable: true },
//     { name: "Phone", selector: (row: User) => row.phone, sortable: true },
//     {
//       name: "PLRB Member",
//       selector: (row: User) => row.status_plrb,
//       sortable: true,
//     },
//     {
//       name: "eMail Opt Out",
//       selector: (row: User) => row.email_subscribed,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row: User) => row.delete_status,
//       sortable: true,
//     },
//     { name: "Actions", selector: (row: User) => row.actions, width: "200px" },
//   ];

//   // const showingLength = [10, 50, 100];

//   const fields = [
//     { label: "Name", name: "fullname" },
//     { label: "Email", name: "email" },
//     { label: "Phone", name: "phone" },
//     { label: "Password", name: "password" },
//   ];

//   useEffect(() => {
//     if (token) {
//       fetchData(token);
//     }
//   }, [refresh, token]);

//   async function fetchData(token: any) {
//     const result = await axios.get(apiEndpoints.getAllUsers, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setData(result.data.data);
//   }

//   let rows = data.map((obj: any, index: any) => {
//     let templateObj = {
//       sn: `${++index}`,
//       fullname: obj.fullname ?? "",
//       email: `${obj.email}`,
//       phone: `${obj.phone}`,
//       status_plrb: `${obj.status_plrb}` ? "Yes" : "No",
//       email_subscribed: `${obj.email_subscribed}`
//         ? "Subscribed"
//         : "Unsubscribed",
//       delete_status:
//         obj.delete_status == 2 ? (
//           <LinkButton label={"Inactive"} />
//         ) : (
//           <LinkButton label={"Active"} />
//         ),
//       actions: (
//         <Actions
//           id={obj.id}
//           setRefresh={setRefresh}
//           refresh={refresh}
//           initialData={{
//             fullname: obj.fullname,
//             email: `${obj.email}`,
//             phone: `${obj.phone}`,
//             status_plrb: Boolean(obj.status_plrb),
//             email_subscribed: Boolean(obj.email_subscribed),
//             termscondtion_status: Boolean(obj.termscondtion_status),
//           }}
//           updateUrl={apiEndpoints.updateUser}
//           deleteUrl={apiEndpoints.deleteUser}
//           exploreUrl="/admin/user_profile"
//           token={token}
//         />
//       ),
//     };
//     return templateObj;
//   });

//   rows = rows.filter(
//     (item: { fullname: null | undefined }) =>
//       item.fullname !== null && item.fullname !== undefined
//   );

//   return (
//     <>
//       <section className="content-header">
//         <div className="container-fluid">
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <h1>User List</h1>
//             </div>
//             <div className="col-sm-6">
//               <ol className="breadcrumb float-sm-right">
//                 <li className="breadcrumb-item">
//                   <Link href="dashboard">Home</Link>
//                 </li>
//                 <li className="breadcrumb-item active">User Mgmt</li>
//               </ol>
//             </div>
//           </div>
//           <div className="row mb-2">
//             <div className="col-sm-6 float-sm-left">
//               <AddUserModal
//                 fields={fields}
//                 apiUrl={apiEndpoints.addUser}
//                 token={token}
//                 title="Add User"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
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

export default function UserManagement({}) {
  const [refresh, setRefresh] = useState<any>(false);
  interface RowData {
    [key: string]: any;
  }

  interface ColumnOptions {
    rowIndex: number;
  }
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [inputName, setInputName] = useState<string | null>(null);
  const [inputEmail, setInputEmail] = useState<string | null>(null);
  const [inputPhone, setInputPhone] = useState<string | null>(null);
  const [inputPassword, setInputPassword] = useState<string | null>(null);
  const [plrbStatus, setPlrbStatus] = useState<number>(0);
  const [termsCondition, setTermsCondition] = useState<number>(0);
  const [emailSubscribed, setEmailSubscription ] = useState<number>(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [linkRowId, setLinkRowId] = useState<string | null>(null);
  const [open, setOpen] = useState<any>(false);
  const toast = useRef<Toast>(null);

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
      const { data } = await axios.get(apiEndpoints.getAllUsers, {
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
    { field: "fullname", header: "Full Name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone" },
    { 
      field: "status_plrb", 
      header: "PLRB Member",
      body: (rowData: any) => (
        <p>{rowData.status_plrb === 1 ? "Yes" : "No"}</p>
      ),
    },
    { 
      field: "email_subscribed", 
      header: "eMail Opt Out",
      body: (rowData: any) => (
        <p>{rowData.email_subscribed === 1 ? "Subscribed" : "Unsubscribed"}</p>
      ),
    },
    {
      field: "Status",
      header: "Status",
      body: (rowData: any) => (
        <Button
          label={rowData.status === 1 ? "Active" : "Inactive"}
          style={{
            background: rowData.status === 1 ? "green" : "red",
            color: "#FFF",
            border: "none",
            height: "20px",
          }}
          onClick={() =>
            handleStatusUpdate(rowData, rowData.status === 1 ? 2 : 1)
          }
        />
      ),
    },
    {
      field: "actions",
      header: "Actions",
      body: (rowData: any) => (
        <div className="" style={{ width: "120px" }}>
          <Link href={`/admin/user_profile/${rowData.id}`}>
            <Button
              icon="pi pi-search-plus"
              style={{ background: "none", color: "#478FCA", border: "none" }}
            />
          </Link>
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
    if (!inputName) {
      setFormError("Required.");
      return false;
    }
    if (!inputEmail) {
      setFormError("Required.");
      return false;
    }
    if (!inputPhone) {
      setFormError("Required.");
      return false;
    }
    if (!inputPassword) {
      setFormError("Required.");
      return false;
    }
    if (!termsCondition) {
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
        fullname: inputName,
        email: inputEmail,
        phone: inputPhone,
        password: inputPassword,
        termscondtion_status: termsCondition,
        status_plrb: plrbStatus,
        email_subscribed: emailSubscribed
      };
      let apiUrl = linkRowId
        ? apiEndpoints.updateUser
        : apiEndpoints.addUser;

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
    setInputName(rowData.fullname);
    setInputEmail(rowData.email);
    setInputPhone(rowData.phone);
    setInputPassword(rowData.password);
    setLinkRowId(rowData.id);
    setPlrbStatus(rowData.status_plrb);
    setTermsCondition(rowData.termscondtion_status);
    setEmailSubscription(rowData.email_subscribed);
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
            apiEndpoints.deleteUser,
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
      const payload = { token: rowData.token, status: newStatus };

      const response = await axios.post(
        apiEndpoints.userStatus,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    setInputName(null);
    setInputEmail(null);
    setInputPhone(null);
    setInputPassword(null);
    setFormError(null);
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>User List</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active">User Mgmt</li>
              </ol>
            </div>
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
            headerText="User List"
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
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div id="modal-modal-title" className="modal_header">
              <div>{linkRowId ? "Update User" : "Add User"}</div>
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
                  <label style={headerStyle}>Full Name*</label>
                </Box>
                <Box flex={3}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={inputName || ""}
                    onChange={(e) => setInputName(e.target.value)}
                    style={{ width: "80%" }}
                  />
                  {!inputName && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap="12px" mt={2} ml={2}>
                <Box flex={1}>
                  <label style={headerStyle}>Email*</label>
                </Box>
                <Box flex={3}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={inputEmail || ""}
                    onChange={(e) => setInputEmail(e.target.value)}
                    style={{ width: "80%" }}
                  />
                  {!inputEmail && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap="12px" mt={2} ml={2}>
                <Box flex={1}>
                  <label style={headerStyle}>Phone*</label>
                </Box>
                <Box flex={3}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    value={inputPhone || ""}
                    onChange={(e) => setInputPhone(e.target.value)}
                    style={{ width: "80%" }}
                  />
                  {!inputPhone && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>
              {!linkRowId && (<Box display="flex" alignItems="center" gap="12px" mt={2} ml={2}>
                <Box flex={1}>
                  <label style={headerStyle}>Password*</label>
                </Box>
                <Box flex={3}>
                  <input
                    type="text"
                    className="form-control"
                    value={inputPassword || ""}
                    onChange={(e) => setInputPassword(e.target.value)}
                    style={{ width: "80%" }}
                  />
                  {!inputPassword && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>)}
              <div className="" style={{display:"flex", fontSize:"10px", flexDirection:"row", justifyContent:"space-between", marginLeft:"180px", marginTop:"10px"}}>
                
                {/* <div > */}
                  <label>
                    <input
                      name="plrbstatus"
                      id="plrbstatus"
                      className="ace-checkbox-2"
                      type="checkbox"

                      checked={plrbStatus === 1}
                      onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                        setPlrbStatus(e.target.checked ? 1 : 0)
                      }
                    />
                    <span className="lbl ml-2 mb-2">I am PLRB member</span>
                  </label>
                  {/* <div/> */}
                  {/* <div> */}
                  <label >
                    <input
                      name="termscondition"
                      id="termscondition"
                      className="ace-checkbox-2"
                      type="checkbox"
                      checked={termsCondition === 1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTermsCondition(e.target.checked ? 1 : 0)
                      }
                    />
                    <span className="lbl  ml-2 mb-2">Terms and Conditions*</span>
                  </label>
                  {/* </div> */}
                  {!termsCondition && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </div>

                  {linkRowId && (
                    <div className="" style={{display:"flex", fontSize:"10px", flexDirection:"row", marginLeft:"180px", marginTop:"10px"}}>
                      <label >
                        <input
                          name="emailsubscribed"
                          id="email_subscribed"
                          className="ace-checkbox-2"
                          type="checkbox"
                          checked={emailSubscribed === 1}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmailSubscription(e.target.checked ? 1 : 0)
                          }
                        />
                        <span className="lbl  ml-2 mb-2">Subscribed to emails</span>
                      </label>
                    </div>
                  )}
              {/* </div> */}


              <Box ml={8}>
                <button
                  type="button"
                  className="modal_submit_btn"
                  onClick={handleSubmit}
                >
                  <MdDone size={20} /> {linkRowId ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  className="modal_submit_btn"
                  style={{
                    backgroundColor: "#8B9AA3",
                  }}
                  onClick={resetForm}
                >
                  <VscDebugRestart size={20} /> Reset
                </button>
              </Box>
            </Box>

            {/* Close Button */}
            <div>
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

