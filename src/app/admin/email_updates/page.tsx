"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import apiEndpoints from "../../../../config/apiEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "../../../component/Modals/AdminSettingModal";
import { IoHome } from "react-icons/io5";

export default function Settings() {


    return (
        <>
         <h1> Email Updates</h1>
        </>
    );
}