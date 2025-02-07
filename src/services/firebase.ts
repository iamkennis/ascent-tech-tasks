 const firebaseConfig = {
    apiKey: "AIzaSyDF6IpZTaotAQmOHOBCU-IbwMagiZ9K4sU",
    authDomain: "floopyinn-app.firebaseapp.com",
    projectId: "floopyinn-app",
    // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    // appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

import { initializeApp } from "firebase/app";
import {
    getFirestore, collection,
    getDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 
const tasksCollection = collection(db, "tasks");

const fetchTaskById = async (taskId: string): Promise<any | null> => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      const docSnapshot = await getDoc(taskRef);

      if (docSnapshot.exists()) {
        const taskData = docSnapshot.data();

        return {
          id: docSnapshot.id,
          ...taskData,
        };
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      return null;
    }
  };

  const updateTask = async (taskId: string, updatedTaskData: any): Promise<void> => {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, updatedTaskData); 
        console.log("Task updated successfully!");
    } catch (error) {
        console.error("Error updating task:", error);
        throw error; 
    }
};

export {
    app,
    db,
    auth,
    tasksCollection,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    fetchTaskById,
    updateTask
};

