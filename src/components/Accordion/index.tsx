"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  id: number
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div 
      ref={ref}
      className="w-full space-y-4"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="border-b border-purple-700/30"
        >
          <motion.button
            onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
            className="w-full flex items-center justify-between py-6 text-left text-primary-foreground group"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <span 
              className="text-xl md:text-2xl font-medium"
              style={{ fontFamily: "var(--font-fk-screamer)" }}
            >
              {item.question}
            </span>
            <motion.div
              animate={{ rotate: openItem === item.id ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "anticipate" }}
              className="ml-4 shrink-0 text-primary"
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </motion.button>
          <AnimatePresence>
            {openItem === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: "auto", 
                  opacity: 1,
                  transition: {
                    height: {
                      duration: 0.4,
                      ease: [0.76, 0, 0.24, 1]
                    },
                    opacity: {
                      duration: 0.25,
                      delay: 0.15
                    }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: {
                      duration: 0.4,
                      ease: [0.76, 0, 0.24, 1]
                    },
                    opacity: {
                      duration: 0.25
                    }
                  }
                }}
                className="overflow-hidden"
              >
                <motion.div 
                  className="pb-6"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-primary p-6 rounded-lg">
                    <p 
                      className="text-primary-foreground text-lg"
                      style={{ fontFamily: "var(--font-pp-editorial)" }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  )
}
