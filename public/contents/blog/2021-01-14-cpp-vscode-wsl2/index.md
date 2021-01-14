---
title: 'C++ を Windows + WSL2 + VSCode でコンパイル'
date: '2021-01-14T00:01:00'
category: Technology
tags: ['c++', 'windows', 'wsl2', 'vscode']
emoji: '👨‍💻'
status: 'published'
---

VSCode + WSL2 の環境で C++ ファイルをコンパイルするための環境構築について、手順をまとめました。

# セットアップ

下記を順にインストールします；

1. VSCode
2. WSL2
3. コンパイラ

vscode のインストールと、WSL2 環境のセットアップについては省略します。vscode のデフォルトターミナルは WSL2 に向けておきます。さらに vscode に下記の拡張をインストールして、WSL2 環境でワークスペースを開けるようにします；

- **Remote - WSL**: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl

## コンパイラのインストール

**build-essential** と **gdb** をインストールします；

```bash
sudo apt-get update
sudo apt install build-essential -y
sudo apt install gdb -y
```

## 拡張機能のインストール

基本的な拡張機能 2 つをインストールします；

- **C/C++**: https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools
- **C++ Intellisense**: https://marketplace.visualstudio.com/items?itemName=austin.code-gnu-global

# コンパイラの設定

## C++構成

Ctrl+Shift+P から **C/C++ 構成の編集 - Edit Configuration(JSON)** を選択します。ルートディレクトリに `.vscode/c_cpp_properties.json` が作成されますので、下記の内容で上書きします；

```json:.vscode/c_cpp_properties.json
{
  "configurations": [
    {
      "name": "WSL",
      "includePath": ["${workspaceFolder}/**", "/usr/include/**"],
      "defines": ["_DEBUG", "UNICODE", "_UNICODE"],
      "compilerPath": "/usr/bin/gcc-9",
      "cStandard": "c11",
      "cppStandard": "c++17",
      "intelliSenseMode": "gcc-x64"
    }
  ],
  "version": 4
}
```

## ビルドタスクの作成

Ctrl+Shift+B を入力すると、既定のビルドタスクを選択できます。

- **No build task ...** をクリック
- **Create task.json ...** を選択
- **Others** を選択

`.vscode/tasks.json` が作成されますので、下記の内容で上書きします；

```json:.vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "shell",
      "label": "C/C++: g++-9 compile file",
      "command": "/usr/bin/g++-9",
      "args": [
        "-std=gnu++17",
        "-Wall",
        "-Wextra",
        "-Wshadow",
        "-Wconversion",
        "-fsanitize=undefined",
        "-ggdb",
        "${file}",
        "-o",
        "${fileDirname}/${fileBasenameNoExtension}"
      ],
      "problemMatcher": ["$gcc"],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

## vscode を再起動

Ctrl+Shift+P から Reload Window をしておきます。

# コンパイル

みんな大好き `Hello, world!` を作成してみます；

```cpp:first/a.cpp
#include <stdio.h>

int main(void)
{
  printf("Hello, world!\n");
  return 0;
}
```

コンパイルしたい cpp ファイルを表示して、画面上で Ctrl+Shift+B を入力してください。同じディレクトリに `a` が作成されれば成功です。

ターミナルでファイルを実行してみましょう；

```
./first/a
Hello, world!
```

成功です！

### references

- https://ntk-ta01.hatenablog.com/entry/2020/09/09/181155
- https://qiita.com/2019Shun/items/5ab290a4117a00e373b6
