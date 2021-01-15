import React from 'react';
import Image from 'next/image';

type NextImageProps = {
  src: string;
  alt?: string;
};

export const NextImage: React.FC<NextImageProps> = ({ src, alt, ...props }) => (
  <div
    style={{
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7fafc',
      width: '100%',
      height: '16em',
    }}
  >
    <Image {...props} src={src} alt={alt || src} layout="fill" objectFit="contain" />
  </div>
);
