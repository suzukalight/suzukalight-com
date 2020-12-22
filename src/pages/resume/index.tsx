import React from 'react';
import { Box, Heading, Divider } from '@chakra-ui/react';
import { FaHome, FaBuilding, FaUniversity, FaUserGraduate } from 'react-icons/fa';

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
      period={{ from: '2013年' }}
      isNow
      cards={[
        { title: 'Wistant', period: { from: '2018年1月' } },
        { title: 'SELECK', period: { from: '2015年1月', to: '2017年12月' } },
        { title: 'Codeβ', period: { from: '2014年7月', to: '2014年12月' } },
        { title: 'Warasy', period: { from: '2013年5月', to: '2014年6月' } },
        { title: 'COGOO', period: { from: '2013年2月', to: '2013年4月' } },
      ]}
    />
    <TimelineNode
      icon={FaUniversity}
      name="G&Eビジネススクール"
      role="プログラミング講師"
      period={{ from: '2011年', to: '2014年' }}
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
      period={{ from: '2006年', to: '2012年' }}
      cards={[
        {
          title: 'Android Application Award 2012 アイデア部門 優秀賞',
          description: 'Warasy -Android端末を利用した歩行リハビリ支援システム-',
          period: { from: '2012年4月' },
        },
        {
          title: '電子情報通信学会 ヒューマンコミュニケーション賞',
          description: '聴覚提示を用いた靴型デバイスによる歩行リハビリ活動支援システムの提案と試作',
          period: { from: '2010年12月' },
        },
        {
          title: '電子情報通信学会 マルチメディア・仮想環境基礎研究会賞',
          description: '聴覚提示を用いた靴型デバイスによる歩行リハビリ活動支援システムの提案と試作',
          period: { from: '2010年5月' },
        },
        {
          title: '平成18年度電気関連学会東海支部連合大会 連合大会奨励賞',
          description: 'UIにおける透過性実現のための手法―GUI間，およびGUI・ハードウェアUI間―',
          period: { from: '2006年9月' },
        },
      ]}
    />
    <TimelineNode
      role="情報科学研究科 メディア科学専攻 修士課程"
      period={{ from: '2004年', to: '2006年' }}
      cards={[
        {
          title: '情報処理学会第68回全国大会 学生奨励賞',
          description: 'MVCを用いたコンポーネント連携型UIMSの提案',
          period: { from: '2006年3月' },
        },
      ]}
    />
    <TimelineNode
      icon={FaUserGraduate}
      name="中京大学"
      role="情報科学部 メディア科学科"
      period={{ from: '2000年', to: '2004年' }}
      cards={[
        {
          title: '中京大学 学長賞',
          period: { from: '2004年3月' },
        },
      ]}
    />
    <TimelineNode
      icon={FaUserGraduate}
      name="三重県立四日市高等学校"
      role="普通科"
      period={{ from: '1997年', to: '2000年' }}
      cards={[
        {
          title: '第3回JRA-VAN競馬ソフトコンテスト 佳作',
          description: '競馬予想ソフトShining Run ver.2',
          period: { from: '1998年9月' },
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

          <BackLinks links={[{ to: '/', icon: FaHome, label: 'Back to Home' }]} />
        </Box>
      </Box>
    </Box>
  </DefaultLayout>
);

export default IndexPage;
