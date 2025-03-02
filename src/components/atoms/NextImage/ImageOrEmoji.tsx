import React, { CSSProperties } from 'react';
import Image, { ImageProps } from 'next/image';
import { Center, Text, TypographyProps } from '@chakra-ui/react';

export type NextImageOrEmojiProps = Omit<ImageProps, 'alt' | 'width' | 'height'> & {
  src?: string;
  emoji?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: string;
  fontSize?: TypographyProps['fontSize'];
  divStyle?: CSSProperties;
};

export const NextImageOrEmoji: React.FC<NextImageOrEmojiProps> = ({
  src,
  emoji,
  alt,
  width,
  height,
  objectFit,
  fontSize,
  divStyle,
  ...props
}) =>
  src ? (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: width ?? '100%',
        height: height ?? '16em',
        backgroundColor: '#f7fafc',
        ...divStyle,
      }}
    >
      <Image
        {...props}
        src={src}
        alt={alt ?? src}
        fill
        style={{ objectFit: (objectFit as CSSProperties['objectFit']) ?? 'cover' }}
      />
    </div>
  ) : (
    <Center>
      <Text fontSize={fontSize || '64px'}>{emoji ?? '📝'}</Text>
    </Center>
  );
