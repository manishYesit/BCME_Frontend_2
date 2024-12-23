// "use client";
// import axios from "axios";
// import { DataTable } from "react-basic-datatable";
// import { useState, useEffect } from "react";
// import FilteredTable from "@/component/Filtering/Filtering";
// import LinkButton from "@/component/LinkButton";
// import Actions from "@/component/Actions";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store/index";
// import apiEndpoints from "../../../../config/apiEndpoints";
// import { CircularProgress } from "@mui/material";

// export default function faqData() {
//   const [refresh, setRefresh] = useState<any>(false);
//   const [data, setData]: [any, Function] = useState([]);
//   const [error, setError] = useState<any>(null);

//   interface FAQ {
//     sn: string;
//     title: string;
//     list: string;
//     actions: string;
//   }

//   // const columns = [
//   //     { label: "S.N", field: "sn" },
//   //     { label: "Hammer Name", field: "title" },
//   //     { label: "List", field: "list"},
//   //     { label: "Action", field: ""}
//   // ];

//   const token = useSelector((state: RootState) => state.auth.token);
//   const columns = [
//     { name: "S.N", selector: (row: FAQ) => row.sn, sortable: true },
//     { name: "Hammer Name", selector: (row: FAQ) => row.title, sortable: true },
//     { name: "List", selector: (row: FAQ) => row.list, sortable: true },
//     { name: "Action", selector: (row: FAQ) => row.actions, width: "200px" },
//   ];

//   // const showingLength = [10, 50, 100];

//   useEffect(() => {
//     if (token) {
//       fetchData(token);
//     }
//   }, [token]);

//   async function fetchData(token: any) {
//     try {
//       const result = await axios.get(apiEndpoints.getFAQData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("resultdattta", result);
//       setData("");
//       // setData(result.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);

//       setError("Failed to fetch FAQ data. Please try again later.");
//     }
//   }

//   let rows = data.map((obj: any, index: any) => {
//     let templateObj = {
//       sn: `${++index}`,
//       title: obj.title ?? "",
//       list: obj.list ?? "",
//       actions: (
//         <Actions
//           id={obj.id}
//           setRefresh={setRefresh}
//           refresh={refresh}
//           initialData={{
//             title: obj.title ?? "",
//             list: obj.list ?? "",
//           }}
//           deleteUrl={"http://localhost:4000/api/tf_user/deleteUser"}
//           exploreUrl="#"
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
//               <h1>FAQ List</h1>
//             </div>
//             <div className="col-sm-6">
//               <ol className="breadcrumb float-sm-right">
//                 <li className="breadcrumb-item">
//                   <a href="#">Home</a>
//                 </li>
//                 <li className="breadcrumb-item active">FAQ</li>
//               </ol>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* {rows.length ? ( */}
//       <FilteredTable columns={columns} data={rows} />
//       {/* ) : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <CircularProgress size="3rem" />
//         </div>
//       )} */}
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
import { ImEye } from "react-icons/im";
import Select from "react-select";
import { IoHome } from "react-icons/io5";

export default function FaqList({}) {
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
  const [selectedListType, setSelectedListType] = useState<any>(null);
  const [selectedHammer, setSelectedHammer] = useState<any>(null);
  const [allHammerData, setAllHammerData] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);
  const toast = useRef<Toast>(null);

  console.log("checkroofdataLinkgetFAQDataselectedListType", selectedHammer);

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

  const list = [
    { label: "Roof", value: 1 },
    { label: "Stairs", value: 2 },
    { label: "Roof Tools", value: 3 },
    { label: "Stairs Tools", value: 4 },
  ];

  useEffect(() => {
    if (token) {
      fetchData(token);
      fetcHammerData(token);
    }
  }, [refresh, token, selectedListType]);

  async function fetchData(token: any) {
    try {
      const response = await axios.get(apiEndpoints.getFAQData, {
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

  async function fetcHammerData(token: any) {
    let apiUrl =
      selectedListType === 1
        ? apiEndpoints.getRoofData
        : selectedListType === 2
        ? apiEndpoints.getStairData
        : selectedListType === 3
        ? apiEndpoints.getRoofToolsData
        : selectedListType === 4
        ? apiEndpoints.getStairToolsData
        : "";
    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      selectedListType;
      if (response.status === 200) {
        const transformedData = response.data.data?.map((item: any) => ({
          label: item.title,
          value: item.id,
        }));
        setAllHammerData(transformedData);
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
      width: "40px",
    },
    { field: "title", header: "Hammer Name", sortable: true },
    { field: "list", header: "List", sortable: true },

    {
      field: "actions",
      header: "Actions",
      width: "100px",
      body: (rowData: any) => (
        <div className="" style={{ width: "120px" }}>
          {rowData.hammer_id && (
            <Link href={`/admin/faq_data/view_list/${rowData.id} `}>
              <ImEye
                style={{
                  background: "none",
                  color: "69AA46 ",
                  border: "none",
                  marginBottom: "5px",
                }}
                size={18}
              />
            </Link>
          )}

          <Button
            icon="pi pi-trash"
            severity="danger"
            onClick={() => handleDelete(rowData)}
            style={{ background: "none", color: "#DD5A43 ", border: "none" }}
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
    if (!selectedHammer) {
      setFormError("Required.");
      return false;
    }
    if (!selectedListType) {
      setFormError("Please select a list type.");
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
        list_image: selectedListType,
        hammer_id: selectedHammer,
      };
      let apiUrl = linkRowId
        ? apiEndpoints.updateRoofData
        : apiEndpoints.addFAQData;

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
            apiEndpoints.deleteFAQData,
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
              <li className="breadcrumb-item active">FAQ List</li>
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
            headerText="FAQ List"
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
                  <label style={headerStyle}>List</label>
                </Box>
                <Box flex={3}>
                  <Select
                    options={list}
                    isSearchable
                    styles={{
                      container: (provided) => ({
                        ...provided,
                        width: 390,
                      }),
                      control: (provided) => ({
                        ...provided,
                        width: 390,
                        backgroundColor: "transparent",
                      }),
                    }}
                    onChange={(selectedOption) =>
                      setSelectedListType(
                        selectedOption ? selectedOption.value : null
                      )
                    }
                    value={list.find(
                      (option) => option.value === selectedListType
                    )}
                  />
                  {formError && !selectedListType && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap="12px" mt={2} ml={2}>
                <Box flex={1}>
                  <label style={headerStyle}>Select Hammer</label>
                </Box>
                <Box flex={3}>
                  <Select
                    options={allHammerData}
                    isSearchable
                    styles={{
                      container: (provided) => ({
                        ...provided,
                        width: 390,
                      }),
                      control: (provided) => ({
                        ...provided,
                        width: 390,
                        backgroundColor: "transparent",
                      }),
                    }}
                    onChange={(selectedOption) =>
                      setSelectedHammer(
                        selectedOption ? selectedOption.value : null
                      )
                    }
                    value={list.find(
                      (option) => option.value === selectedHammer
                    )}
                  />
                  {formError && !selectedHammer && (
                    <Typography variant="body2" color="error">
                      {formError}
                    </Typography>
                  )}
                </Box>
              </Box>
              {/* //------------ */}
              <Box display="flex" alignItems="center" gap="12px" mt={2} ml={2}>
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
