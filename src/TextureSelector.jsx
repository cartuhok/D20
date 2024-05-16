import React, { useState } from 'react';
import useStore from './store';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const TextureSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setMatcapTexture = useStore((state) => state.setMatcapTexture);

  // Preload the textures
  const textures = useLoader(TextureLoader, [
    './red.png',
    './green.png',
    './orange.png',
    './copper.png',
    './black.png',
    './purple.png',
  ]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'absolute', bottom: 10, left: 20 }}>
      <div
        onClick={toggleMenu}
        style={{
          cursor: 'pointer',
          fontSize: '60px',
          padding: '10px',
          borderRadius: '5px',
          userSelect: 'none'
        }}
      >
          <img
            src="./paint-bucket.png"
            style={{
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              display: 'block',
              marginBottom: '5px',
            }}
          />
      </div>
      {isOpen && (
        <div
          style={{
            padding: '10px',
            borderRadius: '5px',
            marginTop: '5px',
          }}
        >
          {textures.map((texture, index) => (
            <button
              key={index}
              onClick={() => setMatcapTexture(texture)}
              style={{
                border: 'none',
                background: 'none',
                padding: '5px',
                cursor: 'pointer',
              }}
            >
              <img
                src={texture.image.src}
                alt={`Texture ${index + 1}`}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '100%',
                  userSelect: 'none',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextureSelector;