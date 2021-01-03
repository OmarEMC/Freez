import React from 'react';
import {
  Flex,
  IconButton,
  useColorMode,
  HStack,
  chakra,
  Link,
  useColorModeValue,
  Spacer,
  Heading,
  Center
} from '@chakra-ui/core';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { getUser } from '../../graphql/queries';
import { UserMenu, MobileDrawer } from '../';
import { useQuery } from '@apollo/client';

export const NavLink = (props) => {
  const { to, as, href, ...rest } = props;

  return (
    <chakra.a
      as={as}
      to={to ? to : null}
      href={href ? href : null}
      display="block"
      py="1"
      px="3"
      borderRadius="4px"
      transition="all 0.2s"
      color={"gray.200"}
      fontWeight="bold"
      _hover={{ bg: "blue.200" }}
      _activeLink={{
        fontWeight: "semibold",
        color: "teal.500",
      }}
      {...rest}
    />
  )
}

const HeaderContent = () => {
  const { loading, error, data } = useQuery(getUser);
  const user = data ? data.getUser : {}
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("oscuro", "claro");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Flex boxSize="100%" px="6" align="center" justify="space-between">
      <Flex align="center">
        <chakra.a
          as={RouterLink}
          to="/"
          display="block"
          aria-label="Freez"
        >
          <Heading>Freez</Heading>
        </chakra.a>
        <HStack
          as="nav"
          spacing="4"
          ml="24px"
          display={{ base: "none", md: "flex" }}
        >
          <NavLink as={RouterLink} to="/docs">Docs</NavLink>
          {!loading && !error && !user.logged && (
            <NavLink as={Link} href="https://auth.freez.gq/login">Login</NavLink>
          )}
        </HStack>
      </Flex>

      <Flex
        width={["auto", "auto", "100%"]}
        maxW="720px"
        align="center"
        color="gray.500"
      >
        <Spacer />
        <IconButton
          size="md"
          fontSize="lg"
          aria-label={`Cambia al modo ${text}.`}
          variant="ghost"
          color="white"
          marginLeft="2"
          onClick={toggleMode}
          icon={<SwitchIcon />}
        />
        {!loading && !error && user.logged && (
          <Center>
            <UserMenu user={user} marginRight="2" />
          </Center>
        )}
        <MobileDrawer />
      </Flex>
    </Flex>
  )
}

export function Header (props) {

  return (
    <chakra.header
      pos="fixed"
      top="0"
      zIndex="1"
      bg="gray.600"
      color="white"
      left="0"
      right="0"
      borderBottomWidth="2px"
      width="full"
      height="4rem"
      {...props}
    >
      <HeaderContent />
    </chakra.header>
  )
}