---
title: React Native で styled-components を使う
date: '2021-04-06T01:00:00'
category: Snippet
tags: ['react-native', 'styled-components', 'css', 'theme', 'typescript']
status: 'published'
---

## インストール

yarn でパッケージをインストールする。types が別パッケージ、かつ React Native のものはさらに別パッケージになっているので、すべてインストールする。

```bash
yarn add styled-components
yarn add -D @types/styled-components @types/styled-components-react-native
```

## React Native のコンポーネントをスタイリングする

`styled` を import し、それを経由してスタイリングしたいコンポーネントを指定する。スタイリングには CSS 構文が利用できる。

```tsx
import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

export const VStackStyled = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export type VStackProps = {
  children?: ReactNode;
};

export const VStack = ({ children }: VStackProps) => <VStackStyled children={children} />;
```

## 変数を使う

props を args とした関数を使うと、props を取り出すことができる。この値を加工して CSS として有効な値に変換する

```tsx
import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

export type HStackProps = {
  w?: number | string;
  maxW?: number | string;
};

export const HStack = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;

  width: ${({ w }: HStackProps) => w ?? 'auto'};
  max-width: ${({ maxW }: HStackProps) => maxW ?? 'auto'};
`;
```

## テーマ

`ThemeProvider` を使ってテーマ変数を供給する。

```tsx
export const themeColors: ThemeColors = {
  primary: colorPalettes.indigo,
  secondary: colorPalettes.brown,
};

const App = () => <ThemeProvider theme={themeColors}>...</ThemeProvider>;
```

利用する側は `useContext` を使って取り出すと良い。

```tsx
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components/native';

import { ThemeColors } from '../../styles/color';

type ButtonStyledProps = {
  theme: ThemeColors;
};

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }: ButtonStyledProps) => theme.primary};
`;

export const Button = ({ onPress, title }: ButtonProps) => {
  const theme = useContext<ThemeColors>(ThemeContext);

  return (
    <ButtonContainer activeOpacity={0.75} onPress={onPress} theme={theme}>
      <ButtonText fontSize="large">{title}</ButtonText>
    </ButtonContainer>
  );
};
```

## 注意点

- `styled` は `styled-components/native` から import するが、ほかのものは `styled-components` から import することが多いため、どちらを参照すべきかに注意を払う
- React Native 版の styled-components では隣接セレクタは使用できない。ほか CSS の機能を使う場合には、Web 版で実現できたことが React Native 版では実現できない場合があるかもしれないので、公式ドキュメントを随時確認する

### references

- [Node.js のアンインストールができない場合(currently-active) | WEBREE](https://webree.jp/article/nodejs-uninstall-currently-active/)
- [nvm(Node Version Manager)のアンインストール(削除) | WEBREE](https://webree.jp/article/nvm-uninstall/)
- [nvm でインストールした node.js のアンインストール | tkd55](https://www.tkd55.net/?p=1311)
- [nodenv を使って Mac に Node.js の環境を構築する - Qiita](https://qiita.com/1000ch/items/41ea7caffe8c42c5211c)
- [nodenv の環境構築](https://qiita.com/282Haniwa/items/a764cf7ef03939e4cbb1)
