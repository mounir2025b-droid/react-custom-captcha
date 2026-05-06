import React from "react";
import Captcha from "./Captcha";
export default function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Custom CAPTCHA (No API)</h1>
      <Captcha />
    </div>
  );
}