import React from 'react'
import { Container, Button, Link, Box } from '@chakra-ui/core';
import { FaNpm } from 'react-icons/fa';

export function Docs() {
  return (
    <Container maxW="xl">
        <Box maxW="760px" mx="auto" mt={32} textAlign="center">
        En construcción.{" "}
        <Link
          href="https://www.npmjs.com/package/freez.js"
          isExternal
          _hover={{
            textDecoration: "none"
          }}
        >
          <Button rightIcon={<FaNpm/>} colorScheme="red" variant="outline">
            Modulo de NPM
          </Button>
        </Link>
      </Box>
    </Container>
  )
}