// Chakra UIの型定義の問題を回避するための型定義
import { ChakraProps, SystemProps } from '@chakra-ui/react';

// Chakra UIのpropsの型を緩和
declare module '@chakra-ui/react' {
  interface ChakraProps {
    [key: string]: any;
  }
  
  interface SystemProps {
    [key: string]: any;
  }
}

// react-shareの型定義の問題を回避
declare module 'react-share' {
  export interface ShareButtonProps {
    [key: string]: any;
  }
  
  export class TwitterShareButton extends React.Component<ShareButtonProps> {}
  export class FacebookShareButton extends React.Component<ShareButtonProps> {}
  export class LineShareButton extends React.Component<ShareButtonProps> {}
  export class PocketShareButton extends React.Component<ShareButtonProps> {}
  export class HatenaShareButton extends React.Component<ShareButtonProps> {}
}

// next-mdx-remoteの型定義の問題を回避
declare module 'next-mdx-remote/types' {
  export namespace MdxRemote {
    interface Components {
      [key: string]: any;
    }
  }
} 