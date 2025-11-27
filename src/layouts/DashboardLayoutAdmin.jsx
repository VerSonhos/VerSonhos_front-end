import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';
import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";
import Chatbot from "../components/ChatBot/ChatBot";
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop.jsx'

const DashboardLayoutAdmin = ({ children }) => {
  return (
    <main className="flex min-h-screen">
      <ScrollToTop />
      <SideBarAdmin />
      <section className="grow p-6 ms-20 bg-gray-100">
        {children}
      </section>
      <AccessibilityWidget />
      <Chatbot />
    </main>
  );
};

export default DashboardLayoutAdmin;
