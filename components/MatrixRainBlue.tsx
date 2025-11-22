"use client";

import React, { useEffect, useRef } from "react";

interface MatrixRainProps {
  className?: string;
}

const MatrixRainBlue = ({ className = "" }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to full screen and set internal resolution using DPR for quality
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      return { width, height };
    };

    let { width, height } = resizeCanvas();

    const fontSize = 20;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * (height / fontSize))
    );

    // Japanese Katakana + Latin + numbers
    const katakana =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    // 3 shades of blue
    const blueShades = ["#4DA3FF", "#1E7CEB", "#6CC6FF"];

    const draw = () => {
      // Trail effect
      ctx.fillStyle = "rgba(0, 0, 20, 0.10)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Alternate between the 3 blue shades
        ctx.fillStyle = blueShades[i % blueShades.length];

        // Optional bright highlight on some characters at the tip
        if (Math.random() > 0.92) {
          ctx.fillStyle = "#A7D8FF";
        }

        const char = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop toward the top randomly when off screen
        if (drops[i] * fontSize > height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);

    window.addEventListener("resize", () => {
      const dims = resizeCanvas();
      width = dims.width;
      height = dims.height;
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className={`absolute inset-0 w-screen h-screen overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
};

export default MatrixRainBlue;
