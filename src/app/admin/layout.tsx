"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/reducers/sidebarSlice";
import { RootState } from "@/store";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { clearToken, setToken } from "@/store/reducers/authSlice";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathName = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("adminToken");
    router.push(`/`);
  };

  const handleChangePassword = async () => {
    try {
      router.push("/admin/change_password");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleLiClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation(); // Prevent dropdown from closing
  };

  const isCollapsed = useSelector(
    (state: RootState) => state.sidebar.collapsed
  );

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      dispatch(setToken(token));
    } else {
      router.push(`/`);
    }
    if (isCollapsed) {
      document.body.classList.add("sidebar-collapse");
    } else {
      document.body.classList.remove("sidebar-collapse");
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCollapsed]);
  return (
    <>
      <div className="wrapper">
        <nav className="main-header navbar navbar-expand navbar-white navbar-light nav-wrap">
          <ul
            className="navbar-nav"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="javascript:void(0);"
                role="button"
                onClick={handleToggle}
              >
                <i className="fas fa-bars"></i>
              </a>
            </li>
            <li className="nav-item">
              <div className="admin-menu" onClick={toggleDropdown}>
                <div ref={dropdownRef}>
                  <div className="user-panel d-flex">
                    <div className="image">
                      <img
                        src="/dist/img/user2-160x160.jpg"
                        className="img-circle"
                        alt="User Image"
                      />
                    </div>
                    <div className="info" style={{ cursor: "pointer" }}>
                      <a className="d-block">Admin <i className="fa-solid fa-caret-down"></i></a>
                    </div>
                  </div>
                  <div className="admin-menu-dropdown">
                    {isOpen && (
                      <ul>
                        <li
                          onClick={(e) => {
                            handleLiClick(e);
                            handleChangePassword();
                            setIsOpen(prev => !prev);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className="fas fa-lock"
                            style={{ marginRight: "8px" }}
                          ></i>
                          <a>Change Password</a>
                        </li>
                        <li
                          onClick={(e) => {
                            handleLiClick(e);
                            handleLogout();
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className="fas fa-sign-out-alt"
                            style={{ marginRight: "8px" }}
                          ></i>
                          <a>Logout</a>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* <button className="float-right logout-button" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button> */}
            </li>
          </ul>
        </nav>

        <aside className="main-sidebar sidebar-dark-primary elevation-4 sidebar-wrap">
          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                {/* <img
                  src="/dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                /> */}
                <i className="fa-solid fa-building"></i>
              </div>
              <div className="info">
                <a>BCme Admin</a>
              </div>
            </div>

            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column sidebar-hover-wrap"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item dashboard">
                  <Link
                    href="/admin/dashboard"
                    className={
                      "nav-link " +
                      (pathName == "/admin/dashboard" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/setting"
                    className={
                      "nav-link " +
                      (pathName == "/admin/setting" ? "active" : "")
                    }
                  >
                    <i className="fa-solid fa-users"></i>
                    <p>Admin Setting</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/user_management"
                    className={
                      "nav-link " +
                      (pathName == "/admin/user_management" ? "active" : "")
                    }
                  >
                    <i className="fa-solid fa-users"></i>
                    <p>User Management</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/plrb_member_domain"
                    className={
                      "nav-link " +
                      (pathName == "/admin/plrb_member_domain" ? "active" : "")
                    }
                  >
                    <i className="fa-solid fa-users"></i>
                    <p>PLRB Member Domain</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/add_profession"
                    className={
                      "nav-link " +
                      (pathName == "/admin/add_profession" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fa-solid fa-user-tie"></i>
                    <p>Add Profession</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/roof_list"
                    className={
                      "nav-link " +
                      ((pathName.startsWith("/admin/roof_list") || pathName === "/admin/roof_set_image") ? "active" : "")
                    }
                  >
                    <i className="nav-icon fa-solid fa-people-roof"></i>
                    <p>Roof</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/stair_list"
                    className={
                      "nav-link " +
                      ((pathName.startsWith("/admin/stair_list") || pathName === "/admin/stair_set_image") ? "active" : "")
                    }
                  >
                    <i className="nav-icon fa-solid fa-stairs"></i>
                    <p>Stairs</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/roof_tools_list"
                    className={
                      "nav-link " +
                      (pathName == "/admin/roof_tools_list" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fa-solid fa-screwdriver-wrench"></i>
                    <p>Roof Tools</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/stair_tools_list"
                    className={
                      "nav-link " +
                      (pathName == "/admin/stair_tools_list" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fa-solid fa-screwdriver-wrench"></i>
                    <p>Stairs Tools</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/ask_an_expert"
                    className={
                      "nav-link " +
                      (pathName == "/admin/ask_an_expert" ? "active" : "")
                    }
                  >
                    <i className="menu-icon fa fa-list"></i>
                    <p>Ask an Expert</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/faq_data"
                    className={
                      "nav-link " +
                      (pathName.startsWith("/admin/faq_data") ? "active" : "")
                    }
                  >
                    <i className="nav-icon fa-solid fa-circle-question"></i>
                    <p>FAQ</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/clicks_track"
                    className={
                      "nav-link " +
                      (pathName == "/admin/clicks_track" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fa-solid fa-computer-mouse"></i>
                    <p>Clicks Tracking</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/contact_query"
                    className={
                      "nav-link " +
                      (pathName == "/admin/contact_query" ? "active" : "")
                    }
                  >
                    <i className="menu-icon fa fa-question-circle"></i>
                    <p>Contact Query</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/payment_transaction"
                    className={
                      "nav-link " +
                      (pathName == "/admin/payment_transaction" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fa-solid fa-dollar-sign"></i>
                    <p>Payment transaction</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/admin/email_updates"
                    className={
                      "nav-link " +
                      (pathName == "/admin/email_updates" ? "active" : "")
                    }
                  >
                    <i className="fa-solid fa-envelope"></i>
                    <p>eMail Updates</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* <div className="content-wrapper" style={{ maxHeight: "4000px" }}>{children}</div> */}
        <div className="content-wrapper">{children}</div>
        <footer className="main-footer footer-wrap" style={{ textAlign: "center" }}>
          Copyright &copy; 2024 <a href="https://adminlte.io">BCME</a> All rights reserved.
          {/* <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 3.2.0
          </div> */}
        </footer>

        <aside className="control-sidebar control-sidebar-dark"></aside>
      </div>
    </>
  );
}
