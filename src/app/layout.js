import { Inter } from 'next/font/google';

import './globals.css';
import Providers from './providers/QueryClientProvider';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '拓撲TOP',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
