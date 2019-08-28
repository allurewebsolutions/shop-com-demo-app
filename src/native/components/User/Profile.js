import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Body, Container, Content, Icon, Left, List, ListItem, Text } from 'native-base';
import { Avatar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Header from '../UI/Header';

const Profile = ({ member, logout }) =>
  <Container>
    <Content>
      <List>
        {(member && member.email)
          ? (
            <View>
              <Content padder>
                <Header
                  title={`Hi ${member.firstName},`}
                  content={`You are currently logged in as ${member.email}`}
                />
              </Content>

              <Content padder>
                <Avatar
                  size="large"
                  rounded
                  source={{ uri: member.profilePhoto }}
                  activeOpacity={0.7}
                />
              </Content>

              <ListItem onPress={Actions.updateProfile} icon>
                <Left>
                  <Icon name="person-add"/>
                </Left>
                <Body>
                  <Text>
                    Update My Profile
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={logout} icon>
                <Left>
                  <Icon name="power"/>
                </Left>
                <Body>
                  <Text>
                    Logout
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
          : (
            <View>
              <Content padder>
                <Header
                  title="Hi there,"
                  content="Please login to gain extra access"
                />
              </Content>

              <ListItem onPress={Actions.login} icon>
                <Left>
                  <Icon name="power"/>
                </Left>
                <Body>
                  <Text>
                    Login
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.signUp} icon>
                <Left>
                  <Icon name="add-circle"/>
                </Left>
                <Body>
                  <Text>
                    Sign Up
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <Icon name="help-buoy"/>
                </Left>
                <Body>
                  <Text>
                    Forgot Password
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
        }
      </List>
    </Content>
  </Container>;

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
