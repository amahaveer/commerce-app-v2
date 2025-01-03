'use client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { sdk } from '@royalcyber/unified-sdk';
import { cartService } from '@/lib/commerceTools/cartService';
import { useAccount } from '@/context/AccountContext';

// Define the validation schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(3, { message: 'Password must be at least 8 characters long' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface PendingCartItem {
  sku: string;
  quantity: number;
  productData: {
    name: string;
    price: number;
  };
  returnUrl: string;
}

const LogInForm: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { accountLoading, loggedIn, login } = useAccount();
  const t = useTranslations('login');


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!accountLoading && loggedIn) {
      router.push('/');
    }
    sdk.defaultConfigure('en');

  }, [accountLoading, loggedIn]);

  const handlePendingCartItem = async () => {
    const pendingItemJson = localStorage.getItem('pendingCartItem');
    if (!pendingItemJson) return null;

    try {
      const pendingItem: PendingCartItem = JSON.parse(pendingItemJson);

      // Check if cart exists
      const cartExists = await cartService.checkCartExists();
      if (!cartExists) {
        await cartService.createCart();
      }

      // Add item to cart
      await cartService.addLineItem(pendingItem.sku, pendingItem.quantity);

      // toast({
      //   title: "Success",
      //   description: `${pendingItem.productData.name} has been added to your cart`,
      //   variant: "default",
      // });

      localStorage.removeItem('pendingCartItem');
      return pendingItem.returnUrl;
    } catch (error) {
      console.error('Error handling pending cart item:', error);
      // toast({
      //   title: "Error",
      //   description: "Failed to add item to cart. Please try again.",
      //   variant: "destructive",
      // });
      return null;
    }
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    setLoginError(null);
    sdk.defaultConfigure('en');

    try {
      const result: any = await login(data);
      if (result.data.status === 'success') {
        router.push("/");
      }
      // if (!result.success) {
      //   throw new Error(result.data.message || 'Login failed');
      // }
      const returnUrl = await handlePendingCartItem();
      // if (returnUrl) {
      //   router.push(returnUrl);
      // } else {
      //   router.push('/');
      // }
      // router.refresh();
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(
        'Login failed. Please check your credentials and try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{t('login')}</CardTitle>
        <CardDescription>{t('heading')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register('email')}
              className="flex h-10 w-full rounded-md px-3 py-2 text-sm bg-transparent focus:outline-none border border-[#2E2E2E] autofill:bg-transparent"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="flex h-10 w-full rounded-md px-3 py-2 text-sm bg-transparent focus:outline-none border border-[#2E2E2E] autofill:bg-transparent"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          {loginError && (
            <Alert variant="destructive">
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('logging_in') : t('login')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LogInForm;
