import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebaseConfig"
import axios from "axios";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedInUser => {
            
            if (loggedInUser) {
                axios.post('https://musical-camp-server.vercel.app/jwt', { email: loggedInUser.email })
                    .then(data => {
                        localStorage.setItem('access-token' ,data.data.token);
                    })
            }
            else{
                localStorage.removeItem('access-token')
            }

            setUser(loggedInUser)
            setLoading(false);
        }));
        return () => {
            return unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        googleSignIn,
        logOut,
        updateUser
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;