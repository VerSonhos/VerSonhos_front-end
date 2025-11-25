import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";
import Chatbot from "../components/ChatBot/ChatBot";
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop.jsx'

const MainLayout = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <section className="grow">
        {children}
      </section>
      <Footer />
      <AccessibilityWidget />
      <Chatbot />
    </main>
  );
};

export default MainLayout;
