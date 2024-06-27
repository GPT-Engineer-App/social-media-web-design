import { useState, useEffect } from "react";
import UploadForm from "../components/UploadForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "uploads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="absolute left-4 top-4">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsModalOpen(true)}>Upload</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
            </DialogHeader>
            <UploadForm />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <h1 className="text-3xl text-center">Your Blank Canvas</h1>
        <p className="text-center">
          Chat with the agent to start making edits.
        </p>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        {posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border rounded-lg shadow-md">
            <img src={post.url} alt={post.description} className="w-full h-auto mb-2 rounded" />
            <p className="text-lg">{post.description}</p>
            <p className="text-sm text-gray-500">Uploaded by: {post.uploader}</p>
            <p className="text-sm text-gray-500">Upload time: {new Date(post.createdAt.seconds * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;