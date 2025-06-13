import React from 'react'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'


const Pioneering = () => {

    gsap.registerPlugin(ScrollTrigger)

    const containerRef = useRef()


  return (
    <section ref={containerRef} className='h-full w-[calc(100vw-40px)] flex justify-center items-center mt-30'>
        <div>
            <h2 className='text-4xl lg:text-[7vw] text-white text-center'> Because it's for yout trust: pioneering safety.</h2>
        </div>
    </section>
  )
}

export default Pioneering