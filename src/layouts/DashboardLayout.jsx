// import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen">
      {/* <Sidebar /> */}
      <section className="flex-grow p-6 bg-gray-100">
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;
