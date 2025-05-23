import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { SpeedInsights } from '@vercel/speed-insights/remix';
import { Analytics } from '@vercel/analytics/react';

import './tailwind.css';
import './styles/index.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className='flex flex-col items-center'>
      <Outlet />
      <Footer />
    </div>
  );
}
