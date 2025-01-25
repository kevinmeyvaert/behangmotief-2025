interface Props {
  searchQuery: string | null;
}

export const NoSearchResults = ({ searchQuery }: Props) => (
  <div className='py-20 flex items-center justify-center flex-col'>
    <h1 className='text-4xl font-bold'>No results found for &quot;{searchQuery}&quot; 🥹</h1>
    <p className='text-gray-500 mb-5'>
      If you want to hire me to shoot {searchQuery}, please contact me at using the big button below
      🫡
    </p>
    <a
      className='flex items-center justify-center bg-black text-white px-4 min-h-10'
      href={`mailto:hallo@behangmotief.be?subject=Contact for ${searchQuery}`}
    >
      Hire me!
    </a>
  </div>
);
