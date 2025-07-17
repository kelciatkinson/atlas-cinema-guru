"use client";

import Button from "./Button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import "@/styles/Header/styles.css";

export default function Header() {
  const { data: session } = useSession();

  const userEmail = session?.user?.email || "Guest";

  return (
    <div className="container-header">
      <div className="app-title">
        <svg
          width="39"
          height="39"
          viewBox="0 0 39 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.375 6.5V32.5M27.625 6.5V32.5M4.875 13H11.375M27.625 13H34.125M4.875 19.5H34.125M4.875 26H11.375M27.625 26H34.125M6.5 32.5H32.5C33.3975 32.5 34.125 31.7725 34.125 30.875V8.125C34.125 7.22754 33.3975 6.5 32.5 6.5H6.5C5.60254 6.5 4.875 7.22754 4.875 8.125V30.875C4.875 31.7725 5.60254 32.5 6.5 32.5Z"
            stroke="#00003c"
            strokeWidth="2"
          />
        </svg>
        <p>Cinema Guru</p>
      </div>
      <div className="container-header-user">
        <p>Welcome, {userEmail}</p>
        <Button className="button-header" onClick={() => signOut()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
              stroke="#00003c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 17L21 12L16 7"
              stroke="#00003c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12H9"
              stroke="#00003c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
