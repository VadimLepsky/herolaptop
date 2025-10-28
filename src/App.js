import * as THREE from 'three'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls, Center, Bounds } from '@react-three/drei'
import HeroPage from './HeroPage'

function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/mac-draco.glb')

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 8) / 20, 0.1)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-2 + Math.sin(t / 2)) / 2, 0.1)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh geometry={nodes['Cube008_2'].geometry}>
            <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude>
              <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                <HeroPage />
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

export default function App() {
  return (
    <Canvas
      camera={{ fov: 45 }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', display: 'block', background: '#EDF0F2', touchAction: 'none' }}
    >
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      <Suspense fallback={null}>
        {/* Центрируем модель относительно (0,0,0) */}
        <Center>
          {/* Чуть повернули вправо лицом к камере */}
          <group rotation={[0, Math.PI * 0.9, 0]} position={[0, 0, 0]}>
            <Model />
          </group>
        </Center>

        {/* Автоподгон камеры под габариты модели + «воздух» вокруг неё */}
        <Bounds fit observe clip margin={1.25} />

        <Environment preset="city" />
      </Suspense>

      {/* Тень — увеличил scale и чуть поднял, чтобы не казалась «срезанной» визуально */}
      <ContactShadows position={[0, -4.25, 0]} scale={24} blur={2.2} far={4.8} />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        // горизонт ограничен ≈ до 100° (±50°)
        minAzimuthAngle={-Math.PI / 3.6}
        maxAzimuthAngle={ Math.PI / 3.6}
        // вертикаль — мягче, чем был «замок» на одно значение
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 1.9}
        target={[0, 0, 0]}
      />
    </Canvas>
  )
}
