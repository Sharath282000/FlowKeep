"use server";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  where,
} from "firebase/firestore";

import { Project } from "@/lib/type";

export async function getProjects(userId: string): Promise<Project[]> {
  if (!userId) return [];
  const projectRef = collection(db, "projects");
  const q = query(
    projectRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  const projects: Project[] = snapshot.docs.map(
    (doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        userId: data.userId,
        createdAt:
          (data.createdAt as Timestamp)?.toDate().toISOString() ||
          new Date().toISOString(),
      };
    }
  );

  return projects;
}

export async function getProject(projectId: string, userId: string): Promise<Project | null> {
  if (!projectId || !userId) {
    
    return null
  }

  const projectRef = doc(db, "projects", projectId)
  const snapshot = await getDoc(projectRef)

  if (!snapshot.exists()){
    
    return null
  }

  const data = snapshot.data() as Project
  
  
  if (data.userId !== userId) {
    return null
  }
  
  return {
    id: snapshot.id,
    title: data.title,
    description: data.description,
    userId: data.userId,
    createdAt:
      (data.createdAt as any)?.toDate?.().toISOString?.() ?? new Date().toISOString(),
  }
}