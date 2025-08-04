import React, {  useState, useEffect } from 'react'
import {  useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

const PhotoCircle = ({
  frontImageUrl = '/me.jpg',
  backImageUrl = '/images/hema.jpg'
}) => {
  const frontTexture = useLoader(TextureLoader, frontImageUrl)
  const backTexture = useLoader(TextureLoader, backImageUrl)

  

  const [radius, setRadius] = useState(1.5)
  const [segments, setSegments] = useState(64)
 
  // Responsive adjustments for radius, segments, and speed
  useEffect(() => {
    const updateSettings = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 640) {
        setRadius(1)          // Smaller size on phones
        setSegments(32)       // Fewer segments
      } else {
        setRadius(1.5)
        setSegments(64)
      }
    }

    updateSettings()
    window.addEventListener('resize', updateSettings)
    return () => window.removeEventListener('resize', updateSettings)
  }, [])

  // Smooth rotation (frame-rate independent)
  
  return (
    <>
      {/* Front Side */}
      <mesh >
        <circleGeometry args={[radius, segments]} />
        <meshStandardMaterial map={frontTexture} />
      </mesh>

      {/* Back Side (flipped) */}
      <mesh
      
        rotation={[0, Math.PI, 0]}
        position={[0, 0, -0.001]} // slight offset to prevent z-fighting
      >
        <circleGeometry args={[radius, segments]} />
        <meshStandardMaterial map={backTexture} />
      </mesh>
    </>
  )
}

export default PhotoCircle
