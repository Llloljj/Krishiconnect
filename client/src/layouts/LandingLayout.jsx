import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ProblemSection from '../components/landing/ProblemSection';
import AISolutionShowcase from '../components/landing/AISolutionShowcase';
import CoreFeaturesSection from '../components/landing/CoreFeaturesSection';
import AIMatchingEngine from '../components/landing/AIMatchingEngine';
import DashboardPreview from '../components/landing/DashboardPreview';
import HowItWorks from '../components/landing/HowItWorks';
import RoleSelection from '../components/landing/RoleSelection';
import GovernmentImpact from '../components/landing/GovernmentImpact';
import Testimonials from '../components/landing/Testimonials';
import CTABanner from '../components/landing/CTABanner';
import Footer from '../components/landing/Footer';

export default function LandingLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <AISolutionShowcase />
        <CoreFeaturesSection />
        <AIMatchingEngine />
        <DashboardPreview />
        <HowItWorks />
        <RoleSelection />
        <GovernmentImpact />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
