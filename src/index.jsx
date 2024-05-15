import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import TextureSelector from './TextureSelector';
import DiceControls from './DiceControls';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Canvas camera={{ fov: 45, near: 0.1, far: 200, position: [0, 15, 0] }}>
      <Experience />
    </Canvas>
    <TextureSelector />  {/* Add the selector to the UI */}
    <DiceControls />
  </>
);
