import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { Mesh } from 'three'

// Простая 3D модель-заглушка (коробка)
const Box = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.3} />
    </mesh>
  )
}

const Product3DViewer = () => {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden bg-gray-100">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          <Box />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            autoRotate={false}
          />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Product3DViewer






