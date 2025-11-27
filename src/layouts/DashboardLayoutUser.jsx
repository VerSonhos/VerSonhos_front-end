import SideBarUser from '../components/SideBarUser/SideBarUser';
import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";
import Chatbot from "../components/ChatBot/ChatBot";
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop.jsx'

const DashboardLayoutUser = ({ children }) => {
  return (
    <main className="flex min-h-screen">
      <ScrollToTop />
      <SideBarUser />
      <section className="grow p-6 ms-20 bg-gray-100">
        {children}
      </section>
      <AccessibilityWidget />
      <Chatbot />
    </main>
  );
};

export default DashboardLayoutUser;
