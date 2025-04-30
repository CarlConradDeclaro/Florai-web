import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
}
