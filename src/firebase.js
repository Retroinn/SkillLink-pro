import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

export const subscribeToProjects = (cb) =>
  onSnapshot(query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(50)), cb);

export const subscribeToNotifications = (uid, cb) =>
  onSnapshot(query(collection(db, 'notifications'), orderBy('createdAt', 'desc')), cb, console.error);

export const createProject = (data) => addDoc(collection(db, 'projects'), data);
export const saveUser = (uid, data) => setDoc(doc(db, 'users', uid), data, { merge: true });
export const fetchUser = (uid) => getDoc(doc(db, 'users', uid));
export const updateUser = (uid, data) => updateDoc(doc(db, 'users', uid), data);

export const uploadAsset = async (path, file) => {
  const storageRef = ref(storage, path);
  const upload = await uploadBytes(storageRef, file);
  return getDownloadURL(upload.ref);
};
