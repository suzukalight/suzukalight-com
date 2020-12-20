---
title: '[MEMO] gem コマンドで Library not loaded: /usr/local/opt/openssl/lib/libssl.1.0.0.dylib が出たときの対処法'
date: '2020-01-08T00:02:00'
category: Technology
tags: ['ruby', 'gem', 'foreman', 'rbenv', 'openssl']
emoji: '💎'
status: 'published'
---

`foreman`動かしたいから`gem`を叩いたら怒られた案件；

```bash
$ gem install foreman
ERROR:  Loading command: install (LoadError)
	dlopen(/Users/suzukalight/.rbenv/versions/2.6.2/lib/ruby/2.6.0/x86_64-darwin16/openssl.bundle, 9): Library not loaded: /usr/local/opt/openssl/lib/libssl.1.0.0.dylib
  Referenced from: /Users/suzukalight/.rbenv/versions/2.6.2/lib/ruby/2.6.0/x86_64-darwin16/openssl.bundle
  Reason: image not found - /Users/suzukalight/.rbenv/versions/2.6.2/lib/ruby/2.6.0/x86_64-darwin16/openssl.bundle
ERROR:  While executing gem ... (NoMethodError)
    undefined method `invoke_with_build_args' for nil:NilClass
```

結論としては、`rbenv`でいったん`uninstall`してから`install`しなおす。そうすると openssl 向けのライブラリを再度構成してくれるっぽい；

```bash
$ rbenv uninstall 2.6.2
$ rbenv install 2.6.2
Downloading openssl-1.1.1d.tar.gz...

$ gem install foreman

（ここでターミナルを起こし直す）

$ foreman start -f Procfile.app.dev
```

ちなみに `brew update && brew upgrade` もやったけど、こちらは効果がなかった。

reference: https://teratail.com/questions/225461
