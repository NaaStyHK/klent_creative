"use client";

import { useState } from "react";
import Image from "next/image";

export default function Loader() {
  const [gone, setGone] = useState(false);

  if (gone) return null;

  return (
    <div
      className="loader-overlay"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, #1e3038 0%, #1a2830 50%, #15222b 100%)",
      }}
      onAnimationEnd={(e) => {
        if (e.animationName === "loader-exit") setGone(true);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Logo */}
        <div className="loader-logo-wrap">
          <Image
            src="/logo.svg"
            alt="Klent Creative"
            width={160}
            height={60}
            priority
          />
        </div>

        {/* Barre de progression */}
        <div className="loader-bar-track">
          <div className="loader-bar-fill" />
        </div>
      </div>
    </div>
  );
}
