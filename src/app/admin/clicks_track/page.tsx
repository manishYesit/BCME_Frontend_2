"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import apiEndpoints from "../../../../config/apiEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { CircularProgress } from "@mui/material";
import CustomTable from "../../../component/Custom_Table/CustomTable";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { saveAs } from "file-saver";

export default function ClickTrackList({}) {
  const [refresh, setRefresh] = useState<any>(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const toast = useRef<Toast>(null);

  // Export to CSV
  const exportToCSV = () => {
    try {
      const csvRows = [];
      const headers = columns.map((col) => col.header);
      csvRows.push(headers.join(","));

      data.forEach((row: any) => {
        const rowData = columns.map((col) => row[col.field]);
        csvRows.push(rowData.join(","));
      });
      const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
      saveAs(csvData, "Clicks-Tracking.csv");
    } catch (error) {
      toast.current?.show({
        severity: "error",
        detail: "Error exporting the data to CSV",
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [refresh, token]);

  async function fetchData(token: any) {
    try {
      const response = await axios.get(apiEndpoints.clickTrackData, {
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

  const columns = [
    {
      field: "sn",
      header: "S.N",
      sortable: true,
    },
    {
      field: "month",
      header: "Month",
      sortable: true,
      width: "120px",
    },
    {
      field: "hammer",
      header: "Hammer Click Count",
      sortable: true,
      width: "140px",
    },
    { field: "faq", header: "FAQ Buttons click Count", sortable: true },
    { field: "doc", header: "Document Click Count", sortable: true },
    { field: "lang", header: "Language Click Count", sortable: true },
    {
      field: "codelang",
      header: "Code Language Buttons Click Count",
      sortable: true,
    },
    {
      field: "rvalue",
      header: "R-value estimator Buttons Click Count",
      sortable: true,
    },
  ];

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Clicks Tracking </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active">Clicks Tracking </li>
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
            exportToCSV={exportToCSV}
            showExportButton={true}
            showDeleteButton={false}
            showImportButton={false}
            showExpandButton={false}
            showAddButton={false}
            headerText="Clicks Tracking "
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