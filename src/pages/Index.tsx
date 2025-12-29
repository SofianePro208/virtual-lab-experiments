import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SimulationPreview from "@/components/SimulationPreview";
import ChemistryPreview from "@/components/ChemistryPreview";
import ExperimentsSection from "@/components/ExperimentsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SimulationPreview />
      <ChemistryPreview />
      <ExperimentsSection />
      <Footer />
    </div>
  );
};

export default Index;
