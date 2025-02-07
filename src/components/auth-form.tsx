import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


type AuthFormData = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
};

export function AuthForm() {
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [signInError, setSignInError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>();

  
  const handleSignUpEmailPassword = async (data:any) => {
    setSignUpError(null); 
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      localStorage.setItem('userName', data.name); 
      console.log("User signed up:", user);
      toast.success("Signup successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error("Signup failed. Please try again.");
     
      switch (error.code) {
        case "auth/email-already-in-use":
          setSignUpError("Email address is already in use.");
          break;
        case "auth/invalid-email":
          setSignUpError("Invalid email address.");
          break;
        case "auth/weak-password":
          setSignUpError("Weak password (at least 6 characters).");
          break;
        default:
          setSignUpError("An error occurred during signup. Please try again later.");
      }
    }
  };


const handleSignInGoogle = async () => {
  setSignInError(null); 
  const provider = new GoogleAuthProvider();
  try {
      await signInWithPopup(auth, provider);
      toast.success("Google sign-in successful! Redirecting to dashboard...");
      navigate("/dashboard");
  } catch (error: any) {
      console.error("Error signing in with Google:", error);
      setSignInError(getErrorMessage(error.code));
  }
};

const handleSignInFacebook = async () => {
  setSignInError(null); 
  const provider = new FacebookAuthProvider();
  try {
      await signInWithPopup(auth, provider);
      toast.success("Facebook sign-in successful! Redirecting to dashboard...");
      navigate("/dashboard");
  } catch (error: any) {
      console.error("Error signing in with Facebook:", error);
      setSignInError(getErrorMessage(error.code)); 
  }
};


const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/popup-closed-by-user':
            return 'The popup was closed by the user.';
        case 'auth/cancelled-popup':
            return 'The sign-in popup was cancelled.';
        case 'auth/unauthorized-domain':
            return 'The domain is not authorized for authentication.';
        default:
            return 'An error occurred during sign-in. Please try again.';
    }
};


  return (
    <div className={cn("flex flex-col gap-6")}>
      <>
        <div className="grid gap-6">
          
          <div className="flex flex-col gap-4">
            <Button onClick={handleSignInFacebook}  variant="secondary" className="w-full rounded-full border-0">
              <FaFacebook className="mr-2" />
              Continue with Facebook
            </Button>
            <Button onClick={handleSignInGoogle} variant="secondary" className="w-full rounded-full border-0">
              <FaGoogle className="mr-2" />
              Continue with Google
            </Button>
          </div>

          
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              OR
            </span>
          </div>

         
          <div className="grid gap-6">
            
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="name">
                  Name <span className="text-red-600">*</span>
                </Label>
              </div>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-600 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="email">
                  Email <span className="text-red-600">*</span>
                </Label>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

           
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">
                  Password <span className="text-red-600">*</span>
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                className="ring-0"
                {...register("terms", {
                  required: "You must agree to the terms",
                })}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="text-sm font-medium text-gray-500">
                  I agree to the{" "}
                  <a href="#" className="text-black underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-black underline">
                    Privacy Policy
                  </a>
                </Label>
                {errors.terms && (
                  <span className="text-red-600 text-sm">
                    {errors.terms.message}
                  </span>
                )}
              </div>
            </div>

            
            {signUpError && (
              <div className="text-red-600 text-center text-sm">
                {signUpError}
              </div>
            )}

            
            <Button
              type="submit"
              className="w-full py-6 font-bold text-xl rounded-2xl"
              onClick={handleSubmit(handleSignUpEmailPassword)}
            >
              Sign up
            </Button>
          </div>

          
          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="#" className="underline underline-offset-4 font-medium">
              Login here
            </a>
          </div>
        </div>
      </>
    </div>
  );
}

