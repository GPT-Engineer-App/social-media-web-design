import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={handlePasswordRecovery} className="space-y-4">
        <h1 className="text-3xl text-center">Password Recovery</h1>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Send Password Reset Email</Button>
      </form>
    </div>
  );
};

export default PasswordRecovery;