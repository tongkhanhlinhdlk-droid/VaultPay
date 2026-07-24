"use client";

import { useState } from "react";
import QRCode from "react-qr-code";

type Props = {
  address: string;
};

export default function ReceiveWallet({ address }: Props) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="mt-4 rounded-xl border p-5 space-y-4">
      <div className="text-center">
        <h3 className="font-semibold text-lg">
          Receive Payment
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Share your VaultPay wallet to receive ETH
        </p>
      </div>

      <div className="flex justify-center">
        <QRCode value={address} size={180} />
      </div>

      <div className="bg-gray-100 rounded-lg p-3 text-center">
        <p className="text-xs text-gray-500">
          Wallet Address
        </p>

        <p className="font-mono mt-1">
          {shortAddress}
        </p>
      </div>

      <button
        onClick={copyAddress}
        className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800"
      >
        {copied ? "✓ Copied" : "📋 Copy Wallet Address"}
      </button>
    </div>
  );
}