"use client"
import { useEffect, useState } from "react";
import Map from "../../../component/Google_Map/Map";
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";
import axios from "axios";
import apiEndpoints from "../../../../config/apiEndpoints";
import { IoHome } from "react-icons/io5";
import Link from "next/link";

export default function MyPage() {

    const [data, setData]: [any, Function] = useState([]);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token]);

    async function fetchData(token: any) {
        try {
          const response = await axios.get(apiEndpoints.getAskCodeData, {
            headers: { Authorization: `Bearer ${token}` },
          });
    
          if (response.status === 200) {
            const updatedData = response.data.data.map((row: any) => {
                if (row?.latitude && row?.longitude) {
                  return {
                    lat: parseInt(row.latitude, 10),
                    lng: parseInt(row.longitude, 10),
                  };
                }
                return null; // or you can filter out these rows later
              }).filter(Boolean)
            setData(updatedData);
          } else {
            console.error("Error: Failed to fetch data. Status:", response.status);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

    return (
        <div>
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
                    <li className="breadcrumb-item">
                      <Link href="ask_an_expert">Code Queries</Link>
                    </li>
                  </ol>
                </div>
              </div>
            </section>
            <Map markers={data} />
        </div>
    );
}