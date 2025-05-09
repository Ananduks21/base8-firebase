import type React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // No custom props needed for now
}

const Logo: React.FC<LogoProps> = (props) => (
  <svg
    width="100"
    height="36"
    viewBox="0 0 100 36"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Base8 Logo"
    {...props}
  >
    <text
      x="0"
      y="28"
      fontFamily="var(--font-geist-sans), Arial, sans-serif"
      fontSize="30"
      fontWeight="bold"
    >
      Base8
    </text>
  </svg>
);

export default Logo;
