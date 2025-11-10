import Header from "@/components/Header";

import Footer from "@/components/Footer";
import JoinUsSection from "@/components/JoinUsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <JoinUsSection />

      <Footer />
    </div>
  );
}
