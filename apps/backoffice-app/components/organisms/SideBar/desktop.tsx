'use client';

import { UsersIcon } from '@/components/icons';
import {
  AccountTree as AccountTreeIcon,
  Discount as DiscountIcon,
  BarChart as LineChartIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Tooltip } from '@mui/material';
import clsx from 'clsx';
import { Box } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const menuData = [
  {
    label: 'Dashboard',
    href: '#',
    icon: HomeOutlinedIcon,
    submenu: []
  },
  {
    label: 'Orders',
    href: '/orders',
    icon: ShoppingCartIcon
  },
  {
    label: 'Products',
    href: '/products',
    icon: Box,
    submenu: [
      { label: 'Product list', href: '/products' },
      { label: 'Review modified products', href: '#' },
      { label: 'Add product', href: '#' },
      { label: 'Product Selection list', href: '/products/product-selections' },
      {
        label: 'Add Product Selection',
        href: '/products/product-selections/new'
      }
    ]
  },
  {
    label: 'Category',
    href: '/categories',
    icon: AccountTreeIcon,
    submenu: [
      { label: 'Category List', href: '/categories' },
      { label: 'Category Search', href: '/categories/search' },
      { label: 'Customer Group List', href: '#' }
    ]
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: UsersIcon,
    submenu: [
      { label: 'Customers List', href: '/customers' },
      { label: 'Add Customer', href: '#' },
      { label: 'Customer Group List', href: '/customers/customer-groups' },
      { label: 'Add Customer Group', href: '/customers/customer-groups/new' }
    ]
  },
  {
    label: 'Discounts',
    href: '/discounts',
    icon: DiscountIcon,
    submenu: [
      { label: 'Product discount list', href: '/discounts' },
      { label: 'Cart discount list', href: '/discounts/carts' },
      { label: 'Discount code list', href: '#' },
      { label: 'Add discount', href: '#' },
      {
        label: 'Generate discount code',
        href: '#'
      }
    ]
  },

  {
    label: 'Analytics',
    href: '#',
    icon: LineChartIcon,
    submenu: []
  }
];

function NavItem({
  href,
  label,
  children,
  submenu,
  isSidebarOpen
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  submenu?: { label: string; href: string }[];
  isSidebarOpen: boolean;
}) {
  const pathname = usePathname();
  const isSelected = pathname === href;
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tooltip title={label} arrow>
        <Link
          href={href}
          className={clsx(
            'flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 text-white',
            {
              'bg-customBlue-moderate text-white': isSelected && !isSidebarOpen,
              'bg-blue-800 text-white':
                !isSelected && !isClicked && isHovered && !isSidebarOpen,
              'bg-light-blue-300': isClicked && !isSidebarOpen
            }
          )}
          onClick={() => setIsClicked(!isClicked)}
        >
          <span
            className={clsx('transition-transform duration-300 max-w-16', {
              'scale-125': isHovered
            })}
          >
            {children}
          </span>
        </Link>
      </Tooltip>

      {isHovered && submenu && submenu.length > 0 && (
        <ul
          className={clsx(
            'absolute z-40 top-0 w-56 bg-white shadow-lg rounded-lg p-2 transition-all duration-300',
            {
              'left-14': !isSidebarOpen,
              'left-56': isSidebarOpen
            }
          )}
        >
          {submenu.map((item, index) => (
            <li
              key={index}
              className="py-4 px-4 font-medium cursor-pointer hover:bg-gray-200 rounded"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const DesktopSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside
      className={clsx(
        'h-[100%] inset-y-0 min-w-16 left-0  z-10 hidden flex-col border-r bg-sidemenu sm:flex transition-width duration-300',
        {
          'w-14 items-center': !isSidebarOpen,
          'w-64 items-start pl-4': isSidebarOpen
        }
      )}
    >
      <nav className="flex flex-col min-w-20 items-center gap-4 sm:py-5">
        {menuData.map((item, index) => (
          <NavItem
            key={index}
            href={item.href}
            label={item.label}
            submenu={item.submenu}
            isSidebarOpen={isSidebarOpen}
          >
            <div className="flex items-center gap-2">
              {isSidebarOpen ? (
                <>
                  <span className="flex">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <span className="ml-2">{item.label}</span>
                </>
              ) : (
                <item.icon className="h-6 w-6" />
              )}
            </div>
          </NavItem>
        ))}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          onClick={toggleSidebar}
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>
      </nav>
    </aside>
  );
};

export default DesktopSideBar;
