"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import CustomTable from "../../../component/Custom_Table/CustomTable";
import { Button } from "primereact/button";
import apiEndpoints from "../../../../config/apiEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdDone } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { IoHome } from "react-icons/io5";

export default function PLRBDomainList({ params }: any) {
  const id = params["id"];
  const [refresh, setRefresh] = useState<any>(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);
  const [inputDominName, setInputDominName] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [linkRowId, setLinkRowId] = useState<string | null>(null);
  const [domainStatus, setDomainStatus] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState(null);
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
  }, [refresh, token, id]);

  async function fetchData(token: any) {
    try {
      const response = await axios.get(apiEndpoints.getAllDomains, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const updatedData = response.data.data.map(
          (row: any, index: number) => ({
            ...row,
            sn: index + 1,
          })
        );
        setData(updatedData);
      } else {
        console.error("Error: Failed to fetch data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Handle Edit Data
  const handleEdit = (rowData: any) => {
    setInputDominName(rowData.domain_name);
    setLinkRowId(rowData.domain_id);
    setDomainStatus(rowData.Status);
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
            apiEndpoints.deleteDomain,
            { domain_id: rowData.domain_id },
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
      const payload = { domain_id: rowData.domain_id, status: newStatus };

      const response = await axios.post(apiEndpoints.domainStatus, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
        summary: "Error",
        detail: "Failed to update status.",
        life: 3000,
      });
    }
  };

  const columns = [
    { field: "sn", header: "S.N", sortable: true, width: "10px" },
    {
      field: "domain_name",
      header: "Domain Name",
      sortable: true,
    },

    {
      field: "Status",
      header: "Status",
      width: "120px",
      body: (rowData: any) => (
        <Button
          label={rowData.status === 1 ? "Active" : "Inactive"}
          style={{
            background: rowData.status === 1 ? "green" : "red",
            color: "#FFF",
            border: "none",
            height: "20px",
          }}
          onClick={() =>{
            const action = rowData.status === 1 ? "deactivate" : "activate";
            if (window.confirm(`Are you sure you want to ${action} ?`)) {
              handleStatusUpdate(rowData, rowData.status === 1 ? 2 : 1);
            }
          }
            // handleStatusUpdate(rowData, rowData.status === 1 ? 2 : 1)
          }
        />
      ),
    },
    {
      field: "actions",
      header: "Actions",
      width: "120px",
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

  const handleValidationForm = () => {
    if (!inputDominName) {
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
      const payload = linkRowId
        ? {
            domain_id: linkRowId,
            domain_name: inputDominName,
            status: domainStatus,
          }
        : {
            domain_id: linkRowId,
            domain_name: inputDominName,
          };
      let apiUrl = linkRowId
        ? apiEndpoints.updateDomain
        : apiEndpoints.addDomain;

      let method = linkRowId ? axios.put : axios.post;
      const response = await method(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          detail: linkRowId
            ? "Row Updated successfully!"
            : "Row added successfully!",
          life: 3000,
        });
        handleClose();
        fetchData(token);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  // Function to handle CSV file upload
  const importCSV = async (token: any, CSV: any) => {
    try {
      const formData = new FormData();
      formData.append("file", CSV);

      const response = await axios.post(apiEndpoints.importPlrb, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          detail: "CSV file uploaded successfully!",
          life: 3000,
        });
        fetchData(token);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.current?.show({
        severity: "error",
        detail: "Error. Please try again.",
        life: 3000,
      });
    }
  };

  // Handle file selection
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // Reset form fields
  const resetForm = () => {
    setInputDominName(null);
    setFormError(null);
    setLinkRowId(null);
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
              <li className="breadcrumb-item active">PLRB Member Domain List</li>
            </ol>
          </div>
        </div>
      </section>
      {data.length ? (
        <div>
          <div
            className="col-sm-12 btn-container mb-3"
            style={{ justifyContent: "space-evenly" }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "14px",
                fontWeight: "400",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{ color: "red", marginRight: "5px", fontWeight: 500 }}
              >
                <p className="mb-0">Import CSV Spreadsheet :</p>
              </span>

              <label className="plrb-import-btn m-0" htmlFor="csv-file-input">
                Browse File...
                <input
                  id="csv-file-input"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  style={{
                    display: "none",
                  }}
                />
              </label>
              {fileName && (
                <p
                  style={{
                    marginTop: "2px",
                    fontSize: "13px",
                    color: "#0c0c0c",
                    marginLeft: "5px",
                  }}
                >
                  {fileName}
                </p>
              )}
            </div>
            <div>
              <button
                className="plrb-import-btn table_add_btn"
                onClick={() => importCSV(token, file)}
              >
                Submit Query
              </button>
            </div>
          </div>

          <CustomTable
            data={data}
            columns={columns}
            onAdd={handleOpen}
            showExportButton={false}
            showDeleteButton={false}
            showImportButton={false}
            showExpandButton={false}
            showGlobalSearch={true}
            headerText="PLRB Member Domain List " onDelete={undefined} rowExpansionTemplate={undefined} exportToCSV={undefined} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} selectedRows={undefined} setSelectedRows={undefined} selectionMode={undefined}          />
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
              <div>
                {linkRowId
                  ? "Update PLRB Member Domain "
                  : "Add PLRB Member Domain "}
              </div>
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
                  <label style={headerStyle}>Domain Name</label>
                </Box>
                <Box flex={3}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Domain Name"
                    value={inputDominName || ""}
                    onChange={(e) => setInputDominName(e.target.value)}
                    style={{ width: "80%" }}
                  />
                  {!inputDominName && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>

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
