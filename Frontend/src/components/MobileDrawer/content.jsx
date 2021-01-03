import React from 'react'
import { Box, List, ListItem, Stack, Link as CLink } from '@chakra-ui/core';
import { useQuery } from '@apollo/client';
import { LoggedStatus } from '../../graphql/queries';
import { Link } from 'react-router-dom';

export function DrawerContent({
  contentHeight = "calc(100vh - 4rem)",
  ...props
}) {
  const { loading, error, data } = useQuery(LoggedStatus);
  const user = data ? data.getUser : {}

  return (
    <Box
      top="4rem"
      position="relative"
      overflowY="auto"
      borderRightWidth="1px"
      {...props}
    >
      <Box
        as="nav"
        height={contentHeight}
        aria-label="Main navigation"
        fontSize="sm"
        fontStyle="bold"
      >
        <List>
          <Stack>
            <ListItem as={Link} to="/docs">Docs</ListItem>
            {!loading && !error && !user.logged && (
              <ListItem as={CLink} href="https://auth.freez.gq/login" isExternal>Login</ListItem>
            )}
          </Stack>
        </List>
      </Box>
    </Box>
  )
}