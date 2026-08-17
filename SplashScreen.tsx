"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const horseSound = new Audio("/horse.wav");
    horseSound.volume = 0.8;

    horseSound.play().catch(() => {
      // Some browsers may block automatic audio playback.
    });

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => {
      clearTimeout(timer);
      horseSound.pause();
    };
  }, []);

  if (!showSplash) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <img
        src="/splash-logo.png"
        alt="Galeforcewinds"
        style={{
          width: "280px",
          maxWidth: "75vw",
          height: "auto",
        }}
      />
    </div>
  );
}
