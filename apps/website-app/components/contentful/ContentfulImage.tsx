"use server"
import Image, { ImageProps } from 'next/image';

interface CustomImageProps extends ImageProps {
  src: string;
}

const ContentfulImage: React.FC<CustomImageProps> = ({ src, width, height, ...props }) => {
  const httpsSrc = `https:${src}`;

  return (
    <Image
      src={httpsSrc}
      width={width}
      height={height}
      {...props}
    />
  );
};


export default ContentfulImage;
