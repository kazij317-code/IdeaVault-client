
"use client"
import { authClient } from '@/lib/auth-client';
import React from 'react';

import { useSearchParams } from "next/navigation";
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@heroui/react';
const GoogleLogin = () => {
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callbackUrl") || "/";
    const handleGoogleSignin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: callbackURL,
        });
        console.log(data, "data");

    }

    return (


        <Button
            onClick={handleGoogleSignin}
            variant="bordered"
            className="w-full rounded-xl flex items-center justify-center gap-3"
        >
            <FcGoogle size={22} />
            Login with Google
        </Button>


    );
};

export default GoogleLogin;

