import React from 'react'
import { Box, Center, Spinner, useColorModeValue, Heading, Avatar, HStack, useToast } from '@chakra-ui/core'
import { Container, Row, Col } from 'react-grid-system';
import { Doughnut, Bar, defaults } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import { getUser } from '../../graphql/queries';
import { APIKey, LastReq } from '../../components';
import Color from 'color';

defaults.global.defaultFontColor = "#ffffff";
export function Dashboard({
  history
}) {
  const toast = useToast();
  const { loading, error, data } = useQuery(getUser);
  const user = data ? data.getUser : {}
  const colors = ["#eb7e57", "#ebab57", "#ebdf57", "#cbeb57", "#95eb57", "#57eb61", "#57ebc1"];
  const borderColor = useColorModeValue("#72767D", "white")

  let defaultProps = {
    bg: "gray.700",
    borderRadius: "10px",
    p: 4,
    border: `1px solid ${borderColor}`,
    color:"white"
  }
  
  if(loading) return (
    <Center mt={40}>
      <Spinner
        thickness="4px"
        speed="0.85s"
        emptyColor="gray.800"
        color="blue.200"
        size="xl"
      />
    </Center>
  )
  
  if(error) {
    toast({
      title: "Error.",
      description: `Ocurrio un error al cargar la página, avisale a un administrador! ${error}`,
      status: "error",
      duration: 7000,
      isClosable: true,
    })
    history.push("/")
    return null;
  }

  if(!loading && !error && !user.logged) {
    toast({
      title: "Página protegida.",
      description: "Es necesario que inicies sesión para poder entrar a esta página",
      status: "info",
      duration: 5000,
      isClosable: true,
    })
    history.push("/")
    return null;
  }

  const ChartData = {
    labels: Object.keys(user.requests).filter(r => !["last", "total", "__typename"].includes(r)).map(r => r.charAt(0).toUpperCase()+r.slice(1)),
    datasets: [{
      label: "Peticiones",
      data: Object.values(user.requests).filter(r => typeof r !== "object").slice(1),
      backgroundColor: colors,
      hoverBackgroundColor: colors.map((color) => Color(color).darken(0.3).hex())
    }]
  };
  

  return (
    <Box mt={12} p={10}>
      <Box {...defaultProps}>
        <Heading as="h3" size="lg" borderBottomWidth="2px">{user.tag}</Heading>
        <HStack borderBottomWidth="2px">
          <Avatar m={2} size="xl" name={user.tag} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} />
          <Heading as="h5">Panel de estadísticas</Heading>
        </HStack>
        <APIKey user={user} />
        <LastReq user={user} />
      </Box>
      <br />
      <Box {...defaultProps}>
        <Heading as="h3" size="lg" borderBottomWidth="2px">Peticiones a los endpoints.</Heading>
        <Box mt={4} as={Container} fluid>
          <Row>
            <Col md={6} sm={12}>
              <Bar data={ChartData} width={500} height={250} options={{ maintainAspectRatio: false }}/>
            </Col>
            <Col md={6} sm={12}>
              <Doughnut data={ChartData} width={500} height={250} options={{ maintainAspectRatio: false }}/>
            </Col>
          </Row>
        </Box>
      </Box>
    </Box>
  )
}