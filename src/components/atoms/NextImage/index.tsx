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
      width: width ?? '100%',
      height: height ?? '16em',
      marginBottom: '1.75em',
      backgroundColor: '#f7fafc',
    }}
  >
    <Image {...props} src={src} alt={alt ?? src} layout="fill" objectFit={fit ?? 'contain'} />
  </div>
);
