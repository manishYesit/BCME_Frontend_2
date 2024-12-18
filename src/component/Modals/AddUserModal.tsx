import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import Modal from "react-modal";
import { Box, Modal } from "@mui/material";
// import Button from '@mui/material/Button';
import axios from "axios";
import styles from "../styles/ModalComponent.module.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Bind modal to the root of the app
// Modal.setAppElement("body");

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface Field {
    name: string;
    label: string;
    type?: string; // Optional: Default to "text"
}

// Define the props for AddUserModal
interface AddUserModalProps {
    fields: Field[];
    apiUrl: string;
    token: any;
    title: any;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ fields, apiUrl, token, title }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>(() => {
        const initialState: Record<string, string> = {};
        fields.forEach((field) => {
            initialState[field.name] = "";
        });
        return initialState;
    });

    const [checkboxData, setCheckboxData] = useState({
        checkbox1: false,
        checkbox2: false,
    });

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // const handleSubmit = (e: FormEvent) => {
    //     e.preventDefault();
    //     console.log("Form Submitted:", formData);
    //     closeModal();
    // };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {

            const payload = {
                ...formData
            };
            console.log("Submitting payload:", payload);

            // Call API (replace with actual API URL and logic)
            const result = await axios.post(apiUrl, payload, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            })
            console.log("API Response:", result);

            // Show success toast
            toast.success(result.data.message || "Form submitted successfully!");
            const resetState: Record<string, string> = {};
            fields.forEach((field) => {
                resetState[field.name] = "";
            });
            setFormData(resetState);
            closeModal();
        } catch (error) {
            console.error("Error submitting form:", error);
            // Show error toast
            toast.error("Error submitting form!");
        }
    };

    const handleReset = () => {
        const resetState: Record<string, string> = {};
        fields.forEach((field) => {
            resetState[field.name] = "";
        });
        setFormData(resetState);
    };

    return (
        <div className={styles.modalContainer}>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <button className={styles.openButton} onClick={openModal}>
                Add
            </button>
            <Modal
                open={modalIsOpen}
                onClose={closeModal}
            >
                <Box sx={style}>
                <h2 className={styles.modalTitle}>{title}</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {fields.map((field, index) => (
                        <div key={index} className={styles.formField}>
                            <label>{field.label}:</label>
                            <input
                                type={field.type || "text"}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    ))}
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className={styles.resetButton}
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className={styles.closeButton}
                        >
                            Close
                        </button>
                    </div>
                </form>
                </Box>
            </Modal>
        </div>
    );
};


export default AddUserModal;