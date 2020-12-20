import React, { useState } from 'react';
import { Center, Box, Flex, Text, Button } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import Logo from '../../atoms/Logo';
import { Link } from '../../atoms/Link';

type MenuItemProps = {
  to: string;
  isLast?: boolean;
};

const MenuItems: React.FC<MenuItemProps> = ({ children, to, isLast, ...rest }) => (
  <Link to={to} chakraProps={{ w: { base: '100%', sm: 'auto' } }}>
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      textAlign="center"
      {...rest}
    >
      {children}
    </Text>
  </Link>
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
      color="teal.700"
      zIndex="banner"
      boxShadow={['md', 'md', 'sm', 'sm']}
      visibility={showMenu ? 'visible' : 'hidden'}
      transition={`all 200ms ${showMenu ? 'ease-in' : 'ease-out'}`}
      transform={showMenu ? 'none' : 'translate(0, -100%)'}
      {...props}
    >
      <Flex w="100%" maxW="80em" align="center" justify="space-between" wrap="wrap">
        <Flex align="center">
          <Link to="/">
            <Logo />
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
            <MenuItems to="/">Home</MenuItems>
            <MenuItems to="/blog">Blog</MenuItems>
            <MenuItems to="/outputs">My Outputs</MenuItems>
            <MenuItems to="/about">About</MenuItems>
            <MenuItems to="/contact" isLast>
              <Button
                size="sm"
                rounded="md"
                color="white"
                bg="teal.500"
                _hover={{ bg: 'teal.600' }}
              >
                Contact
              </Button>
            </MenuItems>
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
};

export default Header;
