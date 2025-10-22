import AccessibilityWidget from "@/components/AccessibilityWidget/AccessibilityWidget";

const AuthLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      {children}
      <AccessibilityWidget />
    </main>
  );
};

export default AuthLayout;
