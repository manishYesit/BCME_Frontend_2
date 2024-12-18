// "use client";
// import styles from '../../../../public/dist/css/ChangePassword.module.css';
// import { useState } from "react";

// export default function ChangePassword() {
//     const [formData, setFormData] = useState({
//         oldPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });

//       const handleChange = (e:any) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: value,
//         }));
//       };
//     const handleSubmit = (e: any) => {
//         e.preventDefault();
//         // Handle form submission
//     };

//     return (
//         <>
//             <div className={styles.container}>
//                 <h1 className={styles.heading}>Change Password</h1>
//                 <form className={styles.form} onSubmit={handleSubmit}>
//                     <div className={styles.formGroup}>
//                         <label htmlFor="oldPassword" className={styles.label}>Old Password</label>
//                         <input onChange={handleChange} type="password" id="oldPassword" name="oldPassword" className={styles.input} required />
//                     </div>

//                     <div className={styles.formGroup}>
//                         <label htmlFor="newPassword" className={styles.label}>New Password</label>
//                         <input onChange={handleChange} type="password" id="newPassword" name="newPassword" className={styles.input} required />
//                     </div>

//                     <div className={styles.formGroup}>
//                         <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
//                         <input onChange={handleChange} type="password" id="confirmPassword" name="confirmPassword" className={styles.input} required />
//                     </div>

//                     <div className={styles.buttonContainer}>
//                         <button type="submit" className={styles.saveButton}>
//                             Save
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }

"use client";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../../../public/dist/css/ChangePassword.module.css";
import apiEndpoints from "../../../../config/apiEndpoints";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { useSelector } from "react-redux";
import axios from "axios";

// Validation schema using Yup
const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle show password functionality
  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case "oldPassword":
        setShowOldPassword((prev) => !prev);
        break;
      case "newPassword":
        setShowNewPassword((prev) => !prev);
        break;
      case "confirmPassword":
        setShowConfirmPassword((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const changePassword = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    // Assuming `token` is available in your component or context
    const body = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    try {
      // Use axios for POST request, passing `body` in `data` property
      const response = await axios.post(apiEndpoints.changePassword, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token as authorization
        },
      });

      // Check if response is successful
      if (response.status !== 200) {
        throw new Error("Failed to change password");
      }

      // Handle the response data from the API
      console.log("Password changed successfully:", response.data);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Change Password</h1>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={changePassword}

        // changePassword("Form submitted", values);
        // Handle form submission logic here
        // }}
      >
        {({ setFieldValue, values }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="oldPassword" className={styles.label}>
                Old Password
              </label>
              <div className="passwordContainer">
                <Field
                  type={showOldPassword ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  className={styles.input}
                />
                <button
                  id="passwordIcon"
                  type="button"
                  onClick={() => togglePasswordVisibility("oldPassword")}
                  className={styles.toggleButton}
                >
                  {showOldPassword ? <CiUnlock /> : <CiLock />}
                </button>
              </div>
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="error"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPassword" className={styles.label}>
                New Password
              </label>
              <div className={styles.passwordContainer}>
                <Field
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  className={styles.input}
                />
                <button
                  id="passwordIcon"
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className={styles.toggleButton}
                >
                  {showNewPassword ? <CiUnlock /> : <CiLock />}
                </button>
              </div>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="error"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <div className="passwordContainer">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.input}
                />
                <button
                  type="button"
                  id="passwordIcon"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className={styles.toggleButton}
                >
                  {showConfirmPassword ? <CiUnlock /> : <CiLock />}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>

            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
