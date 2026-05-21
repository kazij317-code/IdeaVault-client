// "use client";

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
// import { FcGoogle } from "react-icons/fc";

// const LoginPage = () => {

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const user = Object.fromEntries(formData.entries());

//     const { data, error } = await authClient.signIn.email({
//       email: user.email,
//       password: user.password,
//     });
//     console.log({ data, error })


//     if (data) {
//       redirect('/')
//     }

//     if (error) {
//       // toast
//       alert("Error");
//     }
//   };

//   // (10)st
//   const handleGoogleSignin = async () => {
//     await authClient.signIn.social({
//       provider: "google"
//     })
//   }
//   // (10)en then (start: 53_5) create components/BookingCard.jsx

//   return (

//     <div className="max-w-7xl mx-auto">
//       <div className="text-center my-3">
//         <h1 className="text-2xl font-bold">Login</h1>
//         <p>Start your adventure with Wanderlust</p>
//       </div>
//       <Card className="border rounded-none">

//         <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
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
//               Login
//             </Button>
//           </div>
//         </Form>
//         {/* (9)st google button from signup page */}
//         <div className="flex justify-center items-center gap-3">
//           <Separator />
//           <div className="whitespace-nowrap">
//             Or sign up with
//           </div>
//           <Separator />
//         </div>
//         <div>

//           <Button onClick={handleGoogleSignin} variant="outline" className={'w-full rounded-none'}>
//             <FcGoogle /> Sign in with Google
//           </Button>
//         </div>
//         {/* (9)en */}

//       </Card>
//     </div>

//   );
// };

// export default LoginPage;

// // (1)en
// ---------------------End:53_3-(1) to () --------------------------------
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
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();

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

    if (error) {
      toast.error(error.message);
      return;
    }

    // if (res) {
    //   toast.success("Login successful");
    //   router.push(callbackUrL);
    //   router.refresh();
    // }
  };

  // const handleGoogleSignin = async () => {
  //   await authClient.signIn.social({
  //     provider: "google"
  //   })
  // }

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Login</h1>
        <p>Start your journey with IdeaVault</p>
      </div>

      <Card className="border rounded-none p-6 mx-auto w-fit">

        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            }}
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
                className="absolute right-3 top-3 cursor-pointer z-10"
              >
                {isShowPassword ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}
              </span>
            </div>

            <FieldError />
          </TextField>

          <Button
            className="rounded-none w-full bg-cyan-500"
            type="submit"
          >
            Login
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 my-4">
          <Separator />
          <div className="whitespace-nowrap">
            Or
          </div>
          <Separator />
        </div>

        <GoogleLogin />
        <div>

          {/* <Button onClick={handleGoogleSignin} variant="outline" className={'w-full rounded-none'}>
            <FcGoogle /> Sign in with Google
          </Button> */}
        </div>

      </Card>
    </div>
  );
}