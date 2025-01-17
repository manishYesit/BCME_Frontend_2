"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import CustomTable from "../../../../../component/Custom_Table/CustomTable";
import { Button } from "primereact/button";
import apiEndpoints from "../../../../../../config/apiEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/index";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdDone } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

export default function viewList({ params }: any) {
  const id = params["id"];
  const [refresh, setRefresh] = useState<any>(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);
  const [inputTitle, setInputTitle] = useState<any>(null);
  const [inputDetails, setInputDetails] = useState<any>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [linkRowId, setLinkRowId] = useState<any>(null);
  const [pdfFile, setPdfFile] = useState<any>(null);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
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
      fetchDataById(token);
    }
  }, [refresh, token, id]);

  async function fetchDataById(token: any) {
    try {
      const fetchData = {
        id: id,
      };

      const response = await axios.post(
        apiEndpoints.getFAQ_Details,
        fetchData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedData = response.data.data.map(
          (row: any, index: number) => ({
            ...row,
            sn: index + 1,
          })
        );
        setData(updatedData);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  // Handle Edit Data
  const handleEdit = (rowData: any) => {
    setInputTitle(rowData.title);
    setInputDetails(rowData.details);
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
            apiEndpoints.Delete_FAQ,
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
          fetchDataById(token);
        } catch (error) {
          console.error("Error deleting:", error);
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Error deleting the row.",
            life: 3000,
          });
        }
      },
    });
  };

  const columns = [
    { field: "sn", header: "S.N", width: "40px" },
    { field: "details", header: "Details" },
    {
      field: "img",
      header: "PDF",
      body: (rowData: any) =>
        rowData.img ? (
          <Link
            href={`http://3.12.198.252/api/assets/fqa/${rowData.img}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1976d2",
              textDecoration: "none",
              // border: "1px solid #1976d2",
              padding: "5px 10px",
              borderRadius: "4px",
            }}
          >
            {rowData.img.replace(".pdf", "")}{" "}
          </Link>
        ) : (
          <span>No PDF</span>
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

  const handleValidationForm = () => {
    if (!inputDetails) {
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
      // let testid = 46;
      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("tblFaqTitleId", id);
      formData.append("id", linkRowId);
      formData.append("details", inputDetails);

      // if(!linkRowId) {
      //   formData.append("title", inputTitle);
      // }

      let apiUrl = linkRowId
        ? apiEndpoints.Update_FAQ
        : apiEndpoints.register_FAQ;

      let method = linkRowId ? axios.put : axios.post;
      const response = await method(apiUrl, formData, {
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
        fetchDataById(token);
      }
    } catch (error) {
      console.error("Error occurred:", error);
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
    setInputTitle(null);
    setInputDetails(null);
    setFormError(null);
    setLinkRowId(null);
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPdfFile(file);
      setPdfFileName(file.name);
    }
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>FAQ List</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="/admin/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/admin/faq_data">FAQ List</Link>
                </li>
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
            onAdd={handleOpen}
            showExportButton={false}
            showDeleteButton={false}
            showImportButton={false}
            showExpandButton={false}
            showGlobalSearch={false}
            headerText="FAQ List" onDelete={undefined} rowExpansionTemplate={undefined} exportToCSV={undefined} globalFilter={undefined} setGlobalFilter={undefined} selectedRows={undefined} setSelectedRows={undefined} selectionMode={undefined}          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Data Not found</p>
          {/* <CircularProgress size="3rem" /> */}
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
              <div>{linkRowId ? "Update FAQ" : "Add FAQ"}</div>
              <div
                style={{ fontWeight: 600, cursor: "pointer", fontSize: "18px" }}
                onClick={handleClose}
              >
                X
              </div>
            </div>

            <Box>
              {!linkRowId && (
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
              )}
              <Box display="flex" alignItems="center" gap="12px" mt={2} ml={2}>
                <Box flex={1}>
                  <label style={headerStyle}>Details</label>
                </Box>
                <Box flex={3}>
                  <textarea
                    className="form-control"
                    placeholder="Details"
                    value={inputDetails || ""}
                    onChange={(e) => setInputDetails(e.target.value)}
                    style={{
                      width: "80%",
                      height: "80px",
                      overflowY: "auto",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  />
                  {!inputDetails && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap="12px" mt={2} ml={2}>
                <Box flex={1}>
                  <label style={headerStyle}>Pdf</label>
                </Box>
                <Box flex={3}>
                  <label htmlFor="pdf-upload" className="plrb-import-btn">
                    Browse File...
                  </label>

                  <input
                    id="pdf-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />

                  {pdfFileName && (
                    <span
                      style={{
                        marginTop: "2px",
                        fontSize: "13px",
                        color: "#0c0c0c",
                        marginLeft: "5px",
                      }}
                    >
                      {pdfFileName}
                    </span>
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
                  {!linkRowId && (
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
                  )}
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
