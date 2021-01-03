import React from 'react'
import { HStack, Text, Button, Box, useClipboard } from '@chakra-ui/core'
import { Spoiler } from '../'
import useVisibility from '../../hooks/useVisibility';

export function APIKey({ user }) {
  const content = user.api.key;
  const { isVisible, Toggle } = useVisibility();
  const { onCopy, hasCopied } = useClipboard(content);
  const defaultButtons = {
    _focus: {
      outline: "none",
      boxShadow: "none",
    },
    colorScheme: "blue",
    variant: "outline"
  }

  return (
    <>
      <HStack mt={4} ml={4}>
        <Text>API KEY -</Text>
        <Spoiler content={content} visible={isVisible}/>
      </HStack>
      <Box m={2}>
        <Button {...defaultButtons} onClick={Toggle}>{isVisible ? "Ocultar" : "Mostrar"}</Button>
        <Button {...defaultButtons} ml={2} onClick={onCopy}>{hasCopied ? "Copiado" : "Copiar"}</Button>
      </Box>
    </>
  )
}
