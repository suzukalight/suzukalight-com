import React, { CSSProperties } from 'react';
import Image, { ImageProps } from 'next/image';
import { Center, Text, TypographyProps } from '@chakra-ui/react';

type NextImageOrEmojiProps = ImageProps & {
  src?: string;
  emoji?: string;
  alt?: string;
  width?: string;
  height?: string;
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
        marginBottom: '1.75em',
        backgroundColor: '#f7fafc',
        ...divStyle,
      }}
    >
      <Image
        {...props}
        src={src}
        alt={alt ?? src}
        layout="fill"
        objectFit={objectFit ?? 'contain'}
      />
    </div>
  ) : (
    <Center>
      <Text fontSize={fontSize || '64px'}>{emoji ?? '📝'}</Text>
    </Center>
  );
