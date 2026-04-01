import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const deleteToDo = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};

export const updateToDo = async (id, updatedToDo = {}) => {
  await updateDoc(doc(db, "todos", id), { ...updatedToDo });
};
