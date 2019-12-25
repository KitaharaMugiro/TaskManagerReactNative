import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from 'native-base';
import React from 'react';
import DailyNotification from '../domains/DailyNotification';
import DashBoard from './dashboard/DashBoard';
import ActionReflectPage from './action-reflect/ActionReflectPage';
import ActionRegisterPage from './action-register/ActionRegisterPage';
import ActionSelectPage from './action-select/ActionSelectPage';
export default () => {
  DailyNotification(this, this);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <ActionSelectPage />
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
