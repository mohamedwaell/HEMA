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

  const [radius, setRadius] = useState(1.5)
  const [segments, setSegments] = useState(64)
  const [rotationSpeed, setRotationSpeed] = useState(0.5)

  // Responsive adjustments for radius, segments, and speed
  useEffect(() => {
    const updateSettings = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 640) {
        setRadius(1)          // Smaller size on phones
        setSegments(32)       // Fewer segments
        setRotationSpeed(0.8) // Slower rotation
      } else {
        setRadius(1.5)
        setSegments(64)
        setRotationSpeed(1)
      }
    }

    updateSettings()
    window.addEventListener('resize', updateSettings)
    return () => window.removeEventListener('resize', updateSettings)
  }, [])

  // Smooth rotation (frame-rate independent)
  useFrame((_, delta) => {
    if (frontRef.current && backRef.current) {
      frontRef.current.rotation.y += delta * rotationSpeed
      backRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <>
      {/* Front Side */}
      <mesh ref={frontRef}>
        <circleGeometry args={[radius, segments]} />
        <meshStandardMaterial map={frontTexture} />
      </mesh>

      {/* Back Side (flipped) */}
      <mesh
        ref={backRef}
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
