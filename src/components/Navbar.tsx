import { SignInButton, UserButton } from "@clerk/nextjs";
import ConnectWallet from "@/components/ConnectWallet";
import { auth } from "@clerk/nextjs/server";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold text-white">VaultPay</h1>
        </div>

        <nav className="flex items-center gap-4">
          <button className="text-sm text-slate-300 hover:text-white">
            Docs
          </button>

          {userId ? (
            <div className="flex items-center gap-4">
              <ConnectWallet />
              <UserButton />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
          )}
        </nav>
      </div>
    </header>
  );
}