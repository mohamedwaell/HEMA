import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

const PhotoCircle = ({
  frontImageUrl = '/me.jpg',
  backImageUrl = '/images/hema.jpg'
}) => {
  const frontTexture = useLoader(TextureLoader, frontImageUrl)
  const backTexture = useLoader(TextureLoader, backImageUrl)

  const frontRef = useRef()
  const backRef = useRef()
  const [radius, setRadius] = useState(2)

  // Responsive radius based on screen size
  useEffect(() => {
    const updateRadius = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 640) {
        setRadius(1) // Small screen
      } else {
        setRadius(1.5) // Large screen
      }
    }

    updateRadius()
    window.addEventListener('resize', updateRadius)
    return () => window.removeEventListener('resize', updateRadius)
  }, [])

  // Animate rotation
  useFrame(() => {
    if (frontRef.current && backRef.current) {
      frontRef.current.rotation.y += 0.01
      backRef.current.rotation.y += 0.01
    }
  })

  return (
    <>
      {/* Front Side */}
      <mesh ref={frontRef}>
        <circleGeometry args={[radius, 64]} />
        <meshStandardMaterial map={frontTexture} />
      </mesh>

      {/* Back Side (flipped) */}
      <mesh ref={backRef} rotation={[0, Math.PI, 0]} position={[0, 0, -0.001]}>
        <circleGeometry args={[radius, 64]} />
        <meshStandardMaterial map={backTexture} />
      </mesh>
    </>
  )
}

export default PhotoCircle
