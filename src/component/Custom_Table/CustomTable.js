import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import Link from "next/link";
import * as XLSX from "xlsx";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import "./customTable.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const CustomTable = ({
  data,
  columns,
  onAdd,
  onDelete,
  rowExpansionTemplate,
  exportToCSV,
  globalFilter,
  setGlobalFilter,
  selectedRows,
  setSelectedRows,
  selectionMode,
  showExportButton = true,
  showDeleteButton = true,
  showImportButton = true,
  showExpandButton = true,
  showGlobalSearch = true,
  showAddButton = true,
  showCollapseButton = false,
  headerText = "Header",
  setImageHeaderText = "",
}) => {
  const toast = useRef(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [importedData, setImportedData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle the expansion state of a row
  const onRowExpandClick = (rowData) => {
    const index = expandedRows.findIndex((row) => row.sn === rowData.sn);
    let newExpandedRows = [...expandedRows];

    if (index === -1) {
      newExpandedRows.push(rowData);
    } else {
      newExpandedRows = newExpandedRows.filter((row) => row.sn !== rowData.sn);
    }

    setExpandedRows(newExpandedRows); // Update the expanded rows state
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  console.log("rowdataaaas", expandedRows);

  const headingText = (
    <div
      className=""
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "5px",
      }}
    >
      <div>
        <p>{headerText}</p>
      </div>
      <div>
        {headerText === "Roof List" ? (
          <Link href="/admin/roof_set_image" className="header-link">
            <p>{setImageHeaderText}</p>
          </Link>
        ) : (
          <Link href="/admin/stair_set_image" className="header-link">
            <p>{setImageHeaderText}</p>
          </Link>
        )}
      </div>
      {showCollapseButton && (
        <div onClick={toggleCollapse}>
          {isCollapsed === false ? (
            <span>
              <IoIosArrowUp size={30} />
            </span>
          ) : (
            <span>
              <IoIosArrowDown size={30} />
            </span>
          )}
        </div>
      )}
    </div>
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Take the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet); // Convert to JSON
      setImportedData(jsonData); // Set the imported data to state
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="card my-card">
        <div className="flex gap-2 mb-2">
          {showAddButton && (
            <Button
              className="table_add_btn"
              label="Add"
              icon="pi pi-plus"
              onClick={onAdd}
            />
          )}
          {showDeleteButton && (
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              onClick={() => onDelete(selectedRows)}
              disabled={!selectedRows || !selectedRows.length}
            />
          )}

          {showExportButton && (
            <Button
              label="Export CSV"
              icon="pi pi-upload"
              style={{
                background: "#3399ff",
                fontSize: "12px",
                border: "none",
              }}
              onClick={exportToCSV}
            />
          )}

          {showImportButton && (
            <Button
              label="Import Excel"
              icon="pi pi-file-excel"
              className="p-button-help"
            >
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </Button>
          )}
        </div>
        {headerText !== "Header" && (<div className="datatable-mainheader">{headingText}</div>)}
        <div
          className={`collapse ${!isCollapsed ? "show" : ""}`}
          id="collapseExample"
        >
          <div className="table_header">
            {showGlobalSearch && (
              <div className="mt-2 mb-2" style={{ textAlign: "end" }}>
                <IconField>
                  <InputIcon className="pi pi-search" iconPosition="left" />
                  <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                  />
                </IconField>
              </div>
            )}

            <DataTable
              value={data}
              selection={selectedRows}
              onSelectionChange={(e) => setSelectedRows(e.value)}
              dataKey="sn"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              globalFilter={globalFilter}
              selectionMode={selectionMode}
              expandedRows={expandedRows}
              onRowClick={() => { }}
              rowExpansionTemplate={rowExpansionTemplate}
            >
              {/* Expand Button Column - Always First */}
              {showExpandButton && (
                <Column
                  body={(rowData) => (
                    <Button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#307ECC",
                        fontWeight: 900,
                        fontSize: "12px",
                        height: "10px",
                        width: "10px",
                      }}
                      icon={
                        expandedRows &&
                          expandedRows.some((row) => row.sn === rowData.sn)
                          ? "pi pi-minus"
                          : "pi pi-plus"
                      }
                      onClick={() => onRowExpandClick(rowData)}
                      className="p-button-rounded"
                    />
                  )}
                  header=""
                  style={{ width: "15px" }}
                />
              )}

              {/* Other Columns */}
              {columns.map((col) => (
                <Column
                  key={col.field}
                  field={col.field}
                  header={col.header}
                  body={col.body}
                  sortable={col.sortable || false}
                  style={{ width: col.width }}
                />
              ))}
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
