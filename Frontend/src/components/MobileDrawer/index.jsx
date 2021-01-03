import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  CloseButton,
  IconButton,
  useDisclosure,
} from '@chakra-ui/core';
import { DrawerContent as Content } from './content';
import { FaBars } from 'react-icons/fa';

export function MobileDrawer() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <React.Fragment>
      <IconButton
        display={{ sm: "inline-flex", md: "none" }}
        aria-label="Abrir menú"
        fontSize="20px"
        variant="ghost"
        icon={<FaBars />}
        onClick={onToggle}
      />
      <Drawer size="md" placement="top" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Menú</DrawerHeader>
            <DrawerHeader borderBottomWidth="1px">Menú <CloseButton onClick={onClose} /></DrawerHeader>
            <DrawerBody>
              <Content top="0" />
            </DrawerBody>
            {/*<DrawerFooter>
              <Flex>
                <Spacer/>
                <CloseButton onClick={onClose}/>
              </Flex>
            </DrawerFooter>*/}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </React.Fragment>
  )
}