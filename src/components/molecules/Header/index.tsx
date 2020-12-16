import React from 'react';
import Link from 'next/link';
import { Center, Box, Flex, Text, Button, Link as ChakraLink } from '@chakra-ui/react';
import Logo from '../../atoms/Logo';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

type MenuItemProps = {
  to: string;
  isLast?: boolean;
};

const MenuItems: React.FC<MenuItemProps> = ({ children, to, isLast, ...rest }) => (
  <ChakraLink href={to}>
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
    <Center
      as="nav"
      w="100%"
      mb={4}
      p={4}
      bg={['white', 'white', 'transparent', 'transparent']}
      color="teal.700"
      zIndex={['banner', 'banner', 'base', 'base']}
      boxShadow={['md', 'md', 'sm', 'sm']}
      position={['fixed', 'fixed', 'relative', 'relative']}
      {...props}
    >
      <Flex w="100%" maxW="80em" align="center" justify="space-between" wrap="wrap">
        <Flex align="center">
          <ChakraLink href="/">
            <Link href="/">
              <Logo />
            </Link>
          </ChakraLink>
        </Flex>

        <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
          {show ? <CloseIcon boxSize={6} /> : <HamburgerIcon boxSize={6} />}
        </Box>

        <Box
          display={{ base: show ? 'block' : 'none', md: 'block' }}
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
