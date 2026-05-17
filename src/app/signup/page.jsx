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
import GoogleLogin from "../components/GoogleLogin";

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

// const handleGoogleSignin = async() => {
//   await authClient.signIn.social({
//     provider: "google"
//   })
// }

  return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md">
      
      

      <Card className="p-8 shadow-xl rounded-2xl border bg-white">
        <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">
          Register your account
        </h1>
        <p className="text-gray-500 mt-2">
          Start your journey with IdeaVault
        </p>
      </div>
        <Form
          onSubmit={handleRegisterFunc}
          className="flex flex-col gap-4"
        >
          <TextField isRequired name="name" type="text">
            <Label>Your Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField isRequired name="image" type="url">
            <Label>Photo URL</Label>
            <Input placeholder="Attach your photo" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
          >
            <Label>Email Address</Label>
            <Input placeholder="Enter your email address" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
          >
            <Label>Password</Label>

            <div className="relative">
              <Input
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter your password"
              />

              <span
                onClick={() =>
                  setIsShowPassword(!isShowPassword)
                }
                className="absolute right-3 top-3 cursor-pointer"
              >
                {isShowPassword ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}
              </span>
            </div>

            <Description>
              Must be at least 8 characters with
              1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <Button
            className="w-full bg-slate-800 text-white rounded-xl"
            type="submit"
          >
            Register
          </Button>
        </Form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-600 font-semibold"
          >
            Login
          </Link>
        </p>

        <div className="flex justify-center items-center gap-3 my-4">
                  <Separator />
                  <div className="whitespace-nowrap">
                    Or 
                  </div>
                  <Separator />
                </div>

        <GoogleLogin />
      </Card>
    </div>
  </div>
);
};

export default RegisterPage;


// -----------------------

// "use client";
// import { FcGoogle } from "react-icons/fc";
// import { Card, Separator } from "@heroui/react";

// import {
//   Button,
//   Description,
//   FieldError,
//   Form,
//   Input,
//   Label,
//   TextField,
// } from "@heroui/react";
// import { authClient } from "@/lib/auth-client";
// import { redirect } from "next/navigation";

// const SignUpPage = () => {
    
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const user = Object.fromEntries(formData.entries());

    
//     const { data, error } = await authClient.signUp.email
//     ({
//       email: user.email,
//       password: user.password,
//       name: user.name,
//       // image: user.image,
//     });
//     console.log({data, error})

//     if (data) {
//       redirect("/");
//     }

//     if (error) {
//       // toast
//       alert("Error");
//     }
//   };


// // (6)st
// const handleGoogleSignin = async() => {
//   await authClient.signIn.social({
//     provider: "google"
//   })
// }
// // (6)en


//   return (
    
//     <div className="max-w-7xl mx-auto">
//       <div className="text-center my-3">
//         <h1 className="text-2xl font-bold">Create Account</h1>
//         <p>Start your adventure with Wanderlust</p>
//       </div>
//       <Card className="border rounded-none">
        
//         <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
//           <TextField isRequired name="name" type="text">
//             <Label>Name</Label>
//             <Input placeholder="Enter your name" />
//             <FieldError />
//           </TextField>

//           <TextField name="image" type="url">
//             <Label>Image URL</Label>
//             <Input placeholder="Image url" />
//             <FieldError />
//           </TextField>

//           <TextField
//             isRequired
//             name="email"
//             type="email"
//             validate={(value) => {
//               if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//                 return "Please enter a valid email address";
//               }
//               return null;
//             }}
//           >
//             <Label>Email</Label>
//             <Input placeholder="john@example.com" />
//             <FieldError />
//           </TextField>
//           <TextField
//             isRequired
//             minLength={8}
//             name="password"
//             type="password"
//             validate={(value) => {
//               if (value.length < 8) {
//                 return "Password must be at least 8 characters";
//               }
//               if (!/[A-Z]/.test(value)) {
//                 return "Password must contain at least one uppercase letter";
//               }
//               if (!/[0-9]/.test(value)) {
//                 return "Password must contain at least one number";
//               }
//               return null;
//             }}
//           >
//             <Label>Password</Label>
//             <Input placeholder="Enter your password" />
//             <Description>
//               Must be at least 8 characters with 1 uppercase and 1 number
//             </Description>
//             <FieldError />
//           </TextField>
//           <div className="flex justify-center gap-2">
//             <Button className={"rounded-none w-full bg-cyan-500"} type="submit">
//               Create Account
//             </Button>
//           </div>
//         </Form>
//           {/* (5)st */}
//           <div className="flex justify-center items-center gap-3">
//             <Separator/>
//              <div className="whitespace-nowrap">
//               Or sign up with
//              </div>
//             <Separator/>
//           </div>
//           <div>
//             {/* <Button variant="outline" className={'w=full rounded-none'}> */}
//             {/* (7) then check then in Navbar*/}
//             <Button onClick={handleGoogleSignin} variant="outline" className={'w-full rounded-none'}>
//              <FcGoogle/> Sign in with Google
//             </Button>
//           </div>
//           {/* (5)en */}

//       </Card>
//     </div>
    
//   );
// };

// export default SignUpPage;

// ---------------------End:53_2-(1) to () --------------------------------
