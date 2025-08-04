import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, DoubleSide } from 'three'

const PhotoCircle = ({
  imageUrl = '/me.jpg' // Only one image used for both sides
}) => {
  const texture = useLoader(TextureLoader, imageUrl)
  const meshRef = useRef()

  const [radius, setRadius] = useState(1.5)
  const [segments, setSegments] = useState(64)
  const [rotationSpeed, setRotationSpeed] = useState(0.5)

  // Responsive adjustments
  useEffect(() => {
    const updateSettings = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 640) {
        setRadius(1)
        setSegments(32)
        setRotationSpeed(0.8)
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

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[radius, segments]} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  )
}

export default PhotoCircle
