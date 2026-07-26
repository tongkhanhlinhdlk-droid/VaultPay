import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Hero from "@/components/Hero";
import LoginCard from "@/components/LoginCard";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Hero />

      <section className="px-6 pb-20">
        <LoginCard />
      </section>
    </main>
  );
}