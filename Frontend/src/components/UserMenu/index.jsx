import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Link
} from "@chakra-ui/core"
import { Link as RouterLink } from 'react-router-dom';
import config from '../../extra/config';

export function UserMenu({ user }) {
  return (
    <Menu placement="bottom-end">
      <MenuButton
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
      >
        Perfil
      </MenuButton>
      <MenuList>
        <MenuGroup title={user.tag}>
          <MenuItem as={RouterLink} to="/dashboard">Dashboard</MenuItem>
          <MenuItem _hover={{ textDecoration: "none", boxShadow: "none", outline: "none" }} as={Link} isExternal href={`${config.authURL}/logout`}>Salir</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}