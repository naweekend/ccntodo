'use client';

import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
  color?: string; // Added color prop back for manual overrides
}

const MatrixRain = ({ className = '', color }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];

    // Helper to calculate size and reset
    const handleResize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // 1. Fix Blurriness: Set canvas internal resolution to match device pixel ratio
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Scale drawing context so we can still work with CSS pixel units
      ctx.scale(dpr, dpr);

      columns = Math.floor(width / fontSize);

      // 2. Fix "Concentrated at start": Initialize drops scattered across the whole screen
      const rows = Math.floor(height / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.floor(Math.random() * rows);
      }

      return { width, height };
    };

    let { width, height } = handleResize();

    const resizeObserver = new ResizeObserver(() => {
      const dims = handleResize();
      width = dims.width;
      height = dims.height;
    });
    resizeObserver.observe(container);

    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    // 3. One Random Color Per Session
    const neonColors = [
      '#0F0',      // Green
      '#00FF41',   // Matrix Green
      '#008F11',   // Darker Green
      '#00FFFF',   // Cyan
      '#FF00FF',   // Magenta
      '#FFFF00',   // Yellow
      '#FFFFFF',   // White
    ];

    // If a specific color is passed via props, use it. 
    // Otherwise, pick ONE random color when the component loads.
    const rainColor = color || neonColors[Math.floor(Math.random() * neonColors.length)];

    const draw = () => {
      // Semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = rainColor; // Use the single selected color
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it has crossed screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, [color]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-black ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default MatrixRain;