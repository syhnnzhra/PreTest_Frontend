'use client' 

import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
// import './globals.css'

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="">
        <title>My Books</title>
        <body className={inter.className}>
          {children}
        </body>
    </div>
  );
};

export default RootLayout;
