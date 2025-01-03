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

export default function StairList({ params }: any) {
  const id = params["id"];
  const [refresh, setRefresh] = useState<any>(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);
  const [inputTitle, setInputTitle] = useState<string | null>(null);
  const [inputInformation, setInputInformation] = useState<string | null>(null);
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
      fetchDataById(token);
    }
  }, [refresh, token, id]);

  async function fetchDataById(token: any) {
    try {
      const fetchData = {
        id: id,
        linkType: 0,
      };

      const result = await axios.post(
        apiEndpoints.stairCodeDataById,
        fetchData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(result.data.data);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  // Handle Edit Data
  const handleEdit = (rowData: any) => {
    setInputTitle(rowData.title);
    setInputInformation(rowData.data);
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
            apiEndpoints.stairCodeTrashLinkId,
            { id: rowData.id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.current?.show({
            severity: "warn",
            // summary: "Deleted",
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

  const handleStatusUpdate = async (rowData: any, newStatus: number) => {
    try {
      const payload = { id: rowData.id, status: newStatus };

      const response = await axios.put(apiEndpoints.stairLinkStatus, payload, {
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
        fetchDataById(token);
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
      header: "S.N",
      sortable: true,
      body: (_: any, { rowIndex }: any) => rowIndex + 1,
    },
    { field: "title", header: "Title", sortable: true },
    { field: "data", header: "Data", sortable: true },
    {
      field: "row_order",
      header: "Order",
      sortable: true,
    },
    {
      field: "Status",
      header: "Status",
      sortable: true,
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
        data_id: id,
        linkType: 0,
      };
      let apiUrl = linkRowId
        ? apiEndpoints.stairCodeupdateLinkInformation
        : apiEndpoints.stairCodeAddLinkDataById;

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
      fetchDataById(token);
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
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Stair List</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="/admin/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/admin/stair_list">Stair List</Link>
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
            headerText="Link List" onDelete={undefined} rowExpansionTemplate={undefined} exportToCSV={undefined} globalFilter={undefined} setGlobalFilter={undefined} selectedRows={undefined} setSelectedRows={undefined} selectionMode={undefined}          />
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
              <div>{linkRowId ? "Update" : "Add"}</div>
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
