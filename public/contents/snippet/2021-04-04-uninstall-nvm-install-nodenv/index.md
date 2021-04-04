---
title: nvmからnodenvに移行する
date: '2021-04-04T01:00:00'
category: Snippet
tags: ['nodenv', 'nvm', 'nodejs']
status: 'published'
---

手順は下記の通り；

- nvm と nodejs をアンインストール
- bash_profile などを編集
- nodenv をインストール
- nodejs をインストール

`nvm list` でインストール済みの nodejs を確認し、`nvm uninstall` を行う。アクティブな nodejs を削除する場合は、`nvm deactivate` を実行してから `nvm uninstall` を実行する必要がある。

```bash
$ nvm list
       v10.22.0
->      v14.6.0
         system

$ nvm uninstall 10
Uninstalled node v10.22.0

$ nvm deactivate
/Users/mkubara/.nvm/*/bin removed from ${PATH}

$ nvm uninstall 14
Uninstalled node v14.6.0

$ nvm list
->       system
```

nvm と nodejs のデータを削除

```bash
$ echo $NVM_DIR
/Users/mkubara/.nvm

$ rm -rf $NVM_DIR
$ sudo rm -rf ~/.npm
```

bash_profile, bashrc などを編集し、nvm 関係の情報を削除

```bash
$ vi ~/.bash_profile
$ source ~/.bash_profile
```

nodenv を clone し、bash を更新

```bash
$ git clone https://github.com/nodenv/nodenv.git ~/.nodenv

$ echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(nodenv init -)"' >> ~/.bash_profile
$ source ~/.bash_profile
```

シェルを再起動したあと、プラグインをインストール

```bash
$ git clone https://github.com/nodenv/node-build.git ~/.nodenv/plugins/node-build
$ git clone https://github.com/nodenv/nodenv-update.git "$(nodenv root)"/plugins/nodenv-update
```

シェルを再起動したあと、nodejs をインストール

```bash
$ nodenv update
$ nodenv install 14.16.0
$ nodenv rehash
$ nodenv global 14.16.0

$ node -v
v14.16.0
```

### references

- [Node.js のアンインストールができない場合(currently-active) | WEBREE](https://webree.jp/article/nodejs-uninstall-currently-active/)
- [nvm(Node Version Manager)のアンインストール(削除) | WEBREE](https://webree.jp/article/nvm-uninstall/)
- [nvm でインストールした node.js のアンインストール | tkd55](https://www.tkd55.net/?p=1311)
- [nodenv を使って Mac に Node.js の環境を構築する - Qiita](https://qiita.com/1000ch/items/41ea7caffe8c42c5211c)
- [nodenv の環境構築](https://qiita.com/282Haniwa/items/a764cf7ef03939e4cbb1)
