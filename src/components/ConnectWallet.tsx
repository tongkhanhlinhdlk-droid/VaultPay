"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log("connectors:", connectors);

  if (!mounted) {
    return null;
  }

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 rounded bg-red-500 text-white"
      >
        {address?.slice(0, 6)}...
        {address?.slice(-4)}
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          console.log("clicked connect");
          connect({ connector: injected() });
        }}
        className="px-4 py-2 rounded bg-blue-500 text-white"
      >
        Connect Wallet
      </button>

      {error && (
        <p className="text-red-500 text-sm">
          {error.message}
        </p>
      )}
    </>
  );
}