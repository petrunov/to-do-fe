import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className={`bg-gray-100 ${inter.className}`}
        suppressHydrationWarning={true}
      >
        {children}
      </div>
    </>
  );
};

export default RootLayout;
