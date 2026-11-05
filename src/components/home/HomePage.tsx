import PageSplash from "@/components/home/PageSplash";
import Topbar from "@/components/home/Topbar";
import SiteHeader from "@/components/home/SiteHeader";
import HeroSection from "@/components/home/HeroSection";
import BrandsSection from "@/components/home/BrandsSection";
import AboutIntroSection from "@/components/home/AboutIntroSection";
import PartsSection from "@/components/home/PartsSection";
import FrameSection from "@/components/home/FrameSection";
import MaterialsSection from "@/components/home/MaterialsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import CertificationsSection from "@/components/home/CertificationsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import FAQSection from "@/components/home/FAQSection";
import CTABanner from "@/components/home/CTABanner";
import ContactSection from "@/components/home/ContactSection";
import SiteFooter from "@/components/home/SiteFooter";
import HomePageEffects from "@/components/home/HomePageEffects";

export default function HomePage() {
  return (
    <>
      <PageSplash />
      <Topbar />
      <SiteHeader />
      <main>
        <HeroSection />
        <BrandsSection />
        <AboutIntroSection />
        <PartsSection />
        <FrameSection />
        <MaterialsSection />
        <WhyChooseSection />
        <CertificationsSection />
        <HowItWorksSection />
        <IndustriesSection />
        <FAQSection />
        <CTABanner />
        <ContactSection />
      </main>
      <SiteFooter />
      <HomePageEffects />
    </>
  );
}
