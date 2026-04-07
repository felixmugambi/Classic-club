"use client";

import { Suspense } from "react";
import LoginPage from "./LoginPage";
import Loader from "../../../components/common/Loader";

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}