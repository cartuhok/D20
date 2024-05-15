import create from 'zustand';
import { TextureLoader } from 'three';

const useStore = create((set) => {
  const redTexture = new TextureLoader().load('./red.png');

  return {
    matcapTexture: redTexture,
    setMatcapTexture: (texture) => set({ matcapTexture: texture }),
    dieType: 'D20',
    setDieType: (type) => set({ dieType: type }),
  };
});

export default useStore;