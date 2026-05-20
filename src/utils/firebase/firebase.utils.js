import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUiLAZcW_dKgJLWpQ-NLlSfQPJgaY4cBs",
  authDomain: "e-commerce-db-69043.firebaseapp.com",
  projectId: "e-commerce-db-69043",
  storageBucket: "e-commerce-db-69043.firebasestorage.app",
  messagingSenderId: "882883147569",
  appId: "1:882883147569:web:57084aa07c0bd35a88a210",
  measurementId: "G-L2VP60JERN",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider(); //Can have multiple googleProvider (e.g. Facebook, github...)

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseapp);
export const db = getFirestore(firebaseapp);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
}; // collectionKey = firestore collection name (e.g. users)

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap
};

export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation,
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
