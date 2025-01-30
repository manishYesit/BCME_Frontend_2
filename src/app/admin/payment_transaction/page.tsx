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
import { format } from "date-fns";
import { Toast } from "primereact/toast";
import { IoHome } from "react-icons/io5";

export default function transactions({}) {
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
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [refresh, token]);

  async function fetchData(token: any) {
    try {
      const { data } = await axios.get(apiEndpoints.getTransactions, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sanitizedData = data.data.map((parent: any) => {
        const { user, status, ...rest } = parent;
        const { fullname = null, termscondtion_status = null } = user || {};
        return {
          ...rest,
          fullname,
          status: termscondtion_status === 1 ? "Paid" : "",
        };
      });
      // console.log(sanitizedData);

      setData(sanitizedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const columns = [
    { field: "fullname", header: "User Name", sortable: true },
    { field: "amount", header: "Amount", sortable: true },
    { field: "transaction_id", header: "Transaction Id", sortable: true },
    { field: "status", header: "Payment Status", sortable: true },
    {
      field: "create_date",
      header: "Date",
      sortable: true,
      body: (rowData: any) =>
        format(new Date(rowData.create_date), "yyyy-MM-dd"),
    },
  ];

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
              <li className="breadcrumb-item active">Transaction</li>
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
            showExportButton={false}
            showDeleteButton={false}
            showImportButton={false}
            showExpandButton={false}
            showAddButton={false}
            headerText="Transaction Detail" onAdd={undefined} onDelete={undefined} rowExpansionTemplate={undefined} exportToCSV={undefined} selectionMode={undefined}          />
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
