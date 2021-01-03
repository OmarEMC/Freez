import React from 'react';
import { parse } from 'url';
import { Collapse, Button, List, ListItem, ListIcon, Code, Tooltip, Icon } from '@chakra-ui/core';
import { FaArrowRight, FaArrowDown } from 'react-icons/fa';

import useVisibility from '../../hooks/useVisibility';
import { APIKey } from '../APIKey';

export function LastReq({ user }) {
  const { isVisible: First, Toggle: FirstToggle } = useVisibility();
  const { isVisible: Second, Toggle: SecondToggle } = useVisibility();
  if(!user.requests.last.to) {
    return null;
  }
  const parsed = parse(user.requests.last.to, true);
  const defaultButtons = {
    _focus: {
      outline: "none",
      boxShadow: "none",
    },
    colorScheme: "blue",
    variant: "ghost"
  }

  return (
    <div>
      <Button {...defaultButtons} m={2} onClick={FirstToggle}>Última petición</Button>
      <Collapse ml={6} mt={2} isOpen={First}>
        Petición hecha al endpoint: <Code colorScheme="red">{parsed.pathname}</Code><br/>
        <Button {...defaultButtons} onClick={SecondToggle}>Consulta</Button>
        <Collapse ml={6} mt={4} isOpen={Second}>
          <List spacing={3}>
            {Object.entries(parsed.query).map((param) => (
              param[0] === "key" ? (
                <ListItem key={param[0]}>
                  <ListIcon as={FaArrowRight} color="blue.500"/>
                  <Icon as={FaArrowDown} color="blue.500"/>
                  <APIKey key={param[0]} user={user} />
                </ListItem>
              ) : (
                <ListItem key={param[0]}>
                  <ListIcon as={FaArrowRight} color="blue.500" />
                  <Tooltip label={param[1]} aria-label="Valor del parametro" placement="top-end" bg="gray.500" hasArrow>
                    <Code colorScheme="blue" cursor="pointer">{param[0]}</Code>
                  </Tooltip>
                </ListItem>
              )
            ))}
          </List>
        </Collapse>
      </Collapse>
    </div>
  )
}
