import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

const Text3D = ({ children, className = '' }) => {
  const textRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!textRef.current) return
    
    const rect = textRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 8
    const rotateY = (centerX - x) / 8
    
    textRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) scale(1.05)`
  }

  const handleMouseLeave = () => {
    if (textRef.current) {
      textRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)'
    }
    setIsHovered(false)
  }

  return (
    <motion.h1
      ref={textRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className={`${className} relative inline-block cursor-pointer transition-all duration-300`}
      style={{
        transformStyle: 'preserve-3d',
        color: '#1e293b',
        textShadow: `
          3px 3px 0px rgba(0,0,0,0.15),
          6px 6px 0px rgba(0,0,0,0.12),
          9px 9px 0px rgba(0,0,0,0.09),
          12px 12px 0px rgba(0,0,0,0.06),
          15px 15px 30px rgba(0,0,0,0.15),
          ${isHovered ? '0 0 40px rgba(2, 132, 199, 0.4), 0 0 80px rgba(2, 132, 199, 0.2)' : 'none'}
        `,
        filter: isHovered ? 'brightness(1.15) drop-shadow(0 0 20px rgba(2, 132, 199, 0.3))' : 'brightness(1)',
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </motion.h1>
  )
}

export default Text3D

