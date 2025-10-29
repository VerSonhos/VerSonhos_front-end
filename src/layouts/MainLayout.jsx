import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";
import VLibras from '@djpfs/react-vlibras';
import Chatbot from "../components/ChatBot/ChatBot";

const MainLayout = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow">
        {children}
      </section>
      <Footer />
      <VLibras forceOnload={true} />
      <AccessibilityWidget />
      <Chatbot />
    </main>
  );
};

export default MainLayout;
