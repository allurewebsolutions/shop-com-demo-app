import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import { Body, Button, Card, CardItem, Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import Header from '../UI/Header';
import Spacer from '../UI/Spacer';

const ProductListing = ({ error, loading, products, reFetch }) => {
  // Loading
  if (loading) return <Loading/>;

  // Error
  if (error) return <Error content={error}/>;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.product({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content padder>
        <Header
          title="Products"
          content="These products come from the Shop.com API"
        />

        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }}>
              <CardItem cardBody>
                <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 100,
                      width: null,
                      flex: 1,
                      borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Spacer size={10}/>
                  <Text style={{ fontWeight: '800' }}>
                    {item.title}
                  </Text>
                  <Spacer size={15}/>
                  <Button
                    block
                    bordered
                    small
                    onPress={() => onPress(item)}
                  >
                    <Text>
                      View Product
                    </Text>
                  </Button>
                  <Spacer size={5}/>
                </Body>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          )}
        />

        <Spacer size={20}/>
      </Content>
    </Container>
  );
};

ProductListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

ProductListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default ProductListing;
