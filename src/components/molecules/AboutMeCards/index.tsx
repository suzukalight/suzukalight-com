import React from 'react';
import { SimpleGrid, Icon } from '@chakra-ui/react';
import { FaCodeBranch, FaChalkboardTeacher } from 'react-icons/fa';
import { GiHorseHead } from 'react-icons/gi';

import { CardFrame } from '../../atoms/Card/Frame';

export const AboutMeCards: React.FC = () => (
  <SimpleGrid columns={[1, 1, 2, 3]} gap={12}>
    <CardFrame
      image={<Icon as={FaChalkboardTeacher} boxSize={12} />}
      title="Teaching"
      supplement="大学院で情報科学を修めており、大学および各種学校にて講師として教えた経験があります。ほかに子ども向けの電子工作ワークショップや、地域住民向けのPC講座なども行ったことがあります。"
      wrapProps={{ justifySelf: 'center', alignSelf: 'center' }}
    />
    <CardFrame
      image={<Icon as={FaCodeBranch} boxSize={12} />}
      title="Fullstack Engineering"
      supplement="フロントエンド領域を中心とした、フルスタックエンジニアとして活動しています。React.js系のSPA開発を中心に、Node.jsバックエンド、React Nativeアプリ、AWSインフラなどが扱えます。"
      wrapProps={{ justifySelf: 'center', alignSelf: 'center' }}
    />
    <CardFrame
      image={<Icon as={GiHorseHead} boxSize={12} />}
      title="Horse Racing & Gaming"
      supplement="競馬とゲームが趣味です。一口馬主として競馬に参加しています。競馬ゲームをキッカケに、16歳頃から競馬予想アプリを作成・販売した経験があり、エンジニアとしての原体験になっています。"
      wrapProps={{ justifySelf: 'center', alignSelf: 'center' }}
    />
  </SimpleGrid>
);
