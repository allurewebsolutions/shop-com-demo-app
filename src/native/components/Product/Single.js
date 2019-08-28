import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Linking } from 'react-native';
import { Body, Card, CardItem, Container, Content, H3, List, ListItem, Text } from 'native-base';
import { errorMessages } from '../../../constants/messages';
import Error from '../UI/Error';
import Spacer from '../UI/Spacer';

const ProductView = ({ error, products, productId }) => {
  // Error
  if (error) return <Error content={error}/>;

  // Get this Product from all products
  let product = null;
  if (productId && products) {
    product = products.find(item => parseInt(item.id, 10) === parseInt(productId, 10));
  }

  // Product not found
  if (!product) return <Error content={errorMessages.product404}/>;

  // Build Links listing
  const links = product.links.map((item, index) => {
    if (item.type !== 'text/html') return;

    return (
      <ListItem key={index} rightIcon={{ style: { opacity: 0 } }}>
        <Button
          title="Product Page"
          onPress={() => {
            Linking.openURL(item.href);
          }}
        />
      </ListItem>
    );
  });

  return (
    <Container>
      <Content padder>
        <Image source={{ uri: product.image }} style={{
          height: 300,
          width: null,
          flex: 1,
        }}/>

        <Spacer size={25}/>
        <H3>{product.title}</H3>
        <Spacer size={15}/>

        <Card>
          <CardItem header bordered>
            <Text>About this product</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{product.body}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Price</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{product.price}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>More Details</Text>
          </CardItem>
          <List>{links}</List>
        </Card>

        <Spacer size={20}/>
      </Content>
    </Container>
  );
};

ProductView.propTypes = {
  error: PropTypes.string,
  productId: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ProductView.defaultProps = {
  error: null,
};

export default ProductView;
