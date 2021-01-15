import React from 'react';
import Image, { ImageProps } from 'next/image';

type NextImageProps = {
  src: string;
  alt?: string;
  width: string;
  height: string;
  fit: ImageProps['objectFit'];
};

export const NextImage: React.FC<NextImageProps> = ({ src, alt, width, height, fit, ...props }) => (
  <div
    style={{
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7fafc',
      width: width ?? '100%',
      height: height ?? '16em',
    }}
  >
    <Image {...props} src={src} alt={alt ?? src} layout="fill" objectFit={fit ?? 'contain'} />
  </div>
);
