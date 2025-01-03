'use client';

import { Tooltip } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export function NavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Tooltip title={label} arrow>
      <Link
        href={href}
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
          {
            'bg-accent text-black': pathname === href
          }
        )}
      >
        {children}
        <span className="sr-only">{label}</span>
      </Link>
    </Tooltip>
  );
}