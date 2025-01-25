import classNames from 'classnames';

interface Props {
  className?: string;
}

export const RelatedContentRowLoadingState = ({ className }: Props) => (
  <section className={classNames('container', className)}>
    <h2 className='text-2xl font-bold mb-4 text-slate-400'>Loading related content...</h2>
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='drop-shadow'>
          <div className='animate-pulse bg-slate-200 pt-[100%] max-w-[100%]' />
        </div>
      ))}
    </div>
  </section>
);
