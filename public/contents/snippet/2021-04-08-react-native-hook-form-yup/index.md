---
title: React Native のフォーム処理（react-hook-form + yup）
date: '2021-04-08T01:00:00'
category: Snippet
tags: ['react-native', 'react-hook-form', 'yup', 'typescript']
status: 'published'
---

TL;DR

## react-hook-form の特徴

パフォーマンスにフォーカスしており、redux-form や formik より高速に動作することを謳っている。その方法論として「非同期コントロール」であることを打ち出している（redux-form や formik は同期型）。

値の保持については DOM 側にまかせ、その変更を addEventListener を介して検知するという手法をとっている模様。同期型だと値の変更ごとに書き換え（＝再レンダリング）が必要だったのに対し、非同期型の場合は値の変更そのものは DOM 処理のため、React による再レンダリングは発生しない。これによりマウント後の高速性を担保している。

## インストール

yarn でパッケージをインストールする；

```bash
yarn add react-hook-form yup @hookform/resolvers
```

## ベースになるテキスト入力コンポーネントの作成

```tsx
import React, { ReactNode } from 'react';
import { TextInput as RnTextInput } from 'react-native';

import { Typography } from '../../atoms/Typography';

export type TextInputProps = TextInputStyledProps & {
  label?: ReactNode;
  value?: any;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
};

export const TextInput = ({ label, ...props }: TextInputProps) => {
  return (
    <>
      {label && (
        <Typography w="100%" textAlign="left">
          {label}
        </Typography>
      )}
      <RnTextInput {...props} />
    </>
  );
};
```

`value` `onBlur` `onChangeText` などが RHF から渡されるので、それを react-native の TextInput に引き渡している。ほかに styled-components によるスタイリングも行っているが、解説の範囲外につき省略。

## ベースコンポーネントを RHF の Controller でラップ

```tsx
import React from 'react';
import { FieldValues, Controller, DeepMap, FieldError } from 'react-hook-form';

import { TextInput, TextInputProps } from './TextInput';
import { Typography } from '../../atoms/Typography';

import { RhfProps } from '../type';
import { palette } from '../../styles/color';

export type RhfTextInputProps<T extends FieldValues> = TextInputProps & RhfProps<T>;

export const RhfTextInput = <T extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  ...styles
}: RhfTextInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
        <>
          <TextInput
            {...styles}
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
          />
          {errors[name] && (
            <Typography w="100%" textAlign="left" color={palette.red}>
              {(errors[name] as DeepMap<FieldValues, FieldError>)?.message}
            </Typography>
          )}
        </>
      )}
    />
  );
};
```

RHF では React の ref を使って DOM を監視しているが、React Native の場合はこの手法が使えない。かわりに Controller というラッパーコンポーネントを提供しており、これが値の同期を行ってくれる。RN で RHF を使う場合は、基本的に Controller で囲うことが前提になりそうだ。

Controller は render props によって対象のフィールドへ付与してほしい `value` `onBlur` `onChangeText` などを渡してくるので、これを先程作ったベースコンポーネントに渡す。

バリデーションエラーは `formState.errors[name].message` に入っているので、これが存在する場合はエラー内容を表示するよう、コンポーネントの振る舞いを追加する。

## Form を作成

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { VStack } from './atoms/VStack';
import { Button } from './atoms/Button';
import { RhfTextInput } from './forms/TextInput/ReactNative';

type FormData = {
  username: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const FormSample = () => {
  const { control, handleSubmit } = useForm<FormData>({ resolver: yupResolver(schema) });
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <VStack spacing={4} w="100%">
      <RhfTextInput control={control} name="username" label="ユーザ名" />
      <RhfTextInput control={control} name="password" label="パスワード" />

      <Button label="送信" onPress={handleSubmit(onSubmit)} w="100%" h="64px" />
    </VStack>
  );
};
```

react-hook-form の名前が示すとおり、すべて hooks によるデータ管理がなされる。フォーム処理の基本となる情報は `useForm` hook を通して取得できる。

バリデーションは yup スキーマをサポートしており、`@hookform/resolvers/yup` の `yupResolver` がバリデーションに関する解決を行ってくれる。これを `useForm<FormData>({ resolver: yupResolver(schema)})` という形で指定すれば、RHF が適宜バリデーション処理を行ってくれる。

useForm で得られた `control` は各コンポーネントに渡し、`handleSubmit` は送信処理関数へ渡す。

### references

- [ホーム | React Hook Form - Simple React forms validation](https://react-hook-form.com/jp/)
