"use client";
import axios from "axios";
// import { DataTable } from 'react-basic-datatable';
import FilteredTable from "@/component/Filtering/Filtering";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddUserModal from "@/component/Modals/AddUserModal";
import LinkButton from "@/component/LinkButton";
import Actions from "@/component/Actions";
import apiEndpoints from "../../../../config/apiEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { CircularProgress } from "@mui/material";

export default function UserManagement() {
  const [refresh, setRefresh] = useState<any>(false);
  interface User {
    sn: string;
    fullname: string;
    email: string;
    phone: string;
    status_plrb: string;
    email_subscribed: string;
    delete_status: string;
    actions: string;
  }

  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);

  // const columns = [
  //     { label: "S.N", field: "sn" },
  //     { label: "Full Name", field: "fullname" },
  //     { label: "Email", field: "email" },
  //     { label: "Phone", field: "phone" },
  //     { label: "PLRB Member", field: "status_plrb" },
  //     { label: "eMail Opt Out", field: "email_subscribed" },
  //     { label: "Status", field: "delete_status" }
  // ];

  const columns = [
    { name: "S.N", selector: (row: User) => row.sn, sortable: true },
    {
      name: "Full Name",
      selector: (row: User) => row.fullname,
      sortable: true,
    },
    { name: "Email", selector: (row: User) => row.email, sortable: true },
    { name: "Phone", selector: (row: User) => row.phone, sortable: true },
    {
      name: "PLRB Member",
      selector: (row: User) => row.status_plrb,
      sortable: true,
    },
    {
      name: "eMail Opt Out",
      selector: (row: User) => row.email_subscribed,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: User) => row.delete_status,
      sortable: true,
    },
    { name: "Actions", selector: (row: User) => row.actions, width: "200px" },
  ];

  // const showingLength = [10, 50, 100];

  const fields = [
    { label: "Name", name: "fullname" },
    { label: "Email", name: "email" },
    { label: "Phone", name: "phone" },
    { label: "Password", name: "password" },
  ];

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [refresh, token]);

  async function fetchData(token: any) {
    const result = await axios.get(apiEndpoints.getAllUsers, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(result.data.data);
  }

  let rows = data.map((obj: any, index: any) => {
    let templateObj = {
      sn: `${++index}`,
      fullname: obj.fullname ?? "",
      email: `${obj.email}`,
      phone: `${obj.phone}`,
      status_plrb: `${obj.status_plrb}` ? "Yes" : "No",
      email_subscribed: `${obj.email_subscribed}`
        ? "Subscribed"
        : "Unsubscribed",
      delete_status:
        obj.delete_status == 2 ? (
          <LinkButton label={"Inactive"} />
        ) : (
          <LinkButton label={"Active"} />
        ),
      actions: (
        <Actions
          id={obj.id}
          setRefresh={setRefresh}
          refresh={refresh}
          initialData={{
            fullname: obj.fullname,
            email: `${obj.email}`,
            phone: `${obj.phone}`,
            status_plrb: Boolean(obj.status_plrb),
            email_subscribed: Boolean(obj.email_subscribed),
            termscondtion_status: Boolean(obj.termscondtion_status),
          }}
          updateUrl={apiEndpoints.updateUser}
          deleteUrl={apiEndpoints.deleteUser}
          exploreUrl="/admin/user_profile"
          token={token}
        />
      ),
    };
    return templateObj;
  });

  rows = rows.filter(
    (item: { fullname: null | undefined }) =>
      item.fullname !== null && item.fullname !== undefined
  );

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
          <div className="row mb-2">
            <div className="col-sm-6 float-sm-left">
              <AddUserModal
                fields={fields}
                apiUrl={apiEndpoints.addUser}
                token={token}
                title="Add User"
              />
            </div>
          </div>
        </div>
      </section>
      {rows.length ? (
        <FilteredTable columns={columns} data={rows} />
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
    </>
  );
}
