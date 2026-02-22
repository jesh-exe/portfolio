import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] selection:bg-white/30 text-white">
      {/* Container for the 500vh scroll-linked sequence */}
      <div className="relative">
        {/* The frames of the sequence are read automatically */}
        <ScrollyCanvas />

        {/* The Text overlay mapped to the exact scroll progress of the canvas */}
        <Overlay />
      </div>

      {/* The bottom section that appears after the scrollytelling ends */}
      <Skills />
      <Projects />

      {/* Simple footer */}
      <footer className="py-12 text-center text-sm text-gray-500 border-t border-white/10 mt-24">
        <p>© {new Date().getFullYear()} My Portfolio. Built with Next.js & Framer Motion.</p>
      </footer>
    </main>
  );
}
