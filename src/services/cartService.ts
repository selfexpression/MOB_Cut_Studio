import {
  doc,
  getDoc,
  setDoc,
  Firestore,
} from 'firebase/firestore';

import type { CartItem } from '../types/interfaces';
import { firebaseApiRoutes } from '../utils/routes';

export const updateCartItems = async (
  userUID: string,
  items: CartItem[],
  db: Firestore,
) => {
  const cartRef = doc(db, firebaseApiRoutes.carts(), userUID);

  await setDoc(
    cartRef,
    { items },
    { merge: true },
  );
};

export const getCurrentUserCart = async (userUID: string, db: Firestore) => {
  const cartRef = doc(db, firebaseApiRoutes.carts(), userUID);
  const cartSnap = await getDoc(cartRef);

  if (!cartSnap.exists()) return null;

  return cartSnap.data().items;
};
