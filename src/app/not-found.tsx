'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Rocket, Satellite, Star as  Star, Zap } from 'lucide-react'

export default function Custom404() {
  const [text, setText] = useState('')
  const fullText = "Hoouston , we have a problem. The page you're looking for has floated away into space."
  const [showStars, setShowStars] = useState(false)

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setText((prev) => prev + fullText.charAt(i))
        i++
      } else {
        clearInterval(typingEffect)
        setShowStars(true)
      }
    }, 50)

    return () => clearInterval(typingEffect)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-center overflow-hidden relative">
      <div className="stars" />
      <motion.div
        className="text-9xl font-bold text-[var(--primary)]"
        animate={{ scale: [1, 1.1, 1], rotateY: [0, 360] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        <span className="inline-block">4</span>
        <motion.span
          className="inline-block"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          0
        </motion.span>
        <span className="inline-block">4</span>
      </motion.div>
      <motion.div
        className="text-xl mt-4 max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {text}
      </motion.div>
      <Link href="/">
        <motion.button
          className="mt-8 px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-semibold flex items-center"
          whileHover={{ scale: 1.05, backgroundColor: "var(--secondary)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Rocket className="mr-2" /> Return to Earth
        </motion.button>
      </Link>
      <motion.div
        className="absolute top-20 left-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <Satellite size={48} color="var(--secondary)" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <Satellite size={64} color="var(--primary)" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/4"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{ repeat: Infinity, duration: 10 }}
      >
        {/* <Planet size={100} color="var(--secondary)" /> */}
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      >
        <Zap size={32} color="var(--footer)" />
      </motion.div>
      <AnimatePresence>
        {showStars && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                <Star size={16} color="var(--footer)" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
