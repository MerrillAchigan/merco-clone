import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faktur } from '../utils';

gsap.registerPlugin(ScrollTrigger);

const Style = () => {
  const containerRef = useRef();
  const introRef = useRef();
  const styleTextRef = useRef();
  const videoRef = useRef();

  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false); // Added missing state

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause(); // pause on load
    }
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        pin: true,
      },
    });

    // Intro outline text "For your"
    tl.fromTo(
      introRef.current,
      { scale: 1 },
      { scale: 2, duration: 1, ease: 'power3.inOut' },
      0
    );

    // Slide + scale in "Style"
    tl.fromTo(
      styleTextRef.current,
      {
        y: 100,
        scale: 1,
      },
      {
        y: 0,
        opacity: 1,
        scale: 6,
        duration: 1.2,
        ease: 'power3.out',
      },
      0.5
    );

    // Fade in video and fade out "Style"
    tl.to(
      styleTextRef.current,
      {
        opacity: 0,
        duration: 1,
        ease: 'power3.inOut',
      },
      1.5
    );

    tl.fromTo(
      videoRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scale: 1.3,
        duration: 1.3,
        ease: 'power2.inOut',
        onStart: () => {
          videoRef.current.play();
          setIsPlaying(true); // Update state when video starts
        },
      },
      1.6
    );
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    setShowCursor(false);
  };

  const handleMouse = (e) => {
    setCursorPosition({x: e.clientX, y: e.clientY })
  }

  return (
    <section
      ref={containerRef}
      className="relative h-full w-full bg-black overflow-hidden"
    >
      <div className="sticky top-0 h-screen flex justify-center items-center">
        {/* Outline text */}
        <h1
          ref={introRef}
          className="absolute text-[28vw] text-transparent z-10 pointer-events-none"
          style={{ WebkitTextStroke: '1px white' }}
        >
          For your
        </h1>

        {/* Style text */}
        <div
          ref={styleTextRef}
          className="absolute text-[15vw] text-white leading-none z-20"
          style={{ WebkitTextStroke: '1px white' }}
        >
          Style
        </div>

        {/* Video fade-in */}
        <video
          ref={videoRef}
          src={faktur}
          muted
          playsInline
          autoPlay
          className="fixed top-0 left-0 w-full h-full object-cover z-20 opacity-0 pointer-events-auto"
          onClick={toggleVideo}
          onMouseEnter={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
          onMouseMove={handleMouse}
        />

        {/* Custom cursor */}
        {showCursor && (
          <div
            className="fixed z-10 text-white flex items-center justify-center pointer-events-none transition-transform duration-150 ease-in-out"
            style={{
              top: cursorPosition.y,
              left: cursorPosition.x,
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
              borderRadius: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(4px)',
              fontSize: '24px',
            }}
          >
            {isPlaying ? '❚❚' : '▶'}
          </div>
        )}
      </div>
    </section>
  );
};

export default Style;