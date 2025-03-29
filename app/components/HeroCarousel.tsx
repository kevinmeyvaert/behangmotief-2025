import { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface HeroCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export function HeroCarousel({ images }: HeroCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <Carousel className='w-full h-full overflow-hidden' plugins={[plugin.current]}>
      <CarouselContent className='h-full'>
        {images.map((image, index) => (
          <CarouselItem key={index} className='h-full'>
            <div className='relative h-full'>
              <img
                src={image.src}
                alt={image.alt}
                className='w-full h-[100svh]  h-full object-cover'
              />
              <div className='absolute inset-0 bg-black/30' />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-4' />
      <CarouselNext className='right-4' />
    </Carousel>
  );
}
