---
title: React Native + WSL2 環境構築
date: '2021-03-14T00:01:00'
category: Technology
tags: ['react-native', 'wsl2']
emoji: '👨‍💻'
status: 'draft'
---

React Native に再入門する機運が高まってきたため、手元の Windows WSL2 環境で構築できるのかを試してみました。手順は[こちらの Gist](https://gist.github.com/bergmannjg/461958db03c6ae41a66d264ae6504ade)を参考にしています。

# セットアップ

- WSL2 をセットアップ
- vscode をインストール
- [Android Studio](https://developer.android.com/studio) をインストール
  - 適当な新規プロジェクトを作成し、起動までしておく

# ツールのインストール

- nodejs をインストール
  - nvm とか
- java-8-openjdk をインストール

```
sudo apt-get update
sudo apt install openjdk-8-jdk-headless
```

- Android SDK CLI をインストール（[この Gist を参考にしました](https://gist.github.com/steveclarke/d988d89e8cdf51a8a5766d69ecb07e7b)）

```
sudo apt install unzip

cd ~
wget https://dl.google.com/android/repository/commandlinetools-linux-6200805_latest.zip
mkdir -p Android/Sdk
unzip commandlinetools-linux-6200805_latest.zip -d Android/Sdk
```

```
nano ~/.bashrc

export ANDROID_HOME=$HOME/Android/Sdk
export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH"
export WSL_HOST=$(tail -1 /etc/resolv.conf | cut -d' ' -f2)
export ADB_SERVER_SOCKET=tcp:$WSL_HOST:5037

source ~/.bashrc
```

```
sdkmanager --sdk_root=${ANDROID_HOME} "tools"

sdkmanager --update
sdkmanager --list
sdkmanager "build-tools;30.0.3" "platform-tools" "platforms;android-30" "tools"
sdkmanager --licenses

sudo apt install gradle
```

# Virtual Device の起動

- Android Studio などから AVD Manager を開き、Device を起動する
  - Pixel 3a などの Device があれば、それを使えば良い
  - なければ Device を作成しておく

# ADB の起動

`C:\Users\<username>\AppData\Local\Android\Sdk\platform-tools` に adb.exe があるので起動

```
C:\Users\<username>\AppData\Local\Android\Sdk\platform-tools\adb
C:\Users\<username>\AppData\Local\Android\Sdk\emulator\emulator.exe -avd PIXEL_3a_API_30_x86
```

# WSL2 から Windows の ADB に接続

```
sudo apt install socat
socat -d -d TCP-LISTEN:5037,reuseaddr,fork TCP:$(cat /etc/resolv.conf | tail -n1 | cut -d " " -f 2):5037
```
