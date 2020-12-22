import React from 'react';
import { Box, Heading, Divider } from '@chakra-ui/react';
import { FaHome, FaBuilding, FaUniversity, FaUserGraduate, FaUser } from 'react-icons/fa';

import DefaultLayout from '../../components/templates/DefaultLayout';
import { HtmlHead } from '../../components/atoms/HtmlHead';
import { BackLinks } from '../../components/molecules/BackLinks';
import { TimelineNode } from '../../components/molecules/Timeline/Node';

const Timeline = () => (
  <Box>
    <TimelineNode
      icon={FaBuilding}
      name="RELATIONS株式会社"
      role="テックリード・スクラムマスター・フロントエンドエンジニア"
      period={{ from: new Date('2013-01-01T00:00') }}
      isNow
      cards={[
        { title: 'Wistant', period: { from: new Date('2018-01-01T00:00') } },
        {
          title: 'SELECK',
          period: { from: new Date('2015-01-01T00:00'), to: new Date('2017-12-31T00:00') },
        },
        {
          title: 'Codeβ',
          period: { from: new Date('2014-07-01T00:00'), to: new Date('2014-12-31T00:00') },
        },
        {
          title: 'Warasy',
          period: { from: new Date('2013-05-01T00:00'), to: new Date('2014-06-30T00:00') },
        },
        {
          title: 'COGOO',
          period: { from: new Date('2013-02-01T00:00'), to: new Date('2013-04-30T00:00') },
        },
      ]}
    />
    <TimelineNode
      icon={FaUniversity}
      name="G&Eビジネススクール"
      role="プログラミング講師"
      period={{ from: new Date('2010-04-01T00:00'), to: new Date('2014-03-31T00:00') }}
      cards={[
        { title: 'C言語プログラミング' },
        { title: 'DirectXプログラミング' },
        { title: 'ハードウェア制御基礎' },
      ]}
    />
    <TimelineNode
      icon={FaUserGraduate}
      name="中京大学大学院"
      role="情報科学研究科 メディア科学専攻 博士課程"
      period={{ from: new Date('2006-04-01T00:00'), to: new Date('2012-03-31T00:00') }}
      cards={[
        {
          title: 'Android Application Award 2012 アイデア部門 優秀賞',
          description: 'Warasy -Android端末を利用した歩行リハビリ支援システム-',
          period: { from: new Date('2012-04-01T00:00') },
        },
        {
          title: '電子情報通信学会 ヒューマンコミュニケーション賞',
          description: '聴覚提示を用いた靴型デバイスによる歩行リハビリ活動支援システムの提案と試作',
          period: { from: new Date('2010-12-01T00:00') },
        },
        {
          title: '電子情報通信学会 マルチメディア・仮想環境基礎研究会賞',
          description: '聴覚提示を用いた靴型デバイスによる歩行リハビリ活動支援システムの提案と試作',
          period: { from: new Date('2010-05-01T00:00') },
        },
        {
          title: '平成18年度電気関連学会東海支部連合大会 連合大会奨励賞',
          description: 'UIにおける透過性実現のための手法―GUI間，およびGUI・ハードウェアUI間―',
          period: { from: new Date('2006-09-01T00:00') },
        },
      ]}
    />
    <TimelineNode
      role="情報科学研究科 メディア科学専攻 修士課程"
      period={{ from: new Date('2004-04-01T00:00'), to: new Date('2006-03-31T00:00') }}
      cards={[
        {
          title: '情報処理学会第68回全国大会 学生奨励賞',
          description: 'MVCを用いたコンポーネント連携型UIMSの提案',
          period: { from: new Date('2006-03-01T00:00') },
        },
      ]}
    />
    <TimelineNode
      icon={FaUserGraduate}
      name="中京大学"
      role="情報科学部 メディア科学科"
      period={{ from: new Date('2000-04-01T00:00'), to: new Date('2004-03-31T00:00') }}
      cards={[
        {
          title: '中京大学 学長賞',
          period: { from: new Date('2004-03-01T00:00') },
        },
      ]}
    />
    <TimelineNode
      icon={FaUserGraduate}
      name="三重県立四日市高等学校"
      role="普通科"
      period={{ from: new Date('1997-04-01T00:00'), to: new Date('2000-03-31T00:00') }}
      cards={[
        {
          title: '第3回JRA-VAN競馬ソフトコンテスト 佳作',
          description: '競馬予想ソフトShining Run ver.2',
          period: { from: new Date('1998-09-01T00:00') },
        },
      ]}
      isLast
    />
  </Box>
);

export const IndexPage: React.FC = () => (
  <DefaultLayout backgroundColor="gray.50">
    <HtmlHead title="Resume" />

    <Box py={8}>
      <Box m="1em">
        <Box maxW="64em" mx="auto">
          <Heading as="h1" mb={12}>
            Resume
          </Heading>

          <Timeline />

          <Divider mt={12} mb={8} />

          <BackLinks
            links={[
              { to: '/about', icon: FaUser, label: 'Back to About' },
              { to: '/', icon: FaHome, label: 'Back to Home' },
            ]}
          />
        </Box>
      </Box>
    </Box>
  </DefaultLayout>
);

export default IndexPage;
