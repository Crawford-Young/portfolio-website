'use client'

import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/lib/motion'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
}

export function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced)
    return (
      <span className={className} aria-label={text}>
        {text}
      </span>
    )

  const words = text.split(' ')
  let running = 0
  const offsets = words.map((w) => {
    const o = running
    running += w.length
    return o
  })

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block"
          style={{ overflow: 'hidden', paddingBottom: '0.15em', marginBottom: '-0.15em' }}
        >
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.55,
                delay: delay + (offsets[wi] + ci) * 0.028,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && (
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0, delay: delay + (offsets[wi] + word.length) * 0.028 }}
            >
              &nbsp;
            </motion.span>
          )}
        </span>
      ))}
    </span>
  )
}
