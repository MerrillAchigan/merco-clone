import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faktur } from '../utils';

gsap.registerPlugin(ScrollTrigger);

const Style = () => {
  const containerRef = useRef();
  const styleTextRef = useRef();
  const wrapperRef = useRef();
  const videoRef = useRef();
  const introRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);

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

    // Scale intro text
    tl.to(introRef.current, {
      scale: 2,
      ease: 'power2.inOut',
    });

    // Fade out and scale up "Style" text
    tl.to(styleTextRef.current, {
      scale: 6,
      opacity: 0,
      y: -40,
      ease: 'power2.inOut',
    }, '<'); // sync with previous

    // Bring in the video full screen
    tl.fromTo(
      videoRef.current,
      {
        scale: 1.2,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        ease: 'power2.inOut',
        onStart: () => {
          videoRef.current.play();
        },
      },
      '<+0.2' // slight delay for smoothness
    );
  }, []);


  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] w-full bg-black overflow-hidden flex justify-center items-center"
    >
      {/* Background outline text */}
      <h1
        ref={introRef}
        className="absolute text-[28vw] text-transparent z-10 pointer-events-none"
        style={{
          WebkitTextStroke: '1px white',
        }}
      >
        For your
      </h1>

      {/* Style text and video */}
      <div
        ref={wrapperRef}
        className="relative z-20 w-fit h-fit flex justify-center items-center"
      >
        <div
          ref={styleTextRef}
          className="absolute text-[15vw] text-white leading-none pointer-events-none"
          style={{
            WebkitTextStroke: '1px white',
          }}
        >
          Style
        </div>

        {/* Fullscreen video appears */}
        <video
          ref={videoRef}
          src={faktur}
          muted
          autoPlay
          loop
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-40"
        />

      </div>

      {/*Now the cards */}
      
    </section>
  );
};

export default Style;
