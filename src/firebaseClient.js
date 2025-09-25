// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHSAo7-7dY1bicqPf_lf6BNZpAApxWlZI",
  authDomain: "my-wedding-d0363.firebaseapp.com",
  projectId: "my-wedding-d0363",
  storageBucket: "my-wedding-d0363.firebasestorage.app",
  messagingSenderId: "500342183619",
  appId: "1:500342183619:web:96179263239a6443b43476",
  measurementId: "G-HN5GSHX6PZ"
};

if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
    console.warn('firebaseConfig 값이 비어 있습니다. 콘솔에서 받은 값을 모두 채워 넣으세요.')
  }
  
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  
  export const db = getFirestore(app)
  export const auth = getAuth(app)
  
  // 익명 로그인 보장
  export async function ensureAnon() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        try {
          if (!user) {
            const cred = await signInAnonymously(auth)
            resolve(cred.user)
          } else {
            resolve(user)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }