import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";
import VLibras from '@djpfs/react-vlibras';
import Chatbot from "../components/ChatBot/ChatBot";

const AuthLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      {children}
      <VLibras forceOnload={true} />
      <AccessibilityWidget />
      <Chatbot />
    </main>
  );
};

export default AuthLayout;
