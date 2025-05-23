import profile from '../images/profile.jpg';
import logo from '../images/logo-white.svg';
import { useFetcher } from '@remix-run/react';

export const Footer = () => {
  const fetcher = useFetcher<{ error?: string; success?: boolean }>();
  const error = fetcher.data?.error;
  const success = fetcher.data?.success;

  const referrals = [
    'Democrazy',
    'Crammerock',
    'Studio Brussel',
    'Cactusfestival',
    'HEAR HEAR',
    'Pukkelpop',
    'Boomtown',
    'Gladiolen',
    'VI.BE',
    'Gent Jazz',
  ];

  return (
    <footer className='w-full bg-black flex justify-center'>
      <div className='container text-white py-12 px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <section>
          <h3 className='text-xl uppercase mb-4 font-semibold border-b-2 border-white'>
            Behangmotief
          </h3>
          <img
            src={profile}
            className='w-full mb-4'
            loading='lazy'
            alt='Kevin Meyvaert'
            width={428}
            height={326}
          />
          <strong>Kevin Meyvaert</strong> is a Belgian freelance music & festival photographer based
          in Gent. Part of{' '}
          <a
            href='https://wannabes.be'
            target='_blank'
            className='underline underline-offset-4'
            rel='noreferrer'
          >
            Wannabes
          </a>
          , a rockphotography collective.
        </section>

        <section className='flex flex-col'>
          <h3 className='text-xl uppercase mb-4 font-semibold border-b-2 border-white'>
            Referrals
          </h3>
          <div className='flex flex-wrap gap-2 items-start mb-8'>
            {referrals.map((r) => (
              <span className='border px-2 py-1 rounded' key={r}>
                {r}
              </span>
            ))}
          </div>
          <h3 className='text-xl uppercase mb-4 font-semibold border-b-2 border-white'>
            Stay in touch
          </h3>
          <p>
            I&apos;m starting a quartery newsletter to share updates about my work. Leave your mail
            address to stay in touch.
          </p>
          <fetcher.Form
            className='flex mb-5 w-full justify-center flex-col'
            method='post'
            action='/api/subscribe'
          >
            <div className='flex w-full'>
              <input type='hidden' name='origin' value='WEBSITE_FOOTER_SIGNUP' />
              <input
                type='email'
                name='email'
                placeholder='Your email'
                className='appearance-none rounded-none p-4 text-m bg-black w-full border-b-4 border-white'
              />
              <button type='submit' className='py-2 px-4' disabled={fetcher.state === 'submitting'}>
                {fetcher.state === 'submitting' ? 'Signing up...' : 'Signup'}
              </button>
            </div>
            {error && <p className='text-red-500 mt-2 text-sm'>{error}</p>}
            {success && <p className='text-green-500 mt-2 text-sm'>Subscribed!</p>}
          </fetcher.Form>
        </section>

        <section className='self-end text-right justify-self-end md:col-start-2 lg:col-start-3'>
          <img src={logo} width='80' height='55' alt='Behangmotief' className='inline mb-4'></img>
          <p>
            <a
              href='https://instagram.com/behangmotief/'
              target='_blank'
              className='underline underline-offset-4'
              rel='noreferrer'
            >
              @behangmotief
            </a>
          </p>
          <p>www.behangmotief.be</p>
          <p>
            <a href='mailto:hallo@behangmotief.be' className='underline underline-offset-4'>
              hallo@behangmotief.be
            </a>
          </p>
        </section>
      </div>
    </footer>
  );
};
