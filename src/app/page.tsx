import Script from "next/script"
import ContactSection from "@/componentes/contact-section"
import FeaturesSection from "@/componentes/features-section"
import Footer from "@/componentes/footer"
import Header from "@/componentes/header"
import HeroSection from "@/componentes/hero-section"
import StoresSection from "@/componentes/stores-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />

      <Header />
      <HeroSection />
      <FeaturesSection />
      <StoresSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
