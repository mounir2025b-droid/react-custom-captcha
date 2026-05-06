import React, { useState, useEffect, useRef } from "react";

export default function Captcha() {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const canvasRef = useRef(null);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    drawCaptcha(result);
  };

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background noise
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }

    // Draw text with distortions
    ctx.font = "30px Arial";
    for (let i = 0; i < text.length; i++) {
      ctx.save();
      ctx.translate(20 + i * 25, 40 + Math.random() * 20 - 10);
      ctx.rotate((Math.random() - 0.5) * 0.5);
      ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // Add lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setMessage("CAPTCHA verified successfully!");
    } else {
      setMessage("CAPTCHA verification failed. Please try again.");
      generateCaptcha();
      setUserInput("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <canvas
        ref={canvasRef}
        width="200"
        height="60"
        style={{
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          marginBottom: "10px",
        }}
      />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter the CAPTCHA text"
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Verify
        </button>
      </form>
      <p style={{ marginTop: "10px", color: message.includes("successfully") ? "green" : "red" }}>
        {message}
      </p>
      <button
        onClick={() => {
          generateCaptcha();
          setUserInput("");
          setMessage("");
        }}
        style={{
          marginTop: "10px",
          padding: "6px 12px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Refresh CAPTCHA
      </button>
    </div>
  );
}