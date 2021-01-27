export const article1 = {
  slug: '2021-01-19-storybook-nextjs-chakraui',
  excerpt:
    "タイトルの通りです。ポイントは下記のとおりでした；　preview.tsx で ChakraProvider を呼んでおく　main.ts で emotion へエイリアスをしておく　画像を読む際は declare module '\\*.png' しておく　CSS Modules を併用する場合は @storybook/preset-scss を使う　next/image をモックする　\\-s static-dir オプションを指定して、assets のパスを\n",
  frontMatter: {
    title: 'StorybookをNext.js + Chakra UIのサイトに導入',
    date: '2021-01-19T00:01:00',
    category: 'Technology',
    tags: ['storybook', 'nextjs', 'chakra-ui'],
    hero: 'storybook.png',
    status: 'published',
  },
};

export const article2 = {
  slug: '2021-01-14-cpp-vscode-wsl2',
  excerpt:
    'Windows10 + WSL2 + VSCode の環境で C++ ファイルをコンパイルするための環境構築についてまとめました。以下の手順で進めていきます；　WSL2 環境のセットアップ　Visual Studio Code のインストールと設定　C++コンパイラの設定　WSL2 環境のセットアップ　Linux 用サブシステムの有効化　Windows を最新バージョンに更新　Windows キーを押して、「Windows の機能の有効化または無効化」を\n',
  frontMatter: {
    title: 'C++ を Windows + WSL2 + VSCode でコンパイル',
    date: '2021-01-14T00:01:00',
    category: 'Technology',
    tags: ['clang', 'cpp', 'windows', 'wsl2', 'vscode'],
    emoji: '👨‍💻',
    status: 'published',
  },
};

export const article3 = {
  slug: '2020-12-20-vercel-deploy',
  excerpt:
    'Vercel は、Next.js の制作元であり、同時に Next.js で作成されたサイトのホスティングサービスも展開しています。このサービス、デプロイまでが恐ろしく簡単であると聞いていましたので、気軽な気持ちで試してみました。　結論から言うと、初見で 5 分かからずに完了しました。選択に迷う余地がなく、めちゃくちゃ体験が良いです。以下に手順を残しておきますが、たぶん記事いらないんじゃないか説があります。　https://vercel.com/　Start Deploying\n',
  frontMatter: {
    title: 'Next.jsで作成したサイトをVercelにデプロイ',
    date: '2020-12-20T00:02:00',
    category: 'Technology',
    tags: ['nextjs', 'vercel', 'deploy'],
    hero: 'vercel-succeeded.png',
    status: 'published',
  },
};

export const article4 = {
  slug: '2020-10-27-jest-test-each',
  excerpt:
    'Jest で関数の引数を複数パターンチェックしたい場合、ベタに書く方法のほかに、test.each でテーブルとして記述する方法があります。テストの視認性が良くなるため、オススメの記法です。今回はこちらをご紹介するとともに、いくつかの実践問題も提示します。　Jest の test.each とは　https://jestjs.io/docs/ja/api#testeachtablename-fn-timeout\n\\*\\*Jest で Parameterized test を行うこと\n',
  frontMatter: {
    title: 'Jest の test.each で Parameterized test を実行する',
    date: '2020-10-27T00:02:00',
    category: 'Technology',
    tags: ['typescript', 'jest', 'test', 'date-fns'],
    emoji: '🧪',
    status: 'published',
  },
};
