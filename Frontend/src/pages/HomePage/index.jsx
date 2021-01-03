import React from 'react'
import { Link as CLink, chakra, Container, Heading, Text, Box, HStack, Icon, Button } from '@chakra-ui/core'
import { Container as GridContainer, Row, Col } from 'react-grid-system';
import { FaShippingFast, FaArrowRight, FaShieldAlt, FaTools} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getUser } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

let defaultProps = {
  mt: [6, 6, null],
  border: "1px",
  p: 4,
  borderRadius: "lg",
  borderColor: "gray.500"
}

export function HomePage() {
  const { loading, error, data } = useQuery(getUser);
  const user = data ? data.getUser : {}

  return (
    <Container maxW="xl">
      <Box maxW="760px" mx="auto" mt={32} textAlign="center">
        <chakra.h1
          fontSize={{ base: "2.25rem", md: "3rem", lg: "3.75rem" }}
          letterSpacing="tight"
          fontWeight="bold"
          mb="16px"
          lineHeight="1.2"
        >
          Crea interacción con memes
          <Box as="span" color="blue.500">
            {" "}
            para tus usuarios
          </Box>
        </chakra.h1>

        <Text opacity={0.7} fontSize={{ base: "lg", lg: "xl" }} mt="6">
        Freez es una API fácil y rápida de usar con manipulación de imágenes simple pero acertada, maneja y revisa tus peticiones desde el panel si es necesario.
        </Text>
        <Box mt={2}>
          <Link to="/docs">
            <Button variant="outline" colorScheme="blue" rightIcon={<FaArrowRight/>}>Iniciar</Button>
          </Link>
          {!loading && !error && !user.logged && (
            <CLink ml={4} href="https://auth.freez.gq/login">
              Iniciar sesión
            </CLink>
          )}
          {!loading && !error && user.logged && (
            <Link to="/dashboard">
              <Button ml={4} variant="outline" colorScheme="green">Perfil</Button>
            </Link>
          )}
        </Box>
      </Box>

      <Box as={GridContainer} mt={6}>
        <Row>
          <Col md={4} sm={12}>
            <Box {...defaultProps}>
              <HStack>
                <Icon as={FaShippingFast} boxSize="25px" mt={1}/>
                <Heading as="h4" size="lg">Rápida</Heading>
              </HStack>
              <Text ml={[null, null, 8]}>La API está hecha para alcanzar el mayor rendimiento posible, no es la más rápida pero...</Text>
            </Box>
          </Col>
          <Col md={4} sm={12}>
            <Box {...defaultProps}>
              <HStack>
                <Icon as={FaShieldAlt} boxSize="25px" mt={1}/>
                <Heading as="h4" size="lg">Segura</Heading>
              </HStack>
              <Text ml={[null, null, 8]}>Confiar en nosotros no será una mala decisión, no manejamos o pedimos información que no sea necesaria.</Text>
            </Box>
          </Col>
          <Col md={4} sm={12}>
            <Box {...defaultProps}>
              <HStack>
                <Icon as={FaTools} boxSize="25px" mt={1}/>
                <Heading as="h4" size="lg">Configurable</Heading>
              </HStack>
              <Text ml={[null, null, 8]}>Maneja como quieres que se haga tu petición con los parametros en ella!</Text>
            </Box>
          </Col>
        </Row>
      </Box>
    </Container>
  )
}