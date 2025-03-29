import { Link } from '@remix-run/react';
import logo from '../images/logo.svg';

export function PortfolioHeader() {
  return (
    <header className='absolute top-0 left-0 right-0 z-20'>
      <div className='container mx-auto'>
        <div className='flex justify-center md:justify-start items-center h-[150px]'>
          <Link
            to={{
              pathname: '/',
              search: '',
            }}
            prefetch='render'
          >
            <div className='flex items-center'>
              <img
                src={logo}
                width='80'
                height='55'
                alt='Behangmotief'
                className='brightness-0 invert'
              />
              <p className='ml-2 text-xs sm:text-sm text-white'>| music & festival photographer</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
