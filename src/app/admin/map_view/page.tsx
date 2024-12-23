"use client"
import { useEffect, useState } from "react";
import Map from "../../../component/Google_Map/Map";
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";
import axios from "axios";
import apiEndpoints from "../../../../config/apiEndpoints";

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
            <h1>My Page</h1>
            <Map markers={data} />
        </div>
    );
}