'use client'
import AnimatedGradient from '@/components/landing/AnimatedGradient';
import ElegantShape from '@/components/landing/ElegantShape';

export default function GlobalBackground() {
  // Always use dark gradient colors
  const gradientColors = ['#3B82F1'];

  return (
    <>
      {/* Animated Background Gradient */}
      <AnimatedGradient
        colors={gradientColors}
        speed={0.3}
        blur='heavy'
      />
      {/* Floating Shapes */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none z-[-10]'>
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient='from-blue-500/[0.15]'
          className='left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]'
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient='from-purple-500/[0.15]'
          className='right-[-5%] top-[70%] md:right-[0%] md:top-[75%]'
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient='from-cyan-500/[0.15]'
          className='bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]'
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient='from-emerald-500/[0.15]'
          className='right-[15%] top-[10%] md:right-[20%] md:top-[15%]'
        />
      </div>
      {/* Bottom Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 z-[-10] pointer-events-none' />
    </>
  );
} 