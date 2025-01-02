import '@/styles/globals.css';

import { type Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/providers/AuthProvider';
import JotaiProvider from '@/components/providers/JotaiProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import SidebarProvider from '@/components/providers/SidebarProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import ToastProvider from '@/components/providers/ToastProvider';
import AppSidebar from '@/components/Sidebar';
import Background from '@/components/static/Background';
import { todoSidebarItems } from '@/features/todos/config/sidebar';

export const metadata: Metadata = {
  title: 'Base Application',
  description: 'Starter template for your Next.js application',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='en'
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body className='min-h-full min-w-full'>
        <JotaiProvider>
          <QueryProvider>
            <ThemeProvider>
              <ToastProvider>
                <AuthProvider>
                  <Background>
                    <SidebarProvider>
                      <AppSidebar items={[todoSidebarItems]} />
                      <div className='h-screen w-screen'>
                        <Navbar />
                        {children}
                      </div>
                    </SidebarProvider>
                  </Background>
                </AuthProvider>
              </ToastProvider>
            </ThemeProvider>
          </QueryProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
