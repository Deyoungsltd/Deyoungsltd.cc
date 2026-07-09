"use client";

import React, { useState, useEffect } from "react";

interface CarouselProps {
  slides: { id: number; imageUrl: string; title: string }[];
}

export default function DynamicCarousel({ slides }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (slides.length === 0) return;
    const frameTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(frameTimer);
  }, [slides.length]);

  if (!mounted || slides.length === 0) return <div className="w-full h-96 bg-slate-100 animate-pulse rounded-lg" />;

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg bg-slate-900 shadow-inner">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={bsolute inset-0 transition-opacity duration-1000 ease-in-out }
        >
          {slide.imageUrl && (
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover mix-blend-overlay opacity-80"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 to-transparent text-white">
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-300 mb-1">Featured Entry</p>
            <h3 className="text-xl font-bold tracking-tight">{slide.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
