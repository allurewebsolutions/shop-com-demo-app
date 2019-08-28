import React from 'react';
import { Container, Content, H1, Text } from 'native-base';
import Spacer from './UI/Spacer';

const About = () => (
  <Container>
    <Content padder>
      <Spacer size={30}/>
      <H1>
        Welcome!
      </H1>
      <Spacer size={10}/>
      <Text>
        My name is Mike Doubintchik and this is my coding test for Market America's Lead Web
        Application developer role.
        {' '}
      </Text>
    </Content>
  </Container>
);

export default About;
