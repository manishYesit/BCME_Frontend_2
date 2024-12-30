"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import apiEndpoints from "../../../../config/apiEndpoints";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { CircularProgress } from "@mui/material";
import CustomTable from "../../../component/Custom_Table/CustomTable";
import { ConfirmDialog } from "primereact/confirmdialog";
import { BsChatFill } from "react-icons/bs";
import { Toast } from "primereact/toast";
import { LuClock9 } from "react-icons/lu";
import { FaShare } from "react-icons/fa";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { IoHome } from "react-icons/io5";

export default function AskAnExpert({ }) {
    const [refresh, setRefresh] = useState<any>(false);
    const token = useSelector((state: RootState) => state.auth.token);
    const [data, setData]: [any, Function] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [inpuChatValue, setInpuChatValue] = useState<string | null>(null);
    const [chatData, setChatData] = useState<any | null>(null);
    const [inputAmount, setInputAmount] = useState<any | null>(null);
    const [showAmountField, setShowAmountField] = useState<any | boolean>(false);

    console.log("checkiiinpuQuil", chatData);
    const toast = useRef<Toast>(null);

    const stateList:Record<string, string> = {
        AL: 'Alabama',
        AK: 'Alaska',
        AZ: 'Arizona',
        AR: 'Arkansas',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DE: 'Delaware',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        IA: 'Iowa',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        ME: 'Maine',
        MD: 'Maryland',
        MA: 'Massachusetts',
        MI: 'Michigan',
        MN: 'Minnesota',
        MS: 'Mississippi',
        MO: 'Missouri',
        MT: 'Montana',
        NE: 'Nebraska',
        NV: 'Nevada',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VT: 'Vermont',
        VA: 'Virginia',
        WA: 'Washington',
        WV: 'West Virginia',
        WI: 'Wisconsin',
        WY: 'Wyoming',
        DC: 'District of Columbia',
        AS: 'American Samoa',
        GU: 'Guam',
        MP: 'Northern Mariana Islands',
        PR: 'Puerto Rico',
        VI: 'U.S. Virgin Islands',
        UM: 'U.S. Minor Outlying Islands',
    };


    useEffect(() => {
        if (token) {
            fetchData(token);
            fetchChatData(token);
        }
    }, [refresh, token, selectedRows]);

    async function fetchData(token: any) {
        try {
            const response = await axios.get(apiEndpoints.getAskCodeData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                let index = 1;
                const updatedData = response.data.data.map((row: any) => {
                    if (row.user) {
                        return {
                            ...row,
                            sn: index++,
                            fullname: row.user.fullname,
                            addressData: row.abbreviation ? row.abbreviation.replace(/\s+/g, '') : 'Not Found',
                            date: new Date(row.contact_created).toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                            }),
                            state: stateList[row.stateStr?.toUpperCase()] || 'Unknown',
                        };
                    }
                    return null;
                }).filter(Boolean);
                setData(updatedData);
            } else {
                console.error("Error: Failed to fetch data. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function fetchChatData(token: any) {
        try {
            const fetchData = { id: selectedRows };

            const response = await axios.post(
                apiEndpoints.getCodeQueryById,
                fetchData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                const htmlData = response.data;
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlData, "text/html");

                const chatItems: any = [];
                const messages = doc.querySelectorAll(".itemdiv.dialogdiv");
                messages.forEach((message, index) => {
                    const time = message.querySelector(".time .green")?.textContent || "";
                    const name = message.querySelector(".name")?.textContent || "";
                    const text = message.querySelector(".text")?.innerHTML || "";

                    chatItems.push({ time, name, text, sn: index + 1 });
                });
                setChatData(chatItems);
            }
        } catch (error) {
            console.error("Error fetching chat data:", error);
        }
    }
    const handleStatusUpdate = async (rowData: any, newStatus: number) => {
        try {
            const payload = { domain_id: rowData.domain_id, status: newStatus };

            const response = await axios.post(apiEndpoints.domainStatus, payload, {
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

    const handleSendMessage = async () => {
        try {
            const payload = {
                contactId: selectedRows,
                msg: inpuChatValue,
                amount: inputAmount,
                type: inputAmount ? "amount" : "",
            };

            const response = await axios.post(
                apiEndpoints.send_QueryMessage,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                fetchChatData(token);
                setShowAmountField(false);
                setInputAmount(null);
                setChatData(null);
                setInpuChatValue(null);
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
            field: "fullname",
            header: "Full Name",
        },
        {
            field: "muniStr",
            header: "Municipality",
        },
        {
            field: "state",
            header: "State",
        },
        {
            field: "addressData",
            header: "Auto Search Result",
        },
        {
            field: "date",
            header: "Search Date",
        },

    ];

    const modules = {
        toolbar: [
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["link"],
            ["about"],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const rowExpansionTemplate = (data: any) => {
        setSelectedRows(data?.contact_id);

        return (
            <div className="chat-container">
                <div className="chat-header">
                    <BsChatFill className="chat-icon" size={20} />
                    <span className="chat-header-text">{data?.contact_subject}</span>
                </div>

                {chatData?.map((item: any, index: number) => (
                    <div className="chat-messages" key={index}>
                        <div className="chat-message">
                            <div className="user-message">
                                <div
                                    className=""
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <div className="chat_title" style={{ color: "#478fca" }}>
                                        {" "}
                                        {item?.name}
                                    </div>
                                    <div>
                                        <LuClock9 />
                                        <span className="chat_title" style={{ color: "#69AA46" }}>
                                            {item?.time}
                                        </span>
                                    </div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: item?.text }}></div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="chat_title m-3">
                    <a
                        href="#/"
                        style={{ color: "#478fca" }}
                        onClick={(e) => setShowAmountField(true)}
                    >
                        Ask for Payment
                    </a>
                </div>
                {showAmountField && (
                    <div className="chat-input">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Amount"
                            value={inputAmount || ""}
                            onChange={(e) => setInputAmount(e.target.value)}
                            style={{ width: "90%", marginRight: "72px" }}
                        />
                    </div>
                )}
                <div className="chat-input">
                    <ReactQuill
                        value={inpuChatValue || ""}
                        onChange={(event: any) => setInpuChatValue(event)}
                        theme="snow"
                        style={{
                            width: "90%",
                            height: "250px",
                            overflowY: "auto",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            background: "white",
                        }}
                        modules={modules}
                    />
                    <button
                        type="button"
                        className="modal_send_btn"
                        onClick={handleSendMessage}
                    >
                        <FaShare size={20} /> Send
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="page-header">
                <h1>
                    User Search Data
                    <small>
                        <i className="ace-icon fa fa-angle-double-right"></i>
                        List
                    </small>
                </h1>
            </div>
            {data.length ? (
                <div>
                    <CustomTable
                        data={data}
                        columns={columns}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        showExportButton={false}
                        showDeleteButton={false}
                        showImportButton={false}
                        showExpandButton={false}
                        showAddButton={false}
                        showCollapseButton={false}
                        showGlobalSearch={false} onAdd={undefined} onDelete={undefined} exportToCSV={undefined} globalFilter={undefined} setGlobalFilter={undefined} selectionMode={undefined} />
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
