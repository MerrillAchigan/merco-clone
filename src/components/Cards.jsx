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
    const words = firstTextRef.current.querySelectorAll('span');
    gsap.to(words, {
      opacity: 1,
      y: -10,
      yoyo: true,
      delay: 1,
      duration: 0.5,
      stagger: {
        each: 0.2,
        ease: 'power2.inOut',
        from: 'start',
      },
    });
  });

  return (
    <section className='py-50 h-[100vh] max-w-[calc(100vw-40px)] flex flex-col relative'>
      <div ref={containerRef} className='text-white'>
        <div className='flex'>
          <div className='flex-col  ml-20 items-start'>
            <h2
              ref={firstTextRef}
              className='text-4xl lg:text-7xl mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2'
            >
              {splitText}
            </h2>
            <div ref={firstCardRef} className='mt-50 flex flex-col'>
              <img src={style1} alt="" className='w-full' />
              <h3 className='text-4xl lg:text-4xl py-5 mt-5'>Find your color.</h3>
              <p className='text-2xl mb-70 regular-text'>
                MANUFAKTUR allows you to customize your car in the shade that reflects your personality. From Night Black Magno to Ireland Mid Green Metallic, each hue is carefully selected, ensuring your star shines even brighter.
              </p>
            </div>
          </div>
          <div className='flex flex-col mr-10 items-start'>
            <div ref={secondCardRef} className='ml-50'>
              <img src={merco} alt="" className='w-[40vw]' />
              <h3 className='text-4xl lg:text-4xl py-5 mt-5'>Mercedes‑Benz but your way.</h3>
              <p className='text-2xl mb-100 regular-text'>
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
