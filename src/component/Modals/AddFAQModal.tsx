import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Modal from "react-modal";
import Button from '@mui/material/Button';
import styles from "../styles/ModalComponent.module.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

// Bind modal to the root of the app
Modal.setAppElement("body");

interface Field {
    name: string;
    label: string;
    type?: string; // Optional: Default to "text"
}

// Define the props for ModalComponent
interface ModalComponentProps {
    fields: Field[];
    apiUrl: string;
    token:any;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ fields, apiUrl, token }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>(() => {
        const initialState: Record<string, string> = {};
        fields.forEach((field) => {
            initialState[field.name] = "";
        });
        return initialState;
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
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
        closeModal();
    };

    const handleReset = () => {
        const resetState: Record<string, string> = {};
        fields.forEach((field) => {
            resetState[field.name] = "";
        });
        setFormData(resetState);
    };

    return (
        <div>
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
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Custom Modal"
                className={styles.customModal}
                overlayClassName={styles.customOverlay}
            >
                <h2 className={styles.modalTitle}>Form Modal</h2>
            </Modal>
        </div>
    );
};


export default ModalComponent;