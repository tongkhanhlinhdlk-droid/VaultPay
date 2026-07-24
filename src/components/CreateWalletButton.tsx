"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateWalletButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function createWallet() {
    try {
      setLoading(true);

      const res = await fetch("/api/wallet", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create wallet");
        return;
      }

      alert("Wallet created successfully!");

      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={createWallet}
      disabled={loading}
      className="bg-black text-white px-5 py-3 rounded-lg"
    >
      {loading ? "Creating..." : "Create Wallet"}
    </button>
  );
}