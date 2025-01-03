import React, { useEffect, useState } from 'react';
import { client } from '@/lib/contentful/client';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';


export function ImageRowSkeleton({ count = 5 }: { count?: number }) {
    return (
      <div className="flex flex-row items-center">
        {Array(count).fill(0).map((_, index) => (
          <div key={index} className="flex flex-col items-center bg-white m-2">
            <Skeleton className="w-[75px] h-[75px] rounded-md" />
          </div>
        ))}
      </div>
    )
  }


const HomeBanner: React.FC = () => {
  const [contentfulData, setContentfulData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await client.getEntry('DgTKXofUcFaX0xmqLPsfj');
        setContentfulData(data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <ImageRowSkeleton/>;
  if (error) return <div>{error}</div>;

  const { content } = contentfulData?.fields.title || {};

  return (
    <div className="flex flex-row items-center">
      {content?.map((data: any, index: number) => {
        const imageFields = data?.data?.target?.fields;

        if (!imageFields) return null; // Skip if no image data

        return (
          <div key={index} className="flex flex-col items-center bg-white m-2">
            <Link href={`en/${imageFields.title}`}>
              <Image
                className='hover:grayscale'
                alt={imageFields.description}
                src={`https:${imageFields.file.url}`} // Ensure HTTPS is added
                width={75}
                height={75}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default HomeBanner;
