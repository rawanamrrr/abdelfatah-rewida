"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/lib/translations'

const images = [
  '/love-story1.jpeg',
  '/love-story2.jpeg',
  '/love-story3.jpeg',
  '/love-story4.jpeg',
  '/love-story5.jpeg',
]

export default function LoveStoryGallery() {
  const t = useTranslation()

  return (
    <section 
      className="relative py-0 px-2 sm:px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent overflow-visible"
      style={{
        clipPath: 'polygon(0 3%, 100% 0%, 100% 97%, 0% 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated Photo Gallery - Two above, one below */}
        <div className="relative w-full flex flex-col items-center justify-center gap-0 overflow-visible">
          {/* Top row - Three images */}
          <div className="flex items-center justify-center -space-x-4 sm:-space-x-6 md:-space-x-8 w-full px-2 sm:px-4">
            {images.slice(0, 3).map((src, index) => {
              const delay = index * 0.5

              return (
                <motion.div
                  key={index}
                  className="relative flex-shrink-0"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  animate={{
                    rotate: [
                      0,
                      25,
                      -25,
                      25,
                      -25,
                      0,
                    ],
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1]
                    },
                    scale: {
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1]
                    },
                    rotate: {
                      duration: 12 + (index * 1.5),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: delay,
                    },
                  }}
                >
                  {/* Circular Frame */}
                  <motion.div
                    className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden shadow-2xl border-2 sm:border-3 md:border-4 border-accent/50 bg-gradient-to-br from-accent/30 to-accent/10"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      clipPath: 'circle(50% at 50% 50%)',
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Love story moment ${index + 1}`}
                      fill
                      className="object-cover"
                      style={index === 0 ? { objectPosition: 'center 30%' } : undefined}
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, (max-width: 1280px) 288px, 320px"
                    />
                    
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-2 sm:border-2 md:border-4 border-white/40 pointer-events-none" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom row - Two centered images */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full px-2 sm:px-4 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20">
            {images.slice(3, 5).map((src, index) => {
              return (
                <motion.div
                  key={index + 3}
                  className="relative flex-shrink-0"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  animate={{
                    rotate: [
                      0,
                      25,
                      -25,
                      25,
                      -25,
                      0,
                    ],
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.6,
                      delay: 0.45 + (index * 0.15),
                      ease: [0.22, 1, 0.36, 1]
                    },
                    scale: {
                      duration: 0.6,
                      delay: 0.45 + (index * 0.15),
                      ease: [0.22, 1, 0.36, 1]
                    },
                    rotate: {
                      duration: 13 + (index * 1.5),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5 + (index * 0.5),
                    },
                  }}
                >
                  {/* Circular Frame */}
                  <motion.div
                    className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden shadow-2xl border-2 sm:border-3 md:border-4 border-accent/50 bg-gradient-to-br from-accent/30 to-accent/10"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      clipPath: 'circle(50% at 50% 50%)',
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Love story moment ${index + 4}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, (max-width: 1280px) 288px, 320px"
                    />
                    
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-2 sm:border-2 md:border-4 border-white/40 pointer-events-none" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

