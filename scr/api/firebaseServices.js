import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Configuración obtenida del entorno (Vite)
let firebaseConfig = {};
let appId = 'default-app-id';

try {
  const configString = import.meta.env.VITE_FIREBASE_CONFIG;
  console.log("Firebase config string:", configString ? "Present" : "Missing");
  
  if (configString && configString.trim() !== '') {
    firebaseConfig = JSON.parse(configString);
    console.log("Firebase config parsed successfully:", firebaseConfig.projectId);
  } else {
    console.warn("VITE_FIREBASE_CONFIG is empty or missing");
  }
  appId = import.meta.env.VITE_APP_ID || 'default-app-id';
} catch (error) {
  console.error("Error parsing Firebase config:", error);
  firebaseConfig = {};
}

// Inicialización de Firebase
let app, db, auth;
try {
  if (!firebaseConfig.apiKey) {
    throw new Error("Firebase config is missing required fields");
  }
  
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  // Crear objetos mock para evitar errores
  auth = null;
  db = null;
}

export { auth, onAuthStateChanged, signInAnonymously, signInWithCustomToken };

// Proveedores
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Funciones de login
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginWithGitHub = () => signInWithPopup(auth, githubProvider);
export const logout = () => signOut(auth);

// Función para guardar el plan de negocios
export const saveBusinessPlan = async (userId, dataToSave) => {
  if (!userId || !db) throw new Error("Firebase not initialized or user not logged in.");
  const planDocRef = doc(db, `artifacts/${appId}/users/${userId}/businessPlans/myPlan`);
  await setDoc(planDocRef, dataToSave, { merge: true });
};

// Función para cargar el plan de negocios
export const loadBusinessPlan = async (userId) => {
  if (!userId || !db) throw new Error("Firebase not initialized or user not logged in.");
  const planDocRef = doc(db, `artifacts/${appId}/users/${userId}/businessPlans/myPlan`);
  const docSnap = await getDoc(planDocRef);
  return docSnap.exists() ? docSnap.data() : {};
};