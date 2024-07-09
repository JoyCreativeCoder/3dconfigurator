import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Center,
  useGLTF,
  Environment,
  AccumulativeShadows,
  RandomizedLight
} from "@react-three/drei";
import { useRef } from "react";

function Box(props) {
  const { nodes, materials } = useGLTF("/3d_shirt.glb");
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
  );
}

export const CanvasApp = ({ position = [-1, 0, 2.5], fov = 25 }) => {
  return (
    <Canvas
      shadows
      camera={{ position, fov }}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <directionalLight position={[5, 5, 5]} />
      <Center>
        <Box />
        <Backdrop />
      </Center>
      <OrbitControls />
    </Canvas>
  );
};

function Backdrop() {
  const shadows = useRef()
  return <AccumulativeShadows
    ref={shadows}
    temporal
    frames={60}
    alphaTest={0.85}
    scale={10}
    rotation={[Math.PI / 2, 0, 0]}
    position={[0, 0, -0.14]}>
    <RandomizedLight
      amount={4}
      radius={9}
      intensity={0.55}
      ambient={0.25}
      position={[5, 5, -10]}
    />
    <RandomizedLight
      amount={4}
      radius={5}
      intensity={0.25}
      ambient={0.55}
      position={[-5, 5, -9]}
    />
  </AccumulativeShadows>
}

export default CanvasApp;

useGLTF.preload("/3d_shirt.glb");
