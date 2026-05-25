import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Detectar cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Registro
  const register = async (email, password, userData) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', newUser.uid), {
        uid: newUser.uid,
        email: email,
        name: userData.name || '',
        celphone: userData.celphone || '',
        address: userData.address || '',
        createdAt: new Date(),
      });

      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Obtener datos del usuario desde Firestore
  const getUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Actualizar datos del usuario en Firestore
  const updateUserData = async (uid, updatedData) => {
    try {
      setError(null);
      await setDoc(doc(db, 'users', uid), {
        ...updatedData,
        updatedAt: new Date(),
      }, { merge: true });
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Eliminar cuenta del usuario (Auth + Firestore)
  const deleteAccount = async (password) => {
    try {
      setError(null);
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No hay usuario autenticado');

      // Re-autenticar antes de eliminar
      const credential = EmailAuthProvider.credential(currentUser.email, password);
      await reauthenticateWithCredential(currentUser, credential);

      // Eliminar documento de Firestore
      await deleteDoc(doc(db, 'users', currentUser.uid));

      // Eliminar usuario de Firebase Auth
      await deleteUser(currentUser);

      setUser(null);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    getUserData,
    updateUserData,
    deleteAccount,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
