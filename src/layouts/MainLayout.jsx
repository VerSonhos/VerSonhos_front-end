import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";

const MainLayout = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow">
        {children}
      </section>
      <Footer />
      <AccessibilityWidget />
    </main>
  );
};

export default MainLayout;
