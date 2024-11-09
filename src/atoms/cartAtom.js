// src/atoms/cartAtom.js
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const cartState = atom({
  key: 'cartState',
  default: [],
  effects_UNSTABLE: [persistAtom],  // This will persist the cart to localStorage
});
