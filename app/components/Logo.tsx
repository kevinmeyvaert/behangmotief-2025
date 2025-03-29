interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 200 50'
      className={className}
      aria-label='Behangmotief'
    >
      <text
        x='10'
        y='35'
        fontFamily='system-ui'
        fontSize='24'
        fontWeight='bold'
        className='fill-current'
      >
        BEHANGMOTIEF
      </text>
    </svg>
  );
}
