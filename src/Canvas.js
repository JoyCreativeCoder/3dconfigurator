import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  useGLTF,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";

import { useSnapshot } from "valtio";
import { state } from "./Store";

function Box(props) {
  const { nodes, materials } = useGLTF('/3d_shirt.glb');
  const snap = useSnapshot(state);
  const texture = useTexture(`/${snap.selectedDecal}.png`);

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.selectedColor, 0.25, delta);
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        position={[0.419, -0.21, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <Decal
          debug
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          opacity={0.7}
          map={texture}
        />
      </mesh>
    </group>
  );
}

export const CanvasApp = ({ position = [0, 0, 2.5], fov = 25 }) => {
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
      <CameraRig>
        <Center>
          <Box />
          <Backdrop />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

function Backdrop() {
  const shadows = useRef();

  useFrame((state, delta) => {
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.selectedColor,
      0.25,
      delta
    );
  });

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
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
  );
}

function CameraRig({ children }) {
  const group = useRef();
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 5, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

// Preload the GLTF model
useGLTF.preload('/3d_shirt.glb');

export default CanvasApp;
