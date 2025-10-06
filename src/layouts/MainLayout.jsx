import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow">
        {children}
      </section>
      <Footer />
    </main>
  );
};

export default MainLayout;
