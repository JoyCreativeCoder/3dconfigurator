import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF } from '@react-three/drei';
import { useRef } from 'react'

function Box(props) {
  const { nodes, materials } = useGLTF('/3d_shirt.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        position={[0.419, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

export const CanvasApp = ({ position = [-1, 0, 2.5], fov = 25 }) => {
  return (
    <Canvas camera={{ position, fov }}
    eventSource={document.getElementById('root')}
    eventPrefix="client"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Center>
        <Box />
      </Center>
      <OrbitControls />
    </Canvas>
  );
};

export default CanvasApp;

useGLTF.preload('/3d_shirt.glb')
