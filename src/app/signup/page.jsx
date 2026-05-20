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
import GoogleLogin from "@/components/GoogleLogin";

const RegisterPage = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleRegisterFunc = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-[#0b1120] dark:via-[#111827] dark:to-[#1e1b4b] transition-all duration-500">

      <div className="w-full max-w-md">

        <Card className="backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-2xl rounded-3xl p-8 transition-all duration-300">

          {/* Header */}
          <div className="text-center mb-7">
            

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Create Account
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Start your journey with <span className="font-semibold text-purple-600">IdeaVault</span>
            </p>
          </div>

          {/* Form */}
          <Form
            onSubmit={handleRegisterFunc}
            className="flex flex-col gap-4"
          >
            <TextField isRequired name="name" type="text">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </Label>
              <Input
                placeholder="Enter your name"
                className="rounded-xl h-12 mt-1"
              />
              <FieldError className="text-red-500 text-xs" />
            </TextField>

            <TextField isRequired name="image" type="url">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Photo URL
              </Label>
              <Input
                placeholder="Paste your image link"
                className="rounded-xl h-12 mt-1"
              />
              <FieldError className="text-red-500 text-xs" />
            </TextField>

            <TextField isRequired name="email" type="email">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </Label>
              <Input
                placeholder="Enter your email"
                className="rounded-xl h-12 mt-1"
              />
              <FieldError className="text-red-500 text-xs" />
            </TextField>

            <TextField isRequired minLength={6} name="password">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </Label>

              <div className="relative mt-1">
                <Input
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="rounded-xl h-12 pr-10"
                />

                <span
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-purple-600 transition"
                >
                  {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <Description className="text-xs text-gray-500 mt-1">
                Must contain 6+ characters, 1 uppercase & 1 number
              </Description>

              <FieldError className="text-red-500 text-xs" />
            </TextField>

            <Button
              type="submit"
              className="w-full h-12 mt-3 rounded-xl text-white font-bold text-base bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all duration-300 cursor-pointer"
            >
              Create Account
            </Button>
          </Form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <Separator className="flex-1" />
            <span className="text-xs uppercase text-gray-400 font-semibold">
              Or
            </span>
            <Separator className="flex-1" />
          </div>

          {/* Google */}
          <div className="border rounded-xl p-1 hover:shadow-md transition">
            <GoogleLogin />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;