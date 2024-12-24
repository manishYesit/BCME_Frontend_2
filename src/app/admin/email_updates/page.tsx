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

export default function emailUpdates() {



    return (
        <>
            <div className="email-updates-wrap">
                <h2>eMail Updates</h2>
                <form action="">
                    <div className="send-options">
                        <label> <input type="radio" checked value="1" name="send_option" /> Send to Test users </label>
                        <label> <input type="radio" value="2" name="send_option" /> Send to All </label>
                    </div>
                    <div className="email-member">
                        <label> <input type="checkbox" /> Only PLRB Member </label>
                    </div>
                    <div className="email-updates-fields">
                        <label>Test User Email:</label>
                        <input type="text" placeholder="admin@example.com" />
                    </div>
                    <div className="email-updates-fields">
                        <label>Subject:</label>
                        <input type="text" />
                    </div>
                    <div className="email-updates-fields">
                        <label>Body:</label>
                        <textarea></textarea>
                    </div>
                    <input type="submit" value="Send" />
                </form>
            </div>
        </>
    );
}