"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function ReceiveWallet({
  address,
}: {
  address: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    await navigator.clipboard.writeText(address);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="rounded-xl border p-6 space-y-4">

      <h3 className="text-xl font-semibold">
        Receive USDC
      </h3>

      <p className="text-gray-600">
        Send USDC on Arc Testnet to this wallet
      </p>


      <div className="flex justify-center">
        <QRCodeSVG
          value={address}
          size={180}
        />
      </div>


      <div>
        <p className="text-sm text-gray-500 mb-2">
          Wallet Address
        </p>

        <p className="break-all rounded-lg bg-gray-100 p-3 text-sm font-mono">
          {address}
        </p>
      </div>


      <button
        onClick={copyAddress}
        className="w-full rounded-lg bg-blue-600 p-3 text-white"
      >
        {copied ? "Copied ✅" : "Copy Wallet Address"}
      </button>


      <div className="text-sm text-gray-500">
        Network: Arc Testnet
        <br />
        Token: USDC
      </div>

    </div>
  );
}