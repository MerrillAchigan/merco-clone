import React, { useRef } from 'react';
import { style1, merco, style5 } from '../utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

const Cards = () => {
  gsap.registerPlugin(ScrollTrigger);

  const firstTextRef = useRef();
  const containerRef = useRef();
  const firstCardRef = useRef();
  const secondCardRef = useRef();
  const thirdCardRef = useRef();

  const text = 'Individualizing cars in your style.';
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
        start: 'top center',
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
    <section className='py-50 h-[100vh] max-w-[calc(100vw-40px)] flex flex-col relative'>
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
              <img src={style1} alt="" className='w-full mt-20' />
              <h3 className='text-4xl lg:text-4xl py-5 mt-5'>Find your color.</h3>
              <p className='text-2xl mb-70 regular-text'>
                MANUFAKTUR allows you to customize your car in the shade that reflects your personality. From Night Black Magno to Ireland Mid Green Metallic, each hue is carefully selected, ensuring your star shines even brighter.
              </p>
            </div>
          </div>
          <div className='flex flex-col mr-10 items-start'>
            <div ref={firstCardRef} className='ml-50'>
              <img src={merco} alt="" className='w-[40vw]' />
              <h3 className='text-4xl lg:text-4xl py-5 mt-5'>Mercedes‑Benz but your way.</h3>
              <p className='text-2xl mb-110 regular-text'>
                For over 120 years, Mercedes‑Benz has been tailoring vehicles to individual desires. As the automobile has evolved, so has the art of customization. At MANUFAKTUR, you can choose from exclusive colors, elegant upholsteries, and refined trims – creating a car that reflects who you are.
              </p>
            </div>

            <div ref={thirdCardRef} className='ml-50'>
              <img src={style5} alt="" className='w-[40vw]' />
              <h3 className='text-3xl lg:text-4xl py-5 mt-5'>Design in every detail.</h3>
              <p className='text-2xl mb-70 regular-text'>
                MANUFAKTUR enhances your vehicle's interior with exclusive upholsteries in multiple colors and designs. Some customers are so inspired by this craftsmanship that one even had a sofa made to match his MANUFAKTUR interior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
