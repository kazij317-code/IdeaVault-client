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
import Link from "next/link";




export default function LoginClient() {
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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-[#0b1120] dark:via-[#111827] dark:to-[#1e1b4b] transition-all duration-500">

      <div className="w-full max-w-md">

        <Card className="backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-2xl rounded-3xl p-8 transition-all duration-300">

          {/* Header */}
          <div className="text-center mb-8">
            

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Welcome Back
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Start your journey with{" "}
              <span className="font-semibold text-purple-600">
                IdeaVault
              </span>
            </p>
          </div>

          <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return "Please enter a valid email";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </Label>

              <Input
                autoComplete="off"
                placeholder="john@example.com"
                classNames={{
                  inputWrapper:
                    "bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 h-12 rounded-xl backdrop-blur-md",
                  input:
                    "text-gray-800 dark:text-white placeholder:text-gray-400",
                }}
              />
              <FieldError className="text-red-500 text-xs" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </Label>

              <div className="relative">
                <Input
                  autoComplete="off"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  classNames={{
                    inputWrapper:
                      "bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 h-12 rounded-xl pr-12 backdrop-blur-md",
                    input:
                      "text-gray-800 dark:text-white placeholder:text-gray-400",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setIsShowPassword(!isShowPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition"
                >
                  {isShowPassword ? (
                    <FaEye />
                  ) : (
                    <FaEyeSlash />
                  )}
                </button>
              </div>

              <FieldError className="text-red-500 text-xs" />
            </TextField>

            {/* Forgot password */}
            <div className="text-right -mt-2">
              <Link
                href="/forgot-password"
                className="text-sm text-purple-600 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <Button
              isLoading={loading}
              type="submit"
              className="w-full h-12 mt-2 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all duration-300"
            >
              Login
            </Button>
          </Form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-purple-600 font-semibold hover:underline"
            >
              Register
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
}