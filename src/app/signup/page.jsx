"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Description,
  Separator,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "@/components/GoogleLogin";

const RegisterPage = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleRegisterFunc = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    );
    const { name, image, email, password } = formData;

    const { data: res, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (res) {
      toast.success("Signup successfully");
      e.target.reset();

      await authClient.signOut();
      router.push("/login");
    }
  };

  return (
    /* Decreased container height to 70vh and reduced vertical padding */
    <div className="min-h-[70vh] bg-slate-100 dark:bg-[#0b0f17] flex items-center justify-center px-4 py-4 transition-colors duration-300">
      <div className="w-full max-w-md">

        {/* Decreased inner padding to p-5 for a tighter vertical structure */}
        <Card className="p-5 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1319] text-slate-900 dark:text-white transition-colors duration-300">
          {/* Reduced margin-bottom */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Register your account
            </h1>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Start your journey with IdeaVault
            </p>
          </div>
          
          {/* Reduced gap between form fields */}
          <Form
            onSubmit={handleRegisterFunc}
            className="flex flex-col gap-3"
          >
            <TextField isRequired name="name" type="text">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Name</Label>
              <Input placeholder="Enter your name" className="text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm" />
              <FieldError className="text-rose-500 text-xs" />
            </TextField>

            <TextField isRequired name="image" type="url">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Photo URL</Label>
              <Input placeholder="Attach your photo" className="text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm" />
              <FieldError className="text-rose-500 text-xs" />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
            >
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</Label>
              <Input placeholder="Enter your email address" className="text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm" />
              <FieldError className="text-rose-500 text-xs" />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
            >
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</Label>

              <div className="relative">
                <Input
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 w-full text-sm"
                />

                <span
                  onClick={() =>
                    setIsShowPassword(!isShowPassword)
                  }
                  className="absolute right-3 top-3 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {isShowPassword ? (
                    <FaEye />
                  ) : (
                    <FaEyeSlash />
                  )}
                </span>
              </div>

              <Description className="text-gray-400 dark:text-slate-500 text-[11px] leading-tight mt-0.5">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-rose-500 text-xs" />
            </TextField>

            <Button
              className="w-full h-12 font-bold rounded-xl text-white bg-gradient-to-r from-[#1d63ed] via-[#653df5] to-[#a426e7] hover:opacity-95 shadow-lg shadow-purple-500/10 transition-all active:scale-[0.99] cursor-pointer mt-2"
              type="submit"
            >
              Register
            </Button>
          </Form>

          {/* Compressed margin spaces below form */}
          <p className="mt-4 text-center text-xs text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-red-600 dark:text-red-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          <div className="flex justify-center items-center gap-3 my-3 text-gray-400 dark:text-slate-500">
            <Separator className="bg-gray-200 dark:bg-slate-800" />
            <div className="whitespace-nowrap text-xs font-medium">
              Or 
            </div>
            <Separator className="bg-gray-200 dark:bg-slate-800" />
          </div>

          <GoogleLogin />
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;