import React, { useEffect, useRef, useState } from "react";

const generateCaptcha = (length = 6) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export default function Captcha() {
  const canvasRef = useRef(null);
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";

    for (let i = 0; i < text.length; i++) {
      const x = 20 + i * 25;
      const y = 30 + Math.random() * 10;
      ctx.fillText(text[i], x, y);
    }

    // Noise lines
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 200, Math.random() * 50);
      ctx.lineTo(Math.random() * 200, Math.random() * 50);
      ctx.stroke();
    }
  };

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    drawCaptcha(newCaptcha);
    setInput("");
    setResult(null);
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const verify = () => {
    if (input === captcha) {
      setResult("success");
    } else {
      setResult("fail");
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={200} height={50} />
      <br /><br />

      <input
        type="text"
        placeholder="Enter captcha"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br /><br />

      <button onClick={verify}>Verify</button>
      <button onClick={refreshCaptcha} style={{ marginLeft: "10px" }}>
        Refresh
      </button>

      <br /><br />

      {result === "success" && <p style={{ color: "green" }}>✅ Correct</p>}
      {result === "fail" && <p style={{ color: "red" }}>❌ Wrong</p>}
    </div>
  );
}