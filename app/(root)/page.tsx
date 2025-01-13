"use client";

import { redirect } from "next/navigation";
import React from "react";

function page() {
  return (
    <div>
      <button onClick={() => redirect("/sign-in")}>Sign In</button>
      <button onClick={() => redirect("/sign-up")}>Sign Up</button>
    </div>
  );
}

export default page;
