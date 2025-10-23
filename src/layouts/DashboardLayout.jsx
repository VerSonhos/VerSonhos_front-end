import Sidebar from '../components/SideBar/SideBar';
import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";
import VLibras from '@djpfs/react-vlibras';

const DashboardLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <section className="flex-grow p-6 ms-20 bg-gray-100">
        {children}
      </section>
      <VLibras forceOnload={true} />
      <AccessibilityWidget />
    </main>
  );
};

export default DashboardLayout;
