'use client';

import { useState, useEffect } from 'react';
import { AccountMenu } from '../account/Account';
import CartIcon from './CartIcon';
import CurrencySelector from './CurrencySelector';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import { NavigationMenuDemo } from './Navigation';
import SearchInput from './SearchInput';
import { HeartIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { categoryService } from '@/lib/commerceTools/categoriesService';
import { getLocale } from '@/utils/locale';
import { useCookies } from 'next-client-cookies';
import NavigationModal from './NavigationModal';
import HomeBanner from './HomeBanner';
import { useCart } from '@/context/CartContext';
import { useWishList } from '@/context/WishListContext';
import { Category } from '@royalcyber/global-types';

const Header = () => {
  const cookies = useCookies();
  const { cartCount } = useCart();
  const { wishListCount } = useWishList()
  const [openNavModal, setOpenNavModal] = useState<boolean>(false);
  const [openCategoryList, setOpenCategoryList] = useState<boolean>(false);
  // const [categories, setCategories] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const currentLocale =
    typeof window !== 'undefined' ? cookies.get('NEXT_LOCALE') : 'en';
  const locale = getLocale(currentLocale as string);

  const toggleCategoryList = () => {
    setOpenCategoryList(!openCategoryList);
  };

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const response = await categoryService.fetchCategories()
        setCategories(response);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  return (
    <div>
      <div className="flex p-6 font-bold w-full lg:hidden bg-blend-overlay">
        <div className="flex justify-start">
          <p> Bonelli</p>
        </div>
        <div className="flex ml-auto gap-6">
          <CartIcon />
          <HamburgerMenuIcon
            className="h-6 w-6"
            onClick={() => setOpenNavModal(true)}
          />
        </div>
      </div>
      {openNavModal &&
        NavigationModal({
          setOpenNavModal,
          toggleCategoryList,
          openCategoryList,
          categories,
          locale,
        })}
      <div className="hidden lg:block">
        <section className="z-10 flex items-center justify-between px-32 border-b border-gray-200 py-3">
          <span>+91 67289329847</span>
          <HomeBanner />
          <section className="flex gap-3">
            <LanguageSelector />
            <CurrencySelector />
          </section>
        </section>
        <section className="flex items-center justify-between h-20 px-20">
          <NavigationMenuDemo results={categories || []} loading={loading} />
          <Link href="/" className="pr-20">
            <Logo />
          </Link>
          <section className="flex gap-4 items-center">
            <SearchInput />
            <Link href="/wishlist" className="relative flex items-center">
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-sm rounded-full px-1">
                {wishListCount}
              </span>
              <HeartIcon className="h-6 w-6" />
            </Link>
              <Link href="/cart" className="relative flex items-center">
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-sm rounded-full px-1">
                  {cartCount}
                </span>
                <CartIcon className="cart-icon" />
              </Link>
            <AccountMenu />
          </section>
        </section>
      </div>
    </div>
  );
};

export default Header;
