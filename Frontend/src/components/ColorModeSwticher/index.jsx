import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/core';
import { FaMoon, FaSun } from 'react-icons/fa';

export function ColorModeSwitcher(props) {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('oscuro', 'claro');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Cambia al modo ${text}.`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};
