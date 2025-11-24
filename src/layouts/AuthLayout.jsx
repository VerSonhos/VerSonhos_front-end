import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";
import VLibras from '@djpfs/react-vlibras';
import Chatbot from "../components/ChatBot/ChatBot";
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop.jsx'

const AuthLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <ScrollToTop />
      {children}
      <VLibras forceOnload={true} />
      <AccessibilityWidget />
      <Chatbot />
    </main>
  );
};

export default AuthLayout;
