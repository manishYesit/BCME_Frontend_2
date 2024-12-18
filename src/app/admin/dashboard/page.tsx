'use client';
import axios from 'axios';
import apiEndpoints from '../../../../config/apiEndpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import { useState, useEffect } from 'react';


export default function Home() {

  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData]: [any, Function] = useState([]);

  
  useEffect(() => {
    if(token){
      fetchData(token);
    }
    
  }, [token]);

  async function fetchData(token:any) {
    const totalUsers = await axios.get(apiEndpoints.getAllUsers, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const totalDomains = await axios.get(apiEndpoints.getAllDomains, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const totalRoofList = await axios.get(apiEndpoints.getRoofData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const totalStairList = await axios.get(apiEndpoints.getStairData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData({
      userCount: totalUsers.data.data.length,
      domainCount: totalDomains.data.data.length,
      roofListCount: totalRoofList.data.data.length,
      stairListCount: totalStairList.data.data.length
    });
  }

  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                {data.userCount ? (
                    <h3> {data.userCount}</h3>
                  ) : (
                    <p>Loading...</p>
                  )}

                  <p>Total User</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"></i>
                </div>
                <a href="user_management" className="small-box-footer">View Details<i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                {data.userCount ? (
                    <h3> {data.domainCount}</h3>
                  ) : (
                    <p>Loading...</p>
                  )}

                  <p>PLRB Member Domain</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"></i>
                </div>
                <a href="plrb_member_domain" className="small-box-footer">View Details<i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                {data.userCount ? (
                    <h3> {data.roofListCount}</h3>
                  ) : (
                    <p>Loading...</p>
                  )}

                  <p>Roof Data</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"></i>
                </div>
                <a href="roof_list" className="small-box-footer">View Details<i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                {data.userCount ? (
                    <h3> {data.stairListCount}</h3>
                  ) : (
                    <p>Loading...</p>
                  )}

                  <p>Stairs Data</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"></i>
                </div>
                <a href="stair_list" className="small-box-footer">View Details<i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>2493</h3>

                  <p>ASK Queries</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"></i>
                </div>
                <a href="#" className="small-box-footer">View Details<i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
