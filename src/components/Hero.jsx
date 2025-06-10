import React, { useRef } from 'react';
import { heroVideo } from '../utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const containerRef = useRef();
  const centerTextRef = useRef();
  const overlayRef =useRef();
  const subRef = useRef()
  const videoRef = useRef();
//   const secOverlayRef = useRef();

  const [isPlaying, setIsPlaying] = useState(true);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useGSAP(() => {
    
    const words = centerTextRef.current.querySelectorAll('span');
    gsap.to(words, {
      opacity: 1,
      y: -10,
      yoyo: true,
      delay: 1,
      duration: 0.5, 
      stagger: {
        each: 0.2, // Delay between each word 
        ease: 'power2.inOut',
        from: 'start', 
      },
    });
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: true,
            pin: true,
            yoyo:true
        },
    });
    tl.to(videoRef.current, {
        scale: 1.3,
        duration:1.3,
        ease: 'none',

    },0)
        .to(overlayRef.current, {
            opacity: 0,
            scale:1.3,
            duration: 0.3,
            ease: 'power3.out',
        },0)
        .to(centerTextRef.current, {
            y:-50,
            scale:2,
            opacity:0,
            delay: 1,
            duration: 1,
            ease: 'power3.in'
            
        },0.3)
        .to(subRef.current, {
            y:-20,
            opacity:1,
            duration: 1,
            ease: 'power3.inOut',
        },0.8)

  }, []);

  // Split the text into words and map to span elements
  const text = "Because it's Mercedes-Benz.";
  const wordsArray = text.split(' ').map((word, index) => (
    <span key={index} className="inline-block opacity-0 translate-y-10">
      {word}&nbsp;
    </span>
  ));

  const toggleVideo = () => {
    if(!videoRef.current) return;

    if(videoRef.current.paused){
        videoRef.current.play();
        setIsPlaying(true);
    } else {
        videoRef.current.pause();
        setIsPlaying(false);
    }
  }

  const handleMouse = (e) => {
    setCursorPosition({x: e.clientX, y: e.clientY })
  }

  return (
    <section ref={containerRef} className="mt-10 w-full h-[calc(100vh-60px)] relative flex justify-center items-center">
      <div className="lg:w-10/12 sm:w-full sm:object-fill sm:h-100vh text-center relative"
      onMouseEnter={() => setShowCursor(true)}
      onMouseLeave={() => setShowCursor(false)}
      onMouseMove={handleMouse}
      >
        <video
          ref={videoRef}
          src={heroVideo}
          className="pointer-events-auto object-cover w-full mt-4"
          autoPlay
          muted
          playsInline
          onClick={toggleVideo}
        />
         {showCursor && (
          <div
            className="fixed z-50 text-white flex items-center justify-center pointer-events-none transition-transform duration-150 ease-in-out"
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
        <div
            ref={overlayRef}
            className="absolute inset-0 bg-black opacity-60 pointer-events-none"
        ></div>
        <p
          ref={centerTextRef}
          className="text-white text-4xl lg:text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2"
        >
          {wordsArray}
        </p>
        {/* <div ref={secOverlayRef} className="mt-2 h-[100px] w-full bg-black opacity-0"></div> */}
        <div
            ref={subRef}
            className="absolute bottom-20 w-full text-center z-10 opacity-0"
        >
            
        <p className="text-white text-xl md:text-2xl">
          The reason why we always go the extra mile.
        </p>
      </div>
      </div>
    </section>
  );
};

export default Hero;