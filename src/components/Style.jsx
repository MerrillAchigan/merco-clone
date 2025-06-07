import React, { useRef, useState } from 'react';
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
  const clippedRef = useRef();

  const [isPlaying, setIsPlaying ] = useState(true);
  

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

    // Scale up the text and video together
    tl.fromTo(
      [styleTextRef.current, videoRef.current],
      { scale: 1 , opacity: 1, y:0},
      {
        opacity: 0,
        y:20,
        scale: 6,
        ease: 'power2.inOut',
        transformOrigin: 'center',
      },
      0 // start at beginning of timeline
    );
    tl.fromTo(
      [wrapperRef.current, videoRef.current],
      {scale:1}, 
      {
        scale: 6,
        transformOrigin: 'center',
        ease: 'power2.inOut'
      },
      0
    );
    tl.fromTo(
      [clippedRef.current, videoRef.current],
      { scale: 2, opacity:0 },
      {
        opacity:1,
        scale: 6,
        ease: 'power2.inOut',
        transformOrigin: 'center',
      },
      0 // or adjust timing if needed
    );
  }
  , []);   

  const toggleVideo = () => {
    if()
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] w-full bg-black overflow-hidden flex justify-center items-center"
    >
      {/* Background outline text */}
      <h1
        className="absolute text-[28vw]  text-transparent z-10 pointer-events-none"
        style={{
          WebkitTextStroke: '1px white',
        }}
      >
        For your
      </h1>

      {/* Main content with video masked by text */}
            <div
        ref={wrapperRef} // 👈 new wrapper
        className="relative z-20 w-fit h-fit flex justify-center items-center">
        {/* Text only shown for accessibility or fallback */}
        <div
          ref={styleTextRef}
          className="absolute text-[15vw] text-white leading-none pointer-events-none"
          style={{
            color: 'white',
            WebkitTextStroke: '1px white',
          }}
        >
          Style
        </div>

        {/* Video masked by text */}
        <div
          className="w-full h-full"
          ref={clippedRef}
          style={{
            maskImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'15vw\' font-weight=\'800\' font-family=\'Newsreader\'>Style</text></svg>")',
            WebkitMaskImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'15vw\' font-weight=\'800\' font-family=\'Newsreader\'>Style</text></svg>")',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            WebkitMaskPosition: 'center',
          }}
        >
          <video
            ref={videoRef}
            src={faktur}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Style;