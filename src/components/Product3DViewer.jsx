import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'

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
      {/* УМЕНЬШЕНО: размер куба теперь 1.2 вместо 2 */}
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.3} />
    </mesh>
  )
}

const Product3DViewer = () => {
  return (
    /* h-64 УМЕНЬШАЕТ высоту всего блока */
    <div className="w-full h-64 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* position [0, 0, 6] отдаляет камеру, делая объект визуально меньше */}
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
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