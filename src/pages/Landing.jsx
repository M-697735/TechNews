import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Features from "../components/ui/Features";
import FAQ from "../components/ui/FAQ";
import Footer from "../components/layout/Footer";

function Landing() {
  return (
    <main className="min-h-screen bg-[#080C10] text-white">

      <Navbar />

      <Hero />

      <Features />

      <FAQ />

      <Footer />

    </main>
  );
}

export default Landing;