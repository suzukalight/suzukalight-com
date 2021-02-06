---
title: AtCoderに登録して、AtCoder Beginners Selection やってみた
date: '2021-02-06T00:01:00'
category: Technology
tags: ['atcoder', 'typescript']
emoji: '👨‍💻'
status: 'published'
---

タイトルの通りで、昨日 AtCoder に登録して、AtCoder Beginners Selection やってみた。久々にコンピュータサイエンスやれた気がして楽しかった。

# 結果

![スコア](score.png)

無事に全問正解できた。すべて TypeScript で解答。ちなみに言語選択としては競プロには全然向いてない。プログラム起動するだけで 50ms くらいかかってるので。わたし一応 C++ も書ける人なので、あとで C++ で書き直してみようと思う。

# おもしろかった

A 問題は開発環境に慣れるためみたいなもので、stdin から情報受け取って、変数に展開して、そこから必要な加工をして、最後に stdout（コンソール）に出力する、という一連のお作法に慣れていくのが主なタスクだった。ここで何回か素振りさせてもらえたので、BC 問題にうまくつなげさせてもらえたと思う。

B 問題はあまり計算コストなどは考えなくても大丈夫そうで、どうやって情報を処理させるかの題意を読み解くような問題が多かった気がする。「あ、要するに Array.uniq してほしいのね」とか「Array.sort してからふるい分けする話だね」とか「3 重ループで総当りする練習だね」とか。むかし実践問題を作っていた側なので、こういう問題の作り方は良いなぁ、なんて思ったりした。

C 問題はいよいよ省力化やアルゴリズム実装が必要になった。3 重ループと見せかけてちゃんと計算すれば 2 重で大丈夫だよ案件、押してダメなら引いてみな案件（文字列探索アルゴリズムとかである）、マンハッタン距離と偶奇判定。

# 作例

### Welcome to AtCoder

