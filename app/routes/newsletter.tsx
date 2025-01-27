import { useFetcher } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

type SubscribeResponse = { error?: string; success?: boolean };

export const meta: MetaFunction = () => {
  return [
    { title: 'Newsletter | Behangmotief — Music & festival photographer' },
    { name: 'description', content: 'Subscribe to the Behangmotief quarterly newsletter' },
  ];
};

export default function Subscribe() {
  const fetcher = useFetcher<SubscribeResponse>();
  const error = fetcher.data?.error;
  const success = fetcher.data?.success;

  return (
    <main
      className='relative w-full min-h-[calc(100vh-150px)] container'
      style={{
        backgroundImage:
          'url(https://r.wannabes.be/S=W1500,H1500,PD2/hires-2022-09-01-fred-again-pukkelpop-pukkelpop-2022-ddGxAQ4LgjCappsXZ.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <div className='relative z-10 min-h-[calc(100vh-150px)] flex flex-col'>
        <div className='flex-1 flex items-center justify-center px-4'>
          <div className='w-full max-w-xl bg-black p-8 text-white'>
            <h3 className='text-xl uppercase mb-4 font-semibold border-b-2 border-white'>
              Stay in touch
            </h3>
            <p className='mb-2'>
              I&apos;m starting a quartery newsletter to share updates about my work. Leave your
              mail address to stay in touch.
            </p>
            <fetcher.Form className='flex flex-col w-full' method='post' action='/api/subscribe'>
              <div className='flex w-full'>
                <input type='hidden' name='origin' value='WEBSITE_SUBSCRIBE_PAGE' />
                <input
                  type='email'
                  name='email'
                  placeholder='Your email'
                  className='appearance-none rounded-none p-4 text-lg bg-black text-white w-full border-b-4 border-white'
                />

                <button
                  type='submit'
                  className='text-white py-2 px-4'
                  disabled={fetcher.state === 'submitting'}
                >
                  {fetcher.state === 'submitting' ? 'Signing up...' : 'Signup'}
                </button>
              </div>
              {error && <p className='text-red-500 mt-4'>{error}</p>}
              {success && <p className='text-green-500 mt-4'>Subscribed!</p>}
            </fetcher.Form>
          </div>
        </div>
      </div>
    </main>
  );
}
