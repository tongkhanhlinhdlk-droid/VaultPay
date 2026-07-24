import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoginCard from "@/components/LoginCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <Hero />

      <section className="px-6 pb-20">
        <LoginCard />
      </section>
    </main>
  );
}