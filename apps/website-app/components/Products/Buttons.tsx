import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';``
interface CustomButtonProps {
  href: string; // Define 'href' as a string
  children: React.ReactNode; // Define 'children' to be any valid React node
  className?: string; // Make 'className' optional
}

const Buttons: React.FC<CustomButtonProps> = ({
  href,
  children,
  className = '',
}) => {
  return (
    <Link href={href}>
      <Button className={`rounded-none ${className}`}>{children}</Button>
    </Link>
  );
};

export default Buttons;
