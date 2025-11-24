import Sidebar from '../components/SideBar/SideBar';
import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";
import VLibras from '@djpfs/react-vlibras';
import Chatbot from "../components/ChatBot/ChatBot";
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop.jsx'

const DashboardLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen">
      <ScrollToTop />
      <Sidebar />
      <section className="flex-grow p-6 ms-20 bg-gray-100">
        {children}
      </section>
      <VLibras forceOnload={true} />
      <AccessibilityWidget />
      <Chatbot />
    </main>
  );
};

export default DashboardLayout;
