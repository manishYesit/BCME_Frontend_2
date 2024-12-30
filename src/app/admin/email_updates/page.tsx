"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import apiEndpoints from "../../../../config/apiEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { FaPencilAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";

// export default function emailUpdates() {

//     const [inputBodyValue, setInpuBodyValue] = useState<string | null>(null);

//     const modules = {
//         toolbar: [
//           ["bold", "italic"],
//           [{ list: "ordered" }, { list: "bullet" }],
//           [{ indent: "-1" }, { indent: "+1" }],
//           ["link"],
//           ["about"],
//         ],
//         clipboard: {
//           matchVisual: false,
//         },
//     };

//     return (
//         <>
//             <div className="email-updates-wrap">
//                 <h2>eMail Updates</h2>
//                 <form action="">
//                     <div className="send-options">
//                         <label> <input type="radio" defaultChecked value="1" name="send_option" /> Send to Test users </label>
//                         <label> <input type="radio" value="2" name="send_option" /> Send to All </label>
//                     </div>
//                     <div className="email-member">
//                         <label> <input type="checkbox" /> Only PLRB Member </label>
//                     </div>
//                     <div className="email-updates-fields">
//                         <label>Test User Email:</label>
//                         <input type="text" placeholder="admin@example.com" />
//                     </div>
//                     <div className="email-updates-fields">
//                         <label>Subject:</label>
//                         <input type="text" />
//                     </div>
//                     <div className="email-updates-fields">
//                         <label>Body:</label>
//                         <ReactQuill
//                             value={inputBodyValue || ""}
//                             onChange={(event: any) => setInpuBodyValue(event)}
//                             theme="snow"
//                             style={{
//                               width: "100%",
//                               height: "250px",
//                               overflowY: "auto",
//                               border: "1px solid #ccc",
//                               borderRadius: "4px",
//                               background: "white",
//                             }}
//                             modules={modules}
//                         />
//                     </div>
//                     <input type="submit" value="Send" />
//                 </form>
//             </div>
//         </>
//     );
// }


const EmailUpdates: React.FC = () => {

    
    const token = useSelector((state: RootState) => state.auth.token);
    const [sendOption, setSendOption] = useState<string>("1");
    const [testUserEmail, setTestUserEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [inputBodyValue, setInputBodyValue] = useState<string | null>(null);
    const [plrbMemberOnlyValue, setPlrbMemberOnlyValue] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const modules = {
        toolbar: [
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["link"],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (sendOption === "1" && !testUserEmail) {
            newErrors.testUserEmail = "Test user email is required.";
        } else if (
            sendOption === "1" &&
            testUserEmail &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testUserEmail)
        ) {
            newErrors.testUserEmail = "Enter a valid email address.";
        }
        if (!subject) {
            newErrors.subject = "Subject is required.";
        }
        if (!inputBodyValue || inputBodyValue.trim() === "") {
            newErrors.body = "Body content is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const payload = {
            sendType: parseInt(sendOption, 10),
            test_email: sendOption === "1" ? testUserEmail : null,
            subject,
            mailBody: inputBodyValue,
            mailTriggerType: 1,
            plrb_email: plrbMemberOnlyValue === true ? true : null,
        };

        try {
            const response = await axios.post(apiEndpoints.sendEmailUpdates,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.status === 200) {
                alert("Email sent successfully!");
            } else {
                alert("Failed to send email. Please try again.");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <div className="email-updates-wrap">
            <h2>Email Updates</h2>
            <form onSubmit={handleSubmit}>
                <div className="send-options">
                    <label>
                        <input
                            type="radio"
                            value="1"
                            name="send_option"
                            checked={sendOption === "1"}
                            onChange={() => setSendOption("1")}
                        />{" "}
                        Send to Test Users
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="2"
                            name="send_option"
                            checked={sendOption === "2"}
                            onChange={() => setSendOption("2")}
                        />{" "}
                        Send to All
                    </label>
                </div>
                {sendOption === "2" && (
                    <div className="email-member">
                        <label>
                            <input
                                type="checkbox"
                                checked={plrbMemberOnlyValue}
                                onChange={(e) => setPlrbMemberOnlyValue(e.target.checked)}
                            />{" "}
                            Only PLRB Member
                        </label>
                    </div>
                )}
                {sendOption === "1" && (
                    <div className="email-updates-fields">
                        <label>
                            Test User Email:
                            <input
                                type="text"
                                placeholder="admin@example.com"
                                value={testUserEmail}
                                onChange={(e) => setTestUserEmail(e.target.value)}
                            />
                        </label>
                        {errors.testUserEmail && (
                            <span className="error">{errors.testUserEmail}</span>
                        )}
                    </div>
                )}
                <div className="email-updates-fields">
                    <label>
                        Subject:
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </label>
                    {errors.subject && <span className="error">{errors.subject}</span>}
                </div>
                <div className="email-updates-fields">
                    <label>Body:</label>
                    <ReactQuill
                        value={inputBodyValue || ""}
                        onChange={setInputBodyValue}
                        theme="snow"
                        style={{
                            width: "100%",
                            height: "250px",
                            overflowY: "auto",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            background: "white",
                        }}
                        modules={modules}
                    />
                    {errors.body && <span className="error">{errors.body}</span>}
                </div>
                <input type="submit" value="Send" />
            </form>
        </div>
    );
};

export default EmailUpdates;
