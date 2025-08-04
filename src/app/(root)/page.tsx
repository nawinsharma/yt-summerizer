'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon, Github } from 'lucide-react'
import type { Variants } from 'framer-motion'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { CoolMode } from '@/components/magicui/cool-mode'
import Link from 'next/link'
import Image from 'next/image'
import { AnimationContainer, MaxWidthWrapper } from '@/components/global'
import { BorderBeam } from '@/components/ui/border-beam'
import MagicBadge from '@/components/ui/magic-badge'
import { BentoCard } from '@/components/ui/bento-grid'
import { CARDS } from '@/components/ui/bento-grid'
import { BentoGrid } from '@/components/ui/bento-grid'
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
    <div className='relative flex min-h-screen w-full mt-16 items-center justify-center overflow-hidden'>
      <div className='container relative z-10 mx-auto px-4 mt-16 md:px-6'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Interactive Brand Name */}
          <motion.div
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'
            className='mb-8 md:mb-12'
          >
            {/* <HoverTextReveal
              items={['Y', 'T', '-', 'S', 'u', 'm', 'm', 'a', 'r', 'i', 'z', 'e', 'r']}
              className='mx-auto max-w-3xl overflow-hidden'
            /> */}
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
            <p className='mx-auto mb-8 max-w-2xl px-4 text-base font-light leading-relaxed tracking-wide text-white/90 sm:text-lg md:mb-12 md:text-xl'>
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
            <CoolMode>
              <Link href='/dashboard'>
                <ShimmerButton>
                  <span className="flex items-center text-white">
                    Start Summarizing
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </span>
                </ShimmerButton>
              </Link>
            </CoolMode>
            <Link
              href='https://github.com/nawinsharma/yt-summerizer'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white'
            >
              <Github className='h-4 w-4 text-white' />
              <span className='text-sm font-medium tracking-wide'>
                View on GitHub
              </span>
            </Link>
          </motion.div>

					<AnimationContainer
						delay={0.2}
						className="relative w-full bg-transparent px-2 pt-20 pb-20 md:py-32"
					>
						<div className="gradient -translate-x-1/2 absolute inset-0 left-1/2 h-1/4 w-3/4 animate-image-glow blur-[5rem] md:top-[10%] md:h-1/3"></div>
						<div className="-m-2 lg:-m-4 rounded-xl bg-card/50 p-2 ring-1 ring-border backdrop-blur-3xl lg:rounded-2xl">
							<BorderBeam size={250} duration={12} delay={9} />
							<Image
								src="https://ik.imagekit.io/3phdnlhoo3/image.png?updatedAt=1753359299665"
								alt="Dashboard"
								width={1500}
								height={1500}
								quality={100}
								className="rounded-md bg-muted/30 ring-1 ring-border lg:rounded-xl"
							/>
							<div className="-bottom-4 absolute inset-x-0 z-40 h-1/2 w-full bg-gradient-to-t from-background" />
							<div className="md:-bottom-8 absolute inset-x-0 bottom-0 z-50 h-1/4 w-full bg-gradient-to-t from-background" />
						</div>
					</AnimationContainer>
          			{/* Features Section */}
			<MaxWidthWrapper className="pt-10">
				<AnimationContainer delay={0.1}>
					<div
						id="features"
						className="flex w-full flex-col items-center justify-center py-8 lg:items-center"
					>
						<MagicBadge title="Features" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							Tired of watching, <br className="hidden sm:block" />
							long videos?
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							SumTub allows you to summarize YouTube videos in seconds without missing out on the key points or context.
						</p>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2}>
					<BentoGrid className="py-8">
						{CARDS.map((feature, idx) => (
							<BentoCard key={idx} {...feature} />
						))}
					</BentoGrid>
				</AnimationContainer>
			</MaxWidthWrapper>
        </div>
      </div>
    </div>
  )
}

export default Home
