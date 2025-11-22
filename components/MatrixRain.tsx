'use client';

import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
}

const MatrixRain = ({ className = '' }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 16;
    // Use a ref or variable to track animation state
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

      // Recalculate columns based on new width
      columns = Math.floor(width / fontSize);

      // 2. Fix "Concentrated at start": Initialize drops scattered across the whole screen
      const rows = Math.floor(height / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        // Start at a random row instead of 0 to fill screen immediately
        drops[x] = Math.floor(Math.random() * rows);
      }

      return { width, height };
    };

    // Initial setup
    let { width, height } = handleResize();

    // Watch for container size changes
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

    // 3. Random Colors: Neon Palette
    const getRandomColor = () => {
      const colors = [
        '#0F0',      // Green
        '#00FF41',   // Matrix Green
        '#008F11',   // Darker Green
        '#00FFFF',   // Cyan
        '#FF00FF',   // Magenta
        '#FFFF00',   // Yellow
        '#FFFFFF',   // White (Sparkle)
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const draw = () => {
      // Semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

        // Set a random color for every character drawn
        ctx.fillStyle = getRandomColor();

        // Render character
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
  }, []);

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