import { useRef, useState } from "react";
import { useFrame, useLoader } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import D20 from './D20';
import { MeshReflectorMaterial, Sky } from "@react-three/drei";
import * as THREE from 'three';
import useStore from './store';
import D4 from "./D4";
import D6 from "./D6";

export default function Experience() {
    const dieRef = useRef();
    const diePosition = useRef([0, 0, 0]);

    const [cameraPosition, setCameraPosition] = useState(new THREE.Vector3());
    const [cameraTarget, setCameraTarget] = useState(new THREE.Vector3());

    const texture = useLoader(THREE.TextureLoader, '/texture.jpg');

    const dieType = useStore((state) => state.dieType);

    const dieJump = () => {
        if (dieRef.current) {
          const getRandomTorque = (max) => {
            return (Math.random() * max - max / 2) * (Math.random() > 0.5 ? 1 : -1);
          };
      
          let impulseY;
          let torqueMax;
      
          switch (dieType) {
            case 'D4':
              impulseY = 100;
              torqueMax = 100;
              break;
            case 'D6':
              impulseY = 400;
              torqueMax = 400;
              break;
            default: // D20
              impulseY = 300;
              torqueMax = 300;
              break;
          }
      
          const randomTorqueX = getRandomTorque(torqueMax);
          const randomTorqueZ = -randomTorqueX * getRandomTorque(torqueMax) / Math.abs(randomTorqueX);
          const randomTorqueY = getRandomTorque(torqueMax);
      
          dieRef.current.applyImpulse({ x: 0, y: impulseY, z: 0 }, true);
          dieRef.current.applyTorqueImpulse({
            x: randomTorqueX,
            y: randomTorqueY,
            z: randomTorqueZ
          }, true);
        }
      };

      const isBelow = (position) => {
        return position.y < -2;
      };

    useFrame((state, delta) => {
        if (dieRef.current) {
            const bodyPosition = dieRef.current.translation();
            diePosition.current = [bodyPosition.x, bodyPosition.y, bodyPosition.z];
            const newPosition = new THREE.Vector3(bodyPosition.x + 13, 10, bodyPosition.z);
            const newTargetPosition = new THREE.Vector3(bodyPosition.x + 0.25, bodyPosition.y, bodyPosition.z + 0.25);

            if (isBelow(bodyPosition)) {
              dieRef.current.setTranslation({ x: 0, y: 0, z: 0 });
              dieRef.current.setLinvel({ x: 0, y: 0, z: 0 });
              dieRef.current.setAngvel({ x: 0, y: 0, z: 0 });
            }

            setCameraPosition(prev => prev.lerp(newPosition, 0.01));
            setCameraTarget(prev => prev.lerp(newTargetPosition, 0.01));

            state.camera.position.copy(cameraPosition);
            state.camera.lookAt(cameraTarget);
        }
    });

    return (
        <>
            <directionalLight intensity={4} />
            <directionalLight intensity={4} position={[1, -2, 1]} />
            <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
            <Physics>
                  {dieType === 'D20' && (
                  <RigidBody key="d20" ref={dieRef} colliders="hull" restitution={0.5} friction={0.5} position={diePosition.current}>
                      <D20 scale={2} onClick={dieJump} />
                  </RigidBody>
                  )}
                  {dieType === 'D4' && (
                  <RigidBody key="d4" ref={dieRef} colliders="hull" restitution={0.5} friction={0.5} position={diePosition.current}>
                      <D4 scale={2} onClick={dieJump} />
                  </RigidBody>
                  )}
                  {dieType === 'D6' && (
                  <RigidBody key="d6" ref={dieRef} colliders="hull" restitution={0.5} friction={0.5} position={diePosition.current}>
                      <D6 scale={2} onClick={dieJump} />
                  </RigidBody>
                  )}
                <RigidBody type="fixed">
                    <mesh rotation-x={-Math.PI * 0.5} position-y={-2} scale={100}>
                        <planeGeometry />
                        <MeshReflectorMaterial
                            map={texture}
                            emissiveMap={texture}
                            displacementMap={texture}
                            blur={[400, 100]}
                            resolution={1024}
                            mixBlur={0.5}
                            mixStrength={15}
                            depthScale={1}
                            minDepthThreshold={0.85}
                            metalness={0.6}
                            roughness={1}
                        />
                    </mesh>
                </RigidBody>
                {/* <RigidBody type="fixed">
                    <CuboidCollider args={[10, 2, 0.5]} position={[0, 1, 5.25]} />
                    <CuboidCollider args={[10, 2, 0.5]} position={[0, 1, -5.25]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[10.5, 1, 0]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[-10.5, 1, 0]} />
                </RigidBody> */}
            </Physics>
        </>
    );
}
