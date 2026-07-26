"use client";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function LoginCard() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <h2 className="text-2xl font-semibold text-white">
        Welcome to VaultPay
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Sign in to continue
      </p>

      <div className="mt-6 space-y-4">

        <SignInButton mode="modal" forceRedirectUrl="/dashboard">
          <Button className="w-full">
            Continue with Email
          </Button>
        </SignInButton>

        <SignInButton mode="modal" forceRedirectUrl="/dashboard">
          <Button variant="outline" className="w-full">
            Continue with Google
          </Button>
        </SignInButton>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="text-xs text-slate-500">
            OR
          </span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        <Button variant="secondary" className="w-full">
          Connect Wallet
        </Button>

      </div>
    </div>
  );
}