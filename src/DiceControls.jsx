import React, { useState } from 'react';
import useStore from './store';

const DiceControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dieType = useStore((state) => state.dieType);
  const setDieType = useStore((state) => state.setDieType);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getDieImage = () => {
    switch (dieType) {
      case 'D4':
        return './D4.png';
      case 'D6':
        return './D6.png';
      default:
        return './D20.png';
    }
  };

  return (
    <div style={{ position: 'absolute', top: 10, left: 10 }}>
      <img
        src={getDieImage()}
        style={{
          width: '80px',
          height: '80px',
          cursor: 'pointer',
          padding: '10px',
          borderRadius: '5px',
        }}
        onClick={toggleMenu}
      />
      {isOpen && (
        <div
          style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            marginTop: '5px',
          }}
        >
          <img
            src="./D20.png"
            style={{
              width: '80px',
              height: '80px',
              cursor: 'pointer',
              display: 'block',
              marginBottom: '5px',
            }}
            onClick={() => {
              setDieType('D20');
              setIsOpen(false);
            }}
          />
          <img
            src="./D4.png"
            style={{
              width: '80px',
              height: '80px',
              cursor: 'pointer',
              display: 'block',
              marginBottom: '5px',
            }}
            onClick={() => {
              setDieType('D4');
              setIsOpen(false);
            }}
          />
          <img
            src="./D6.png"
            style={{ width: '80px', height: '80px', cursor: 'pointer', display: 'block' }}
            onClick={() => {
              setDieType('D6');
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DiceControls;