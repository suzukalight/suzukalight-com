import React, { useState } from 'react';
import { Center, Box, Flex, Text } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { Logo } from '../../atoms/Logo';
import { Link } from '../../atoms/Link';

type MenuItemProps = {
  href: string;
  isLast?: boolean;
};

const MenuItems: React.FC<MenuItemProps> = ({ children, href, isLast, ...rest }) => (
  <Box
    w={{ base: '100%', sm: 'auto' }}
    mb={{ base: isLast ? 0 : 8, sm: 0 }}
    mr={{ base: 0, sm: isLast ? 0 : 4 }}
    px={4}
  >
    <Link href={href}>
      <Text display="block" textAlign="center" {...rest}>
        {children}
      </Text>
    </Link>
  </Box>
);

export const Header: React.FC = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const [showMenu, setShowMenu] = useState(true);

  useScrollPosition(({ prevPos, currPos }) => {
    const visible = currPos.y > prevPos.y;
    setShowMenu(visible);
  }, []);

  return (
    <Center
      as="nav"
      position="fixed"
      w="100%"
      mb={4}
      p={4}
      bg="white"
      zIndex="banner"
      boxShadow="md"
      visibility={showMenu ? 'visible' : 'hidden'}
      transition={`all 200ms ${showMenu ? 'ease-in' : 'ease-out'}`}
      transform={showMenu ? 'none' : 'translate(0, -100%)'}
      {...props}
    >
      <Flex w="100%" maxW="80em" align="center" justify="space-between" wrap="wrap">
        <Flex align="center">
          <Link href="/">
            <Logo imageSrc="/tarako.jpg" name="suzukalight" supplement="Masahiko Kubara" />
          </Link>
        </Flex>

        <Box display={{ base: 'block', md: 'none' }} onClick={toggleDropdown}>
          {showDropdown ? <CloseIcon boxSize={6} /> : <HamburgerIcon boxSize={6} />}
        </Box>

        <Box
          display={{ base: showDropdown ? 'block' : 'none', md: 'block' }}
          flexBasis={{ base: '100%', md: 'auto' }}
        >
          <Flex
            align="center"
            justify={['center', 'space-between', 'flex-end', 'flex-end']}
            direction={['column', 'row', 'row', 'row']}
            pt={[4, 4, 0, 0]}
          >
            <MenuItems href="/">Home</MenuItems>
            <MenuItems href="/blog">Blog</MenuItems>
            <MenuItems href="/snippet">Snippet</MenuItems>
            <MenuItems href="/course">Course</MenuItems>
            <MenuItems href="/about" isLast>
              About
            </MenuItems>
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
};