```ts
const main = (input: string) => {
  const [a, bc, s] = input.split('\n');
  const [b, c] = bc.split(' ');
  const abc = parseInt(a, 10) + parseInt(b, 10) + parseInt(c, 10);

  console.log(`${abc} ${s}`);
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

Welcome to AtCoder。`split`, `parseInt`, `readFileSync` に慣れていく。

### Product

```ts
const main = (input: string) => {
  const [a, b] = input.split(' ');
  const mod = (parseInt(a, 10) * parseInt(b, 10)) % 2;

  if (mod) console.log('Odd');
  else console.log('Even');
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

Product。たぶん個別に偶奇判定しても大丈夫。ビット演算すればもっと早いと思うけど、JS 系でそれやるのもなんか違うような気がして。

### Placing Marbles

```ts
const main = (input: string) => {
  const count = (input.match(/1/g) || []).length;
  console.log(count);
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

Placing Marbles。たぶん出題者に怒られる解答。

### Shift only

```ts
const operate = (n: number, a: number[]) => {
  let count = 0;
  while (true) {
    for (let i = 0; i < n; i++) {
      if (a[i] % 2) return count;
      a[i] = a[i] / 2;
    }
    count++;
  }

  return 0;
};

const main = (input: string) => {
  const [_n, board] = input.split('\n');
  const n = parseInt(_n, 10);
  const a = board.split(' ').map((s) => parseInt(s, 10));

  const count = operate(n, a);

  console.log(count);
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

Shift only。単純に割り続けてみた。しまった引数を破壊してる。。。

### Coins

```ts
const operate = (a: number, b: number, c: number, x: number) => {
  let count = 0;

  for (let na = 0; na <= a; na++) {
    for (let nb = 0; nb <= b; nb++) {
      for (let nc = 0; nc <= c; nc++) {
        if (500 * na + 100 * nb + 50 * nc === x) ++count;
      }
    }
  }

  return count;
};

const main = (input: string) => {
  const [a, b, c, x] = input.split('\n').map((n) => parseInt(n, 10));

  const count = operate(a, b, c, x);

  console.log(count);
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

Coins。ネストを重ねて物理で殴る。

### Some Sums

```ts
const operate = (n: number, a: number, b: number) => {
  let ret = 0;

  for (let i = 1; i <= n; i++) {
    const digits = `${i}`.split('').map((s) => parseInt(s, 10));
    const sum = digits.reduce((d, c) => d + c, 0);
    if (a <= sum && sum <= b) ret += i;
  }

  return ret;
};

const main = (input: string) => {
  const [n, a, b] = input.split(' ').map((n) => parseInt(n, 10));

  const count = operate(n, a, b);

  console.log(count);
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

Some Sums。これも桁処理は数値でやったほうが怒られない案件かもしれない。その場合は 10 の剰余演算をループして分離することになるかな。

### Card Game for Two

```ts
const operate = (n: number, an: number[]) => {
  const ordered = an.slice().sort((a, b) => b - a);
  let diff = 0;

  for (let i = 0; i < n; i++) {
    if (i % 2) diff -= ordered[i];
    else diff += ordered[i];
  }

  return diff;
};

const main = (input: string) => {
  const [_n, _an] = input.split('\n');
  const n = parseInt(_n, 10);
  const an = _an.split(' ').map((n) => parseInt(n, 10));

  const diff = operate(n, an);

  console.log(diff);
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

Card Game for Two。大きいものから順にとっていくので、まず並べ替える。そして Alice 側から見た得失点で考えればいいので、偶奇で加減算を変えれば良いはず。

### Kagami Mochi

```ts
const operate = (n: number, mochis: number[]) => {
  return new Set(mochis).size - 1;
};

const main = (input: string) => {
  const [n, ...mochis] = input.split('\n').map((n) => parseInt(n, 10));

  const dan = operate(n, mochis);

  console.log(dan);
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

Kagami Mochi。要するに uniq すればいいんだよね、ってことで、JS 環境なら Set を使うのが楽。

### Otoshidama

```ts
const operate = (n: number, y: number) => {
  for (let x10 = 0; x10 <= n; x10++) {
    for (let x5 = 0; x5 <= n - x10; x5++) {
      const x1 = n - x10 - x5;
      const sum = 10000 * x10 + 5000 * x5 + 1000 * x1;
      if (sum > y) break;

      if (sum === y) {
        return `${x10} ${x5} ${x1}`;
      }
    }
  }

  return '-1 -1 -1';
};

const main = (input: string) => {
  const [n, y] = input.split(' ').map((n) => parseInt(n, 10));

  const dan = operate(n, y);

  console.log(dan);
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

Otoshidama。1 万円と 5 千円の枚数が決まれば、千円の枚数が自動的に決まる。これを忘れると O(N^3) になって計算時間が足りなくなる。きれいにハマりました。

### 白昼夢

```ts
const operate = (str: string) => {
  return str.match(/^(dream|dreamer|erase|eraser)*$/);
};

const main = (input: string) => {
  const result = operate(input.trim());

  console.log(result ? 'YES' : 'NO');
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

白昼夢。順探索だと dream と dreamer と erase がかぶってしまうのでうまく除去できない。逆探索でやってやるとかぶらなくなるのできれいに達成できる。と頭では思いながら正規表現でやっつける。

### Traveling

```ts
type Plan = number[];

const trip = (plan: Plan, x: number, y: number, n: number) => {
  // 距離的に到達可能、かつ偶数回の余剰は往復でつぶせる
  const dist = Math.abs(x - plan[1]) + Math.abs(y - plan[2]);
  if (dist > n) return false;
  if (dist % 2 !== n % 2) return false;

  return true;
};

const operate = (n: number, plans: Plan[]) => {
  for (let i = 0; i < n; i++) {
    const x = i === 0 ? 0 : plans[i - 1][1];
    const y = i === 0 ? 0 : plans[i - 1][2];
    const n = i === 0 ? plans[i][0] : plans[i][0] - plans[i - 1][0];

    const result = trip(plans[i], x, y, n);
    if (!result) return false;
  }

  return true;
};

const main = (input: string) => {
  const [_n, ..._plans] = input.split('\n');
  const n = parseInt(_n, 10);
  const plans = _plans.map((p) => p.split(' ').map((i) => parseInt(i, 10)));

  const result = operate(n, plans);

  console.log(result ? 'Yes' : 'No');
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
main(input);
```

Traveling。4 近傍の移動。xy 軸の移動を再帰関数で表現する方法もあるけど、たぶんスタックが枯渇する。これはアルゴリズムで解く問題で、マンハッタン距離を計算して到達可能であれば、あとは余剰分を反復横跳びで消化できるかをチェックする形。反復横跳びは偶奇判定で達成できる。
