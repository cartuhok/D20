import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import useStore from './store'

export default function D6(props) {
  const { nodes, materials } = useGLTF('./D6.glb')
  const matcapTexture = useStore((state) => state.matcapTexture);
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Cube001"
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.778014}
      >
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh>
      <mesh
        name="Cube003"
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.778014}
      />
    </group>
  )
}

useGLTF.preload('./D6.glb')