'use client'

import { motion } from 'framer-motion'
import { Youtube, Play } from 'lucide-react'
import AnimatedGradient from '@/components/landing/AnimatedGradient'
import ElegantShape from '@/components/landing/ElegantShape'
import HoverTextReveal from '@/components/landing/HoverTextReveal'
import InteractiveButton from '@/components/landing/InteractiveButton'
import type { Variants } from 'framer-motion'
function Home() {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] },
    },
  }
  return (
    <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030303]'>
      {/* Animated Background Gradient */}
      <AnimatedGradient
        colors={['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981']}
        speed={0.3}
        blur='heavy'
      />

      {/* Floating Shapes */}
      <div className='absolute inset-0 overflow-hidden'>
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

      <div className='container relative z-10 mx-auto px-4 md:px-6'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Interactive Brand Name */}
          <motion.div
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'
            className='mb-8 md:mb-12'
          >
            <HoverTextReveal
              items={['Y', 'T', '-', 'S', 'u', 'm', 'm', 'a', 'r', 'i', 'z', 'e', 'r']}
              className='mx-auto max-w-3xl'
            />
          </motion.div>

          {/* Main Headline */}
          <motion.div
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'
          >
            <h1 className='mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:mb-8 md:text-6xl'>
              <span className='bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent'>
                Summarize YouTube Videos
              </span>
              <br />
              <span className='bg-gradient-to-r from-red-300 via-white/90 to-purple-300 bg-clip-text text-transparent'>
                With AI Intelligence
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'
          >
            <p className='mx-auto mb-8 max-w-2xl px-4 text-base font-light leading-relaxed tracking-wide text-white/60 sm:text-lg md:mb-12 md:text-xl'>
              Transform lengthy YouTube videos into concise, meaningful summaries in seconds. 
              Powered by OpenAI and LangChain for intelligent content extraction.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'
            className='mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row'
          >
            <InteractiveButton text='Start Summarizing' />
            <a
              href='https://github.com/nawinkumarsharma/yt-summarizer'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white'
            >
              <Youtube className='h-4 w-4 text-red-400' />
              <span className='text-sm font-medium tracking-wide'>
                View on GitHub
              </span>
            </a>
          </motion.div>

          {/* Feature Preview */}
          <motion.div
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'
            className='mx-auto max-w-2xl'
          >
            <div className='rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm md:p-8'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='h-3 w-3 rounded-full bg-red-500'></div>
                <div className='h-3 w-3 rounded-full bg-yellow-500'></div>
                <div className='h-3 w-3 rounded-full bg-green-500'></div>
              </div>
              <div className='space-y-3 text-left'>
                <div className='text-sm text-white/40'>YouTube URL:</div>
                <div className='rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 font-mono text-xs sm:text-sm text-white/60 break-all'>
                  https://www.youtube.com/watch?v=dQw4w9WgXcQ
                </div>
                <div className='text-sm text-white/40'>AI Summary:</div>
                <div className='rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 text-xs sm:text-sm text-green-400'>
                  <div className='flex items-start gap-2'>
                    <Play className='h-4 w-4 text-red-400 mt-0.5 flex-shrink-0' />
                    <div>
                      <p className='text-white/80 mb-2'>This video discusses...</p>
                      <p className='text-white/60 text-xs'>• Key point 1: Introduction to the topic</p>
                      <p className='text-white/60 text-xs'>• Key point 2: Main concepts explained</p>
                      <p className='text-white/60 text-xs'>• Key point 3: Practical examples and conclusions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80' />
    </div>
  )
}

export default Home
