"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import apiEndpoints from "../../../../../config/apiEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/index";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

interface UserProfileProps {
  params: {
    id: string;
  };
}

interface TableData {
  [key: string]: any;
}

const UserProfile = ({ params }: UserProfileProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params["id"];
  const [profileDetails, setProfileDetails] = useState<TableData>({});
  const [error, setError] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  console.log("checktableDatta", profileDetails);

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  async function fetchData(token: any) {
    try {
      const result = await axios.get(apiEndpoints.getUserById, {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileDetails(result.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user details. Please try again later.");
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Response error:", error.response.data);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    }
  }

  // async function fetchData(token: any) {
  //   const result = await axios.get(apiEndpoints.getUserById, {
  //     params: { id },
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   setProfileDetails(result.data.data);
  // }

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
              <li className="breadcrumb-item active"> User List</li>
              <li className="breadcrumb-item active"> User Profile</li>
            </ol>
          </div>
        </div>
      </section>
      <ul className="nav nav-tabs ">
        <li
          className="nav-item toogle_tab"
          style={{ width: "6.25em", marginLeft: "24px" }}
        >
          <a
            className={`nav-link ${activeTab === 0 ? "active" : ""}`}
            href="#"
            onClick={() => handleTabClick(0)}
            style={{ fontSize: "14px" }}
          >
            <FaUser color="#69AA46" /> <span>Profile</span>
          </a>
        </li>
      </ul>

      <div
        className="card mt-3"
        style={{
          width: "100%",
          border: "1px solid #ccc",
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          className="card"
          style={{
            width: "18rem",
            border: "1px solid #ccc",
            height: "18rem",
            margin: "40px",
            textAlign: "center",
          }}
        >
          <div className="card-body">
            <img
              src={
                profileDetails?.profile_image ||
                "https://staging.mybcme.com/assets/images/profile_image/1587136455669.png"
              }
              alt="Profile"
              style={{ height: "260px", width: "100%" }}
            />
          </div>
        </div>

        <div className="card-body">
          <div className="profile-info">
            <div className="profile-info-row">
              <span className="profile-info-name">Full Name</span>
              <span className="profile-info-value">
                {profileDetails?.fullname}
              </span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-name">User Email</span>
              <span className="profile-info-value">
                {profileDetails?.email}
              </span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-name">PLRB Member Email</span>
              <span className="profile-info-value">
                {profileDetails?.PLRBemail || ""}
              </span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-name">Phone</span>
              <span className="profile-info-value">
                {profileDetails?.phone || ""}
              </span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-name">Joined</span>
              <span className="profile-info-value">
                {profileDetails?.modified
                  ? profileDetails.modified.split(" ")[0]
                  : ""}
              </span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-name">Profession</span>
              <span className="profile-info-value">
                {profileDetails?.profession || "N/A"}
              </span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-name">Company Name</span>
              <span className="profile-info-value">
                {profileDetails?.company_name || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
