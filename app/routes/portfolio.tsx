import { HeroCarousel } from '~/components/HeroCarousel';
import Lightbox from 'yet-another-react-lightbox';
import { useState, Suspense } from 'react';
import { Await, defer, Link, useLoaderData } from '@remix-run/react';
import 'yet-another-react-lightbox/styles.css';
import { checkThumbnails } from '~/lib/ownThumbnail';
import { fetcher } from '~/lib/api';
import { SearchQuery } from '~/types/wannabes.types';
import { POSTS } from '~/queries/wannabes';
import { HomepageMasonryLoadingState } from '~/components/HomepageMasonryLoadingState';
import { formatPostDate } from '~/lib/date';
import { PortfolioHeader } from '~/components/PortfolioHeader';

export const loader = async () => {
  const recentPostsPromise = fetcher<SearchQuery>(POSTS, {
    start: 0,
    limit: 6,
    all: '',
  });
  return defer({
    recentPosts: recentPostsPromise,
  });
};

export default function Portfolio() {
  const [index, setIndex] = useState(-1);
  const data = useLoaderData<typeof loader>();

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroImages = [
    {
      src: 'https://images.wannabes.be/S=W1500,H1500,PD1/hires-2023-08-25-boygenius-pukkelpop-pukkelpop-2023-pLBXC5ZZiCRvmYxfY.jpg',
      alt: 'Artist performance with stage lighting',
    },
    {
      src: 'https://images.wannabes.be/S=W1500,H1500,PD1/hires-2022-09-01-fred-again-pukkelpop-pukkelpop-2022-ddGxAQ4LgjCappsXZ.jpg',
      alt: 'Concert crowd with dramatic blue lighting',
    },
    {
      src: 'https://images.wannabes.be/S=W1500,H1500,PD1/hires-2025-03-16-brihang-coretec-dome-CJr3j5ZJ3EAJPvZHX.jpg',
      alt: 'Concert crowd with dramatic blue lighting',
    },
    {
      src: 'https://images.wannabes.be/S=W1500,H1500,PD1/hires-2023-08-25-bluai-pukkelpop-pukkelpop-2023-oJuRS65ode9TAe5JS.jpg',
      alt: 'Artist performance with stage lighting',
    },
    {
      src: 'https://images.wannabes.be/S=W1500,H1500,PD1/hires-2023-07-14-nils-frahm-bijloke-gent-jazz-2023-gB27ZRBmSDoyfiK59.jpg',
      alt: 'Artist performance with stage lighting',
    },
  ];

  return (
    <div className='w-full min-h-screen flex flex-col scroll-smooth'>
      <PortfolioHeader />
      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='relative h-[100svh] flex items-center justify-center'>
          <div className='absolute inset-0 z-0'>
            <HeroCarousel images={heroImages} />
          </div>
          <div className='z-10 text-center text-white px-4 absolute bottom-0 left-0 right-0 pb-16'>
            <h1 className='text-3xl md:text-4xl font-bold mb-2'>Capturing Moments in Music</h1>
            <p className='text-md md:text-xl mb-8'>Professional music & festival photography</p>
            <a
              href='#about'
              onClick={scrollToAbout}
              className='inline-block bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-gray-100 transition-colors'
            >
              About me 🙋‍♂️
            </a>
          </div>
        </section>

        {/* Split Section */}
        <section id='about' className='min-h-[100svh] py-16 flex items-center justify-center'>
          <div className='container mx-auto'>
            <div className='flex flex-col-reverse md:flex-row'>
              <div className='w-full md:w-1/2'>
                <div className='w-full h-[600px] cursor-zoom-in' onClick={() => setIndex(0)}>
                  <img
                    src='/cactus-grid-liggend-klein.jpg'
                    alt='Artist performance'
                    className='w-full h-full object-cover'
                  />
                </div>
                <Lightbox
                  open={index >= 0}
                  close={() => setIndex(-1)}
                  index={index}
                  slides={[{ src: '/cactus-grid-liggend-klein.jpg' }]}
                  render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                  }}
                />
              </div>
              <div className='w-full md:w-1/2 flex items-center justify-center p-8 md:p-16'>
                <div className='max-w-lg'>
                  <h2 className='text-3xl font-bold mb-6'>Capturing the Energy of Live Music</h2>
                  <p className='text-gray-600 mb-6'>
                    With years of experience in music photography, I specialize in capturing the raw
                    energy and emotion of live performances. From intimate club shows to massive
                    festival stages, I bring a unique perspective to every shot.
                  </p>
                  <p className='text-gray-600'>
                    My work focuses on creating timeless images that tell the story of each
                    performance, preserving the magic of live music for years to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className='bg-gray-100 py-32'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>What I offer</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center p-6'>
                <h3 className='text-xl font-semibold mb-4'>Festival Coverage</h3>
                <p className='text-gray-600'>
                  Seamless festival coverage with a quick turnaround—delivering high-quality visuals
                  that capture the energy and excitement of every moment.
                </p>
              </div>
              <div className='text-center p-6'>
                <h3 className='text-xl font-semibold mb-4'>Concert Photography</h3>
                <p className='text-gray-600'>
                  Professional concert photography with fast delivery, ensuring bands and venues
                  receive striking images ready for promotion and marketing as soon as the show
                  ends.
                </p>
              </div>
              <div className='text-center p-6'>
                <h3 className='text-xl font-semibold mb-4'>Curated Social Media Feeds</h3>
                <p className='text-gray-600'>
                  Effortlessly curated social media feeds with fresh, engaging content delivered
                  quickly to keep your audience captivated.
                </p>
              </div>
              <div className='text-center p-6'>
                <h3 className='text-xl font-semibold mb-4'>Workshops</h3>
                <p className='text-gray-600'>
                  I offer workshops and talks for other photographers to help them get the most out
                  of their concert photography.
                </p>
              </div>
              <div className='text-center p-6'>
                <h3 className='text-xl font-semibold mb-4'>Photo Licensing</h3>
                <p className='text-gray-600'>
                  I offer photo licensing for your projects, whether you need a single image or a
                  collection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <div className='w-full bg-black text-white'>
          <div className='py-16'>
            <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-12'>Featured Work</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                <Link to='/?search=Pukkelpop' className='group relative overflow-hidden'>
                  <img
                    src={`https://images.wannabes.be/S=W1500,H1500,PD1/hires-2022-09-01-tom-misch-pukkelpop-pukkelpop-2022-m3wSqYZ4GQkdBPjbb.jpg`}
                    alt={`Pukkelpop`}
                    className='w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <p className='text-white text-xl font-semibold'>Pukkelpop</p>
                  </div>
                </Link>
                <Link to='/?search=Gent%20Jazz' className='group relative overflow-hidden'>
                  <img
                    src={`https://images.wannabes.be/S=W1500,H1500,PD1/hires-2024-07-15-the-bony-king-of-nowhere-bijloke-gent-jazz-2024-KXsCzG2auBYwMdKr3.jpg`}
                    alt={`Gent Jazz`}
                    className='w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <p className='text-white text-xl font-semibold'>Gent Jazz</p>
                  </div>
                </Link>
                <Link to='/?search=Crammerock' className='group relative overflow-hidden'>
                  <img
                    src={`https://images.wannabes.be/S=W1500,H1500,PD1/hires-2024-09-08-equal-idiots-crammerock-crammerock-2024-ddKKYcpEnAwzu9mws.jpg`}
                    alt={`Crammerock`}
                    className='w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <p className='text-white text-xl font-semibold'>Crammerock</p>
                  </div>
                </Link>
                <Link to='/?search=Lokerse%20Feesten' className='group relative overflow-hidden'>
                  <img
                    src={`https://images.wannabes.be/S=W1024,H1024,PD1/hires-2022-08-06-froukje-lokerse-feesten-lokerse-feesten-2022-jcQohA95rNKsD6qbh.jpg`}
                    alt={`Lokerse Feesten`}
                    className='w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <p className='text-white text-xl font-semibold'>Lokerse Feesten</p>
                  </div>
                </Link>
                <Link to='/?search=Boomtown' className='group relative overflow-hidden'>
                  <img
                    src={`https://images.wannabes.be/S=W1500,H1500,PD1/hires-2024-07-20-klakmatrak-kouter-boomtown-2024-2erJnb73JKSBtsdhy.jpg`}
                    alt={`Boomtown`}
                    className='w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <p className='text-white text-xl font-semibold'>Boomtown</p>
                  </div>
                </Link>
                <Link to='/?search=Cactusfestival' className='group relative overflow-hidden'>
                  <img
                    src={`https://images.wannabes.be/S=W1500,H1500,PD1/hires-2023-07-10-shame-minnewaterpark-cactus-festival-2023-7NHWu3ePc4z2NJpfL.jpg`}
                    alt={`Cactusfestival`}
                    className='w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <p className='text-white text-xl font-semibold'>Cactusfestival</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <section className='container mx-auto px-4 py-32'>
          <div className='max-w-2xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-6'>Let&apos;s Work Together</h2>
            <p className='text-gray-600 mb-8'>
              Ready to capture your next event or create stunning portraits? Get in touch to discuss
              your project.
            </p>
            <a
              href='mailto:hallo@behangmotief.be'
              className='inline-block bg-black text-white px-8 py-3 text-lg font-semibold hover:bg-gray-800 transition-colors'
            >
              Contact Me
            </a>
          </div>
        </section>

        <Suspense fallback={<HomepageMasonryLoadingState />}>
          <Await resolve={data.recentPosts}>
            {({ posts: { data } }) => (
              <div className='w-full bg-black text-white'>
                <div className='py-16'>
                  <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-12'>Recent Work</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                      {data
                        .map(checkThumbnails)
                        .slice(0, 6)
                        .map((post) => (
                          <Link
                            to={`/album/${post.slug}`}
                            key={post.id}
                            className='group relative overflow-hidden'
                          >
                            <img
                              src={`https://images.wannabes.be/S=W1500,H1500,PD1/${post.thumbnail.hires}`}
                              alt={post.artist.name}
                              className='w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                            <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                              <div className='text-center'>
                                <p className='text-white text-xl font-semibold'>
                                  {post.artist.name}
                                </p>
                                <p className='text-white/80 text-sm mt-1'>
                                  {formatPostDate(post.date) + ', ' + post.venue.name}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Await>
        </Suspense>

        {/* Archive Section */}
        <section className='container mx-auto px-4 py-32'>
          <div className='max-w-2xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-6'>Browse my archive</h2>
            <p className='text-gray-600 mb-8'>
              Search photos by artist, venue or festival. Go through my archive of over 6 years of
              music photography.
            </p>
            <a
              href='/'
              className='inline-block bg-black text-white px-8 py-3 text-lg font-semibold hover:bg-gray-800 transition-colors'
            >
              Browse Archive
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
