import { useState, useEffect } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  loginWithGoogle, 
  loginWithGitHub, 
  logout 
} from '../api/firebaseServices';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar si Firebase está inicializado
    if (!auth) {
      console.warn("Firebase auth not initialized, using mock user");
      setUser({ uid: 'mock-user-id', displayName: 'Usuario Demo' });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? user.uid : "No user");
      setUser(user);
      setLoading(false);
    }, (err) => {
      console.error("Auth error:", err);
      setError(err);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithGitHub,
    logout
  };
};
