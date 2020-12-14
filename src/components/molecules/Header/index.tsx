import React from 'react';
import Link from 'next/link';
import { Box, Flex, Text, Button, Link as ChakraLink } from '@chakra-ui/react';
import Logo from '../../atoms/Logo';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

type MenuItemProps = {
  to: string;
  isLast?: boolean;
};

const MenuItems: React.FC<MenuItemProps> = ({ children, to, isLast, ...rest }) => (
  <ChakraLink>
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link href={to}>{children}</Link>
    </Text>
  </ChakraLink>
);

export const Header: React.FC = (props) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={4}
      p={4}
      bg={['teal.500', 'teal.500', 'transparent', 'transparent']}
      color={['white', 'white', 'teal.700', 'teal.700']}
      {...props}
    >
      <Flex align="center">
        <Logo />
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
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
              color={['teal.500', 'teal.500', 'white', 'white']}
              bg={['white', 'white', 'teal.500', 'teal.500']}
              _hover={{
                bg: ['teal.100', 'teal.100', 'teal.600', 'teal.600'],
              }}
            >
              Contact
            </Button>
          </MenuItems>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
