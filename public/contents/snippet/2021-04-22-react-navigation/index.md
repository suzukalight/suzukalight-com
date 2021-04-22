---
title: React Navigation
date: '2021-04-22T01:00:00'
category: Snippet
tags: ['react-native', 'react-navigation', 'typescript']
status: 'published'
---

## インストール

yarn でパッケージをインストールする；

```bash
yarn add @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
```

Expo に関連パッケージを認識させるために、`expo install` を実行；

```bash
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

## Stack ナビゲーションの作成

```tsx
export type RootStackParamList = {
  Main: undefined;
  SignUp: undefined;
};
```

routes.ts を作成し、ルーティング情報を型として定義します。undefined になっているところは、ルーティングする際に id や order などの情報を追加付与する際に、その型情報を記載する箇所です。（引数がなければ undefined で構いません）

```tsx
import { RootStackParamList } from './routes';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignUp } from './SignUp';
import { Main } from './Main';

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ title: 'メイン画面' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'メンバー登録' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

- name がルーティング名になる。大文字小文字を無視する。大文字含む名称が推奨されている
- createStackNaviagtor に型を付ける。各コンポーネントの引数をまとめた型を作ると、name に型制約がつく
- [options で表示名などを指定できる](https://reactnavigation.org/docs/stack-navigator/)

## 各 Screen の作成

```tsx
import React from 'react';
import { StackNavigatStackScreenPropsionProp } from '@react-navigation/stack';

import { RootStackParamList } from '../Navigation';

export type MainProps = StackScreenProps<RootStackParamList, 'Main'>;

export const Main = ({ navigation }: MainProps) => (
  <Box w="100%" maxW="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
    <VStack spacing={4} h="100%" px={4} py={8} bgColor={palette.white}>
      <Typography color={palette.brown} fontSize="xx-large">
        メイン画面
      </Typography>

      <Center>
        <Button label="メンバー登録" onPress={() => navigation.navigate('SignUp')} />
      </Center>
    </VStack>
  </Box>
);
```

- RootStackParamList をもとに `MainNavigationProps` を作る
- Main コンポーネントに react-navigation から navigation が渡されるので、それをもとにスタック制御をする
- `navigation.navigate(name)` で対象の画面へ遷移できる

## 引数の授受（`/users/:id` のようなもの）

```tsx
export type RootStackParamList = {
  Main: undefined;
  SignUp: undefined;
  UserDetail: { id: string }; // 受け渡ししたい引数を定義する
};
```

引数として渡したいパラメータの型定義を付与する。

```tsx
<Button label="ユーザ画面" onPress={() => navigation.navigate('UserDetail', { id: '42' })} />
```

任意の画面で navigate を呼び出すと、引数に型がついており、正しい引数だけを渡せるようになっている。

```tsx
export type UserDetailProps = StackScreenProps<RootStackParamList, 'UserDetail'>;

export const UserDetail = ({ navigation, route }: UserDetailProps) => (
  <Box w="100%" maxW="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
    <VStack spacing={4} h="100%" px={4} py={8} bgColor={palette.white}>
      <VStack spacing={4}>
        <Typography color={palette.brown} fontSize="xx-large">
          {`ユーザ画面　id=${route.params.id}`}
        </Typography>
      </VStack>

      <Center>
        <Button label="メイン画面へ戻る" onPress={() => navigation.navigate('Main')} />
      </Center>
    </VStack>
  </Box>
);
```

- `route.params` に型がついた props が渡されるので、これを利用すれば OK。
- `setParams` でパラメータの更新が可能
- `initialParams` を指定しておくことが可能
- 親画面の params を書き換えることも可能（e.g.ユーザ作成してユーザが増えた）。この場合は navigate か goBack に引数を指定すれば良い。`{merge: true}`すると合成してくれる模様。

## ヘッダのスタイリング

```tsx
export const Navigation = () => {
  const theme = useContext<ThemeColors>(ThemeContext);
  const screenOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: theme.secondary },
    headerTintColor: palette.white,
    headerTitleStyle: { fontWeight: 'bold' },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={screenOptions}>
        <Stack.Screen name="Main" component={Main} options={{ title: 'メイン画面' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

- Navigator に `screenOptions` を指定すると、ヘッダスタイルを変更できる
- スタイルではなくコンポーネントを指定することも可能
- 個別の Screen に対して screenOptions を指定することもできる

## タブナビゲーションの追加

```tsx
import { RouteProp } from '@react-navigation/core';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

// main tab に属する screen 一覧
export type MainTabParamList = {
  Home: undefined;
  UserDetail: { id: string };
};

// route.name と iconName をマッチさせる辞書
const tabIconNames: Record<keyof MainTabParamList, string> = {
  Home: 'home',
  UserDetail: 'user',
};

// route.name と color, size を使って Feather アイコンをレンダリング
const getScreenOptions = (route: RouteProp<MainTabParamList, keyof MainTabParamList>) =>
  ({
    tabBarIcon: ({ color, size }) => (
      <Feather name={tabIconNames[route.name]} size={size} color={color} />
    ),
  } as BottomTabNavigationOptions);

// 下タブのナビゲーションを作成
const Tab = createBottomTabNavigator<MainTabParamList>();

export const Main = () => {
  const theme = useContext<ThemeColors>(ThemeContext);

  // タブのアクティブ・インアクティブカラーを設定
  const tabBarOptions: BottomTabBarOptions = {
    activeTintColor: theme.secondary,
    inactiveTintColor: palette.gray,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => getScreenOptions(route)}
      tabBarOptions={tabBarOptions}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="UserDetail" component={UserDetail} initialParams={{ id: '42' }} />
    </Tab.Navigator>
  );
};
```

- `createBottomTabNavigator` で下タブのナビゲーションを作成できる
- `tabBarOptions` でアクティブカラーなどを設定できる
- タブアイコンやアクティブ状態などは、専用のレンダリング関数を作って変更する
  - Tab.navigator#screenOptions へ route を引数とした関数を登録できる
  - 受け取った route と、tabBarIcon から受け取れる color, size などを使い、アイコンのレンダリングを行う

## ナビゲーションのネスト

```tsx
export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Modal" component={Modal} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  </NavigationContainer>
);
```

- Root: `StackNav`
  - Modal
  - Auth: `StackNav`
    - SignIn
    - SignUp
  - Main: `BottomTabNav`
    - Home
    - UserDetail

こんな感じでネストしてナビゲーションを作成できる。

- 子ナビゲーションごとにヒストリが作成される
- 子ナビゲーション間で情報の共有はない
- 子ナビゲーションでハンドルできなかったナビは、親にバブリングされる
- 親ナビゲーションの情報は、子ナビゲーションには伝達されない
- 親子それぞれにナビゲーション UI があった場合は、重複してレンダリングされる

ネストしたスクリーンへ props を渡したい場合は、`screen, params` を指定すれば良い。さらにネストした指示もできる。

```tsx
navigation.navigate('Root', {
  screen: 'Settings',
  params: { user: 'jane' },
});
```

### references

- [Getting started | React Navigation](https://reactnavigation.org/docs/getting-started)
- [Expo + React Navigation V5 + GraphQL + TypeScript で Native & Web（SSR）のユニバーサルアプリ開発 | GMO インターネットグループ 次世代システム研究室](https://recruit.gmo.jp/engineer/jisedai/blog/expo-web/)
