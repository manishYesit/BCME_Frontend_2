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
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
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
                href="#"
                role="button"
                onClick={handleToggle}
              >
                <i className="fas fa-bars"></i>
              </a>
            </li>
            <li className="nav-item">
              <div className="admin-menu">
                <div ref={dropdownRef}>
                  <div
                    className="user-panel mt-3 d-flex"
                    onClick={toggleDropdown}
                  >
                    <div className="image">
                      <img
                        src="/dist/img/user2-160x160.jpg"
                        className="img-circle elevation-2"
                        alt="User Image"
                      />
                    </div>
                    <div className="info" style={{ cursor: "pointer" }}>
                      <a className="d-block">Admin</a>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      position: "absolute",
                      width: "150px",
                    }}
                  >
                    {isOpen && (
                      <ul style={{ listStyle: "none", paddingLeft: "5px" }}>
                        <li
                          onClick={(e) => {
                            handleLiClick(e);
                            handleChangePassword();
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

        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              {/* <div className="image">
                <img
                  src="/dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div> */}
              <div className="info">
                <a className="d-block">BCME Admin</a>
              </div>
            </div>

            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item menu-open">
                  <Link
                    href="dashboard"
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
                    href="setting"
                    className={
                      "nav-link " +
                      (pathName == "/admin/setting" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-th"></i>
                    <p>Admin Setting</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="user_management"
                    className={
                      "nav-link " +
                      (pathName == "/admin/user_management" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-copy"></i>
                    <p>User Management</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="plrb_member_domain"
                    className={
                      "nav-link " +
                      (pathName == "/admin/plrb_member_domain" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-chart-pie"></i>
                    <p>PLRB Member Domain</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="add_profession"
                    className={
                      "nav-link " +
                      (pathName == "/admin/add_profession" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-tree"></i>
                    <p>Add Profession</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="roof_list"
                    className={
                      "nav-link " +
                      (pathName == "/admin/roof_list" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-edit"></i>
                    <p>Roof</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="stair_list"
                    className={
                      "nav-link " +
                      (pathName == "/admin/stair_list" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-table"></i>
                    <p>Stairs</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="roof_tools_list"
                    className={
                      "nav-link " +
                      (pathName == "/admin/roof_tools_list" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-table"></i>
                    <p>Roof Tools</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="stair_tools_list"
                    className={
                      "nav-link " +
                      (pathName == "/admin/stair_tools_list" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-table"></i>
                    <p>Stairs Tools</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="ask_an_expert"
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
                    href="faq_data"
                    className={
                      "nav-link " +
                      (pathName == "/admin/faq_data" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-table"></i>
                    <p>FAQ</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="clicks_track"
                    className={
                      "nav-link " +
                      (pathName == "/admin/clicks_track" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-table"></i>
                    <p>Clicks Tracking</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="contact_query"
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
                    href="payment_transaction"
                    className={
                      "nav-link " +
                      (pathName == "/admin/payment_transaction" ? "active" : "")
                    }
                  >
                    <i className="nav-icon fas fa-table"></i>
                    <p>Payment transaction</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* <div className="content-wrapper" style={{ maxHeight: "4000px" }}>{children}</div> */}
        <div className="content-wrapper">{children}</div>
        <footer className="main-footer" style={{ textAlign: "center" }}>
          <strong>
            Copyright &copy; 2024 <a href="https://adminlte.io">BCME</a>{" "}
          </strong>
          All rights reserved.
          <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 3.2.0
          </div>
        </footer>

        <aside className="control-sidebar control-sidebar-dark"></aside>
      </div>
    </>
  );
}