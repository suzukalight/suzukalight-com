---
title: 'C++ を Windows + WSL2 + VSCode でコンパイル'
date: '2021-01-14T00:01:00'
category: Technology
tags: ['c++', 'windows', 'wsl2', 'vscode']
emoji: '👨‍💻'
status: 'published'
---

VSCode + WSL2 の環境で C++ ファイルをコンパイルするための環境構築について、手順をまとめました。以下の手順で進めていきます；

1. WSL2 環境の構築
2. Visual Studio Code のインストールと設定
3. コンパイラの設定

# WSL2 環境のセットアップ

## Linux 環境の有効化

- Windows を最新バージョンに更新
- Windows キーを押して、「**Windows の機能の有効化または無効化**」を入力
- 「**Linux 用 Windows サブシステム**」「**仮想マシンプラットフォーム**」を選択

以上を行った後、**再起動**します。再起動後、コマンドプロンプトで下記を実行します；

```bash
wsl --set-default-version 2
```

## Ubuntu のインストール

**[Microsoft Store](https://www.microsoft.com/ja-jp/store/apps/windows)**または**[ここから](https://docs.microsoft.com/ja-jp/windows/wsl/install-manual)** Ubuntu をインストールします。LTS バージョンであれば何でも良いと思います。インストールの最中に、username/password を求められますので、入力します。これらは Ubuntu で sudo をするときなどに必要になります。

# vscode のインストール

**[Visual Studio Code](https://code.visualstudio.com/)** をダウンロードします。セットアップが完了したら、下記の拡張機能をインストールしておきます；

- **Remote - WSL**: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
- **C/C++**: https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools
- **C++ Intellisense**: https://marketplace.visualstudio.com/items?itemName=austin.code-gnu-global

vscode のターミナルは、WSL2 を見るように設定しておいてください。あるいは設定しなくても、プロジェクトを開く際に「**Open Folder in WSL**」で開けば、ターミナルは WSL2 を見てくれると思います。

# コンパイラの設定

## コンパイラのインストール

WSL2 環境に、**build-essential** と **gdb** をインストールします。Ubuntu からでも、vscode のターミナルからでも OK です。

```bash
sudo apt-get update
sudo apt install build-essential -y
sudo apt install gdb -y
```

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

みんな大好き `Hello, world!` を作成してみます。プロジェクトを作成するときは、必ず「**Open Folder in WSL**」から **Ubuntu のホームディレクトリ `~` 配下へプロジェクトやファイルを作成する**ようにしてください。`/mnt/c/` 配下だとパフォーマンスが著しく低下します。

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

- https://qiita.com/EBIHARA_kenji/items/12c7a452429d79006450
- https://ntk-ta01.hatenablog.com/entry/2020/09/09/181155
- https://qiita.com/2019Shun/items/5ab290a4117a00e373b6
