'use client';

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Wrapper from "./wrapper";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const layoutPaths = ["/home", "/profile"];
  const showLayout = mounted && layoutPaths.some((path) => pathname.startsWith(path));

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {mounted && showLayout && (
        <div className="fixed top-0 left-0 h-screen w-[100px] md:w-[200px] z-20 bg-white shadow-md">
          <Sidebar />
        </div>
      )}

      <div
        className={`flex flex-col flex-1 h-screen transition-all duration-300 ${
          mounted && showLayout ? 'ml-[100px] md:ml-[200px]' : ''
        }`}
      >
       
        {mounted && showLayout && (
          <div className="fixed top-0 left-0 right-0 z-10 bg-white ml-[100px] md:ml-[200px] h-16">
            <Header />
          </div>
        )}

      
        <main 
          className={`overflow-y-auto w-full transition-all duration-300 ${
            mounted && showLayout 
              ? 'mt-16 h-[calc(100vh-4rem)] p-4 lg:p-6 xl:p-8 max-w-[1440px] mx-auto' 
              : 'h-screen'
          }`}
        >
          <Wrapper>{children}</Wrapper>
        </main>
      </div>
    </div>
  );
};

export default Layout;