// import Sidebar from '../components/Sidebar';
import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";

const DashboardLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen">
      {/* <Sidebar /> */}
      <section className="flex-grow p-6 bg-gray-100">
        {children}
      </section>
      <AccessibilityWidget />
    </main>
  );
};

export default DashboardLayout;
