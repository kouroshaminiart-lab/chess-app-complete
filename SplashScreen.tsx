"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(timer);
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
          maxWidth: "75%",
          height: "auto",
        }}
      />
    </div>
  );
}
