import { Subtitles, Weight } from 'lucide-react';
import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FONT_WEIGHT ={
    Subtitles: {min:200, max: 700, default: 300},
    title: {min: 300, max: 800, default: 400},
}

const renderText =(text, className, baseWeight=400) =>{
    return [...text].map((char, i) => (
        <span key={i} 
              className={className} 
              style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
            {char=== ' ' ? '\u00A0' : char}
        </span>
    ));
}

const setupTextHover = (container, type)=>{
    if(!container) return;

    const letters = container.querySelectorAll('span');
    const {min, max, default: base} = FONT_WEIGHT[type];

    const animateLetter = (letter, weight, duration=0.5)=>{
        return gsap.to(letter, { duration, ease: 'power2.out', fontVariationSettings: `'wght' ${weight}` });
    };
    const handleMouseMove = (e) =>{
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w} = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2 ));
            const intensity = Math.exp(-(distance ** 2) / 2000);
            
            animateLetter(letter, min + (max - min) * intensity);
    });

};
    const handleMouseLeave = () =>{
        letters.forEach((letter) => {
            animateLetter(letter, base);
        });
    };

    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousemove', handleMouseMove);

    return ()=>{
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mousemove', handleMouseMove);
    }

}

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(()=>{
       const titleCleanUp = setupTextHover(titleRef.current, 'title');
       const subtitleCleanUp = setupTextHover(subtitleRef.current, 'Subtitles');

       return () =>{
        titleCleanUp();
        subtitleCleanUp();
       }
    },[])

  return (
    <section id = "welcome">
        <p ref ={subtitleRef}>
            {renderText(
                "Hey, I'm Shubham - Software Developer",
                'text-3xl font-[var(--font-georama)]',
                100)}</p>
        <h1 ref={titleRef} className='mt-7'>
            {renderText(
                "portfolio",
                'text-9xl font-[var(--font-georama)]'
                )}
        </h1>

        <div className='small-screen'>
            <p>This portfolio is designed for desktop/tablet screens only.</p>
        </div>
    </section>
  )
}

export default Welcome
