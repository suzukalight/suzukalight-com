---
title: 変数の寿命とスコープ
date: '2012-06-11T00:01:00'
status: 'published'
---

本章では下記の内容を学習します。

- **変数の宣言場所**: スコープ
- **変数が消えるタイミング**: 変数の寿命
- **どこでも使える変数**: グローバル変数
- **関数内変数を最後まで残す**: 記憶クラス指定子（static 変数）

# スコープ

## 変数のスコープ

```cpp:例1-変数のスコープ
#include <stdio.h>

// ベット枚数指定関数
int     betMedal( void )
{
  int     bet;

  printf( "メダル投入枚数: " );
  scanf( "%d", &bet );

  return  bet;
}

// main関数
int     main( void )
{
  // 例1: 変数のスコープ
  int     bet = betMedal();

  printf( "投入枚数: %d\n", bet );

  return  0;
}
```

変数は宣言時に作成されますが、その変数はどこで消えるのでしょうか？　プログラムが起動している間ずっと残っているのか、それともある一定のタイミングで消えてしまうのか、そこを押さえておく必要があります。

**一般の変数は、そのブロックから抜けたときに、自動的に消去されます**。こういった、ブロック内でしか生存できない変数の事を**ローカル変数**と呼びます。

ブロックとは、中カッコ { } で囲まれているプログラムの一部分です。たとえば関数は全体で 1 ブロックです。このほか、if 文や for 文などの中カッコもブロックで、for 文のループカウンタ変数などは、その for 文内でしか基本的に有効ではありません。

**ブロックをまたいだ場合、その変数は違う変数として認識されます**。例はそれを実際に示したものです。int bet; が 2 つの関数に定義されていますが、これらは違うブロックに宣言されているため、宣言の重複は起きません。またこれらの変数は全く異なるものと認識されるため、互いの変数に影響を及ぼし合ったりすることもありません。

## グローバル変数

```cpp:例2-グローバル変数
#include <stdio.h>

// グローバル変数
int     medal   = 50;

// ベット枚数指定関数
int     betMedal( void )
{
  int     bet;

  printf( "メダル投入枚数: " );
  scanf_s( "%d", &bet );

  medal   -= bet;

  return  bet;
}

// main関数
int     main( void )
{
  while( medal > 0 )
  {
    // 例2: グローバル変数
    int     bet = betMedal();

    printf( "投入枚数: %d\n", bet );
    printf( "手持ち枚数: %d\n", medal );
  }

  return  0;
}
```

現状ではブロックをまたぐような処理、例えば複数の関数でデータを共有したいときなどは、ほとんど手がない状況となってしまいます。これらを解決するためには、ローカルスコープを突破する必要があります。

**グローバル変数は、すべての関数で利用することのできる変数です**。グローバル変数は、**関数の外側にその定義を記述する**ことで利用することができるようになります。例ではメダル枚数をグローバル変数とし、これを任意の関数から操作できるようにしています。

**グローバル変数は、プログラムが開始した直後に生成され、プログラムが終了する直前に破棄されます**。main 関数が始まる前から存在し、main 関数が終了したら破棄されると考えてもらえば良いでしょう。

グローバル変数は、良くも悪くも、全ての関数で利用できることが特徴です。**すなわちあらゆる関数がこの変数を操作できることを念頭に置いておく必要があります**。すべてのプログラムが良心的な利用をしてくれるわけではありません、中には悪さをするヤツもいますし、意図しないバグによって変数が書き換えられてしまう場合もあるでしょう。そういった問題は、プログラムが大きくなってくると、原因の除去が難しくなっていきます。**ローカル変数にしておけば、その原因はほぼその関数に特定できます**。グローバル変数にすべきかどうかは慎重に考え、グローバルでなければならない場合のみに利用するといった配慮が必要になってきます。

# 記憶クラス指定子

## static 変数

```cpp:例3-static変数
#include <stdio.h>

// グローバル変数
int     medal   = 50;

// ベット枚数指定関数
int     betMedal( void )
{
  int     bet;

  printf( "メダル投入枚数: " );
  scanf_s( "%d", &bet );

  medal   -= bet;

  return  bet;
}

// ゲーム数カウンタ
void    showGameCount( void )
{
  static int  game    = 0;

  game++;
  printf( "ゲーム数: %d\n", game );

  return;
}

// main関数
int     main( void )
{
  while( medal > 0 )
  {
    // 例3: static変数
    showGameCount();
    printf( "手持ち枚数: %d\n", medal );

    int     bet = betMedal();
    printf( "投入枚数: %d\n", bet );
  }

  return  0;
}
```

関数で生成された変数は、その関数が終了すると同時に、消去されます。しかしながらこれでは困る場合もあるでしょう。そういったとき、グローバル変数を利用すれば変数は永続するのですが、単独の関数が永続利用するためだけに、グローバル変数にするのは考えモノです。

**static 変数は、関数の中だけで利用できる、永続変数です**。スコープは関数の中だけですが、変数内容はプログラム実行中は永久保存されるので、関数の中だけでずっと覚えておきたい内容という利用に向いています。

例では、関数が呼ばれるたびにゲーム数を増やす処理が行われています。このゲームカウントは外部の関数からは操作できなくなっています。