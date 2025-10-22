import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";
import VLibras from '@djpfs/react-vlibras';

const AuthLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      {children}
      <VLibras forceOnload={true} />
      <AccessibilityWidget />
    </main>
  );
};

export default AuthLayout;
