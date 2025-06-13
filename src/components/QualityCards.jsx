import React, { useRef } from 'react';
import { style2, style4, style3 } from '../utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

const QualityCards = () => {
  gsap.registerPlugin(ScrollTrigger);

  const firstTextRef = useRef();
  const containerRef = useRef();
  const firstCardRef = useRef();
  const secondCardRef = useRef();
  const thirdCardRef = useRef();

  const text = 'Making every vehicle worthy of the star.';
  const splitText = text.split(' ').map((word, index) => (
    <span key={index} className='inline-block opacity-0'>
      {word}&nbsp;
    </span>
  ));
  
  useGSAP(() => {
    // Set initial states for all elements
    const words = firstTextRef.current.querySelectorAll('span');
    gsap.set(words, { opacity: 0 });
    gsap.set([firstCardRef.current, secondCardRef.current, thirdCardRef.current], {
      opacity: 0,
      y: 10,
    });
  
    // Animation timeline that only plays forward
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'center center', // Adjust this based on when you want animation to complete
        scrub: 1,
        onComplete: () => {
          // Ensure elements stay visible after animation completes
          gsap.set([firstCardRef.current, secondCardRef.current, thirdCardRef.current], {
            opacity: 1,
            y: 0,
          });
          gsap.set(words, { opacity: 1 });
        }
      },
    });
  
    // Only animate IN - no reverse animations
    tl.to(words, {
      opacity: 1,
      duration: 0.3,
      stagger: {
        each: 0.04,
        ease: 'power2.inOut',
        from: 'start',
      },
    }, 0)
    .to(firstCardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.3)
    .to(secondCardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.8)
    .to(thirdCardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 1.3);
  
    // Separate trigger for when scrolling back up (reverse animation)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'top center',
      onEnterBack: () => {
        // Reset to initial state when coming back from below
        gsap.set([firstCardRef.current, secondCardRef.current, thirdCardRef.current], {
          opacity: 0,
          y: 10,
        });
        gsap.set(words, { opacity: 0 });
      }
    });
  
  }, []);

  return (
    <section className='py-50 h-full max-w-[calc(100vw-40px)] flex flex-col relative'>
      <div ref={containerRef} className='text-white'>
        <div className='flex'>
          <div className='flex-col  ml-20 items-start'>
            <h2
              ref={firstTextRef}
              className='text-4xl lg:text-7xl mt-20 w-[700px]'
            >
              {splitText}
            </h2>
            <div ref={secondCardRef} className='mt-50 flex flex-col'>
              <img src={style2} alt="" className='w-[40vw]' />
              <h3 className='text-4xl lg:text-5xl py-5 mt-5'>Travelling to the moon and back. Six times.</h3>
              <p className='text-2xl mb-70 regular-text'>
              To ensure their longevity, our vehicles undergo testing across the toughest of terrains – from Arctic tundra to scorching desert – covering up to nearly five million kilometres of testing. That’s the distance to the moon and back, six times over.
              </p>
            </div>
          </div>
          <div className='flex flex-col mr-10 items-start'>
            <div ref={firstCardRef} className='ml-50'>
              <img src={style3} alt="" className='w-[40vw]' />
              <h3 className='text-4xl lg:text-5xl py-5 mt-5'>Prepared for earth and wind and ice and fire.</h3>
              <p className='text-2xl mb-40 regular-text'>
              Our trailblazing test centre in Sindelfingen is home to two climate tunnels: one for simulating heavy rain, hurricane force winds, snowstorms and deep freezes of –40 degrees Celsius; and one for more tropical conditions, including highs of +60 degrees Celsius and road surface temperatures up to +70 degrees Celsius.
              </p>
            </div>

            <div ref={thirdCardRef} className='ml-50 mt-40'>
              <img src={style4} alt="" className='w-[40vw]' />
              <h3 className='text-3xl lg:text-4xl py-5 mt-5'>Sunny disposition.</h3>
              <p className='text-2xl mb-70 regular-text'>
              To test the durability of our materials in the brightest sunlight, everything from individual components to complete cars is delivered to the Kalahari Desert in South Africa and left to bake in the sun for two years, which is equal to about six to eight years in southern-European conditions. Daily checks look for delamination, discolouration or general deterioration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityCards;
