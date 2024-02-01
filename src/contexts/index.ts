import { Firestore } from '@firebase/firestore';
import { createContext } from 'react';

export const FirestoreContext = createContext({} as Firestore);

export const AuthContext = createContext('');
