"use client"
import type { Metadata } from "next";
import { Provider } from 'react-redux';
import { store } from '../store/index';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../public/dist/css/adminlte.min.css";
import "../../public/dist/css/style.css";
import { useEffect } from "react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
      <body className="hold-transition sidebar-mini">
        {children}
      </body>
    </html>
    </Provider>
  );
}
