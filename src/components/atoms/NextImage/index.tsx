import React, { CSSProperties } from 'react';
import Image, { ImageProps } from 'next/image';

type NextImageProps = ImageProps & {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  divStyle?: CSSProperties;
};

export const NextImage: React.FC<NextImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit,
  divStyle,
  ...props
}) => (
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
      ...divStyle,
    }}
  >
    <Image {...props} src={src} alt={alt ?? src} layout="fill" objectFit={objectFit ?? 'contain'} />
  </div>
);
