import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { MdDone } from "react-icons/md";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"
import axios from "axios";

interface ReusableModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  selectedDetails: { id: string; title: string; details: string } | null;
}

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
  // border: "1px solid #000",
};

const headerStyle = {
  fontWeight: 400,
  fontSize: "14px",
};

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  handleClose,
  title,
  description,
  buttonText = "Update",
  onButtonClick,
  selectedDetails,
}) => {
  const [inputTitle, setInputTitle] = useState<string | null>(null);
  const [inputInformation, setInputInformation] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const toast = useRef<Toast>(null);

  // const token = localStorage.getItem("adminToken");
  let token = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("adminToken");
  }

  useEffect(() => {
    if (open && selectedDetails) {
      setInputTitle(selectedDetails.title);
      setInputInformation(selectedDetails.details);
    }
  }, [open, selectedDetails]);

  const validateTitle = () => {
    if (!inputTitle) {
      setTitleError("Title is required.");
      return false;
    }
    setTitleError(null);
    return true;
  };

  const validateDescription = () => {
    if (!inputInformation) {
      setDescriptionError("Description is required.");
      return false;
    }
    setDescriptionError(null);
    return true;
  };

  const handleUpdate = async () => {
    if (!validateTitle() || !validateDescription()) {
      return;
    }

    // API Call
    try {
      const payload = {
        id: selectedDetails?.id,
        title: inputTitle,
        details: inputInformation,
      };

      const url = "http://3.12.198.252/api/tf_setting/updateSettings";

      const response = await axios.put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // console.log("Update Successful", response.data);
        toast.current?.show({
          severity: "success",
          detail: "Row updated successfully!",
          life: 3000,
        });
        if (onButtonClick) {
          onButtonClick();
        }
        handleClose();
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      ["link", "image", "video"],
      ["color", "background"],
      [{ script: "sub" }, { script: "super" }],
      ["code-block"],
      ["clean"],
      [{ direction: "rtl" }],
      ["maximize"],
      ["source"],
      ["spellcheck"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div
            id="modal-modal-title"
            style={{
              backgroundColor: "#307ECC",
              color: "#FFF",
              fontSize: "14px",
              lineHeight: "38px",
              padding: "5px 15px",
              marginBottom: "1px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Update</div>
            <div
              style={{ fontWeight: 600, cursor: "pointer", fontSize: "18px" }}
              onClick={handleClose}
            >
              <i className="fa-solid fa-xmark"></i>
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
                  onBlur={validateTitle}
                  style={{ width: "80%" }}
                />
                {titleError && (
                  <Typography variant="body2" color="error">
                    {titleError}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap="12px" mt={2} ml={2}>
              <Box flex={1}>
                <label style={headerStyle}>Information</label>
              </Box>
              <Box flex={3}>
                <ReactQuill
                  value={inputInformation || ""}
                  onChange={setInputInformation}
                  theme="snow"
                  placeholder="Enter Information here..."
                  onBlur={validateDescription}
                  style={{
                    width: "98%",
                    height: "300px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  modules={modules}
                />
                {descriptionError && (
                  <Typography variant="body2" color="error">
                    {descriptionError}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box ml={8}>
              <button
                type="button"
                style={{
                  backgroundColor: "#6fb3e0",
                  color: "#FFF",
                  fontWeight: 500,
                  padding: "8px 0px",
                  cursor: "pointer",
                  border: "none",
                  width: "18%",
                  marginLeft: "126px",
                  marginTop: "5px",
                }}
                onClick={handleUpdate}
              >
                <MdDone size={20} /> Update
              </button>
            </Box>
          </Box>

          {/* Update Button */}
          <div>
            <button
              type="button"
              style={{
                backgroundColor: "#D15B47",
                color: "white",
                fontWeight: 500,
                height: "40px",
                cursor: "pointer",
                border: "none",
                width: "14%",
                borderColor: "D15B47",
                margin: "5px",
              }}
              onClick={handleClose}
            >
              <span>X</span> Close
            </button>
          </div>
        </Box>
      </Modal>
      <Toast ref={toast} />
    </>
  );
};

export default ReusableModal;
