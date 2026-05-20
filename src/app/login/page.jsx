"use client";

import GoogleLogin from "@/components/GoogleLogin";
import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  Separator,
} from "@heroui/react";

export default function LoginPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data: res, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: true,
      callbackUrl,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Login successful");
          router.push(callbackUrl);
          router.refresh();
        },
      },
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0f17] px-4 py-12 text-left transition-colors duration-300">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header Title Section */}
        {/* <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">
            Welcome Back
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium transition-colors">
            Start your journey with IdeaVault
          </p>
        </div> */}

        {/* Auth Interface Card Container */}
        <Card className="bg-white dark:bg-[#0f1319] p-8 md:p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800/80 shadow-2xl transition-colors">
          <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">
            Welcome Back
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium transition-colors">
            Start your journey with IdeaVault
          </p>
        </div>
          <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
            
            {/* Email Field Descriptor */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-1.5 w-full"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">
                Email Address
              </Label>
              <Input 
                placeholder="john@example.com" 
                classNames={{
                  inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border border-slate-200 dark:border-slate-800 h-12 rounded-xl focus-within:!border-blue-600 dark:focus-within:!border-purple-500 transition-colors",
                  input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium",
                }}
              />
              <FieldError className="text-xs font-semibold text-rose-500 mt-0.5" />
            </TextField>

            {/* Password Field Descriptor */}
            <TextField
              isRequired
              name="password"
              className="flex flex-col gap-1.5 w-full"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                return null;
              }}
            >
              <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">
                Password
              </Label>

              <div className="relative w-full">
                <Input
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  classNames={{
                    inputWrapper: "bg-slate-50/50 dark:bg-[#0b0f17]/50 border border-slate-200 dark:border-slate-800 h-12 rounded-xl focus-within:!border-blue-600 dark:focus-within:!border-purple-500 transition-colors pr-12",
                    input: "text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium",
                  }}
                />

                <button
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {isShowPassword ? (
                    <FaEye className="w-4 h-4" />
                  ) : (
                    <FaEyeSlash className="w-4 h-4" />
                  )}
                </button>
              </div>

              <FieldError className="text-xs font-semibold text-rose-500 mt-0.5" />
            </TextField>

            {/* Main Submit Action Button Trigger */}
            <Button
              isLoading={loading}
              type="submit"
              className="w-full h-12 font-bold rounded-xl text-white bg-gradient-to-r from-[#1d63ed] via-[#653df5] to-[#a426e7] hover:opacity-95 shadow-lg shadow-purple-500/10 transition-all active:scale-[0.99] cursor-pointer mt-2"
            >
              Login
            </Button>
          </Form>

          {/* Separation Divider Pattern */}
          <div className="flex justify-center items-center gap-4 my-6">
            <Separator className="bg-slate-100 dark:bg-slate-800/80 flex-1" />
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
              Or
            </span>
            <Separator className="bg-slate-100 dark:bg-slate-800/80 flex-1" />
          </div>

          {/* Social Sign In Providers Container Wrapper */}
          <div className="w-full">
            <GoogleLogin />
          </div>

        </Card>
      </div>
    </div>
  );
}