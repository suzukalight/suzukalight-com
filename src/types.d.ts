// react-shareの型定義の問題を回避
declare module 'react-share' {
  export interface ShareButtonProps {
    [key: string]: unknown;
  }

  export class TwitterShareButton extends React.Component<ShareButtonProps> {}
  export class FacebookShareButton extends React.Component<ShareButtonProps> {}
  export class LineShareButton extends React.Component<ShareButtonProps> {}
  export class PocketShareButton extends React.Component<ShareButtonProps> {}
  export class HatenaShareButton extends React.Component<ShareButtonProps> {}
}
