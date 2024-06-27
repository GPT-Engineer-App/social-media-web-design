import UploadForm from "../components/UploadForm";

const Index = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-center">Your Blank Canvas</h1>
        <p className="text-center">
          Chat with the agent to start making edits.
        </p>
        <UploadForm />
      </div>
    </div>
  );
};

export default Index;