import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProductListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({}) }),
    fetchProducts: PropTypes.func.isRequired,
  };

  static defaultProps = {
    match: null,
  };

  state = {
    error: null,
    loading: false,
  };

  componentDidMount = () => this.fetchData();

  fetchData = (data) => {
    const { fetchProducts } = this.props;

    this.setState({ loading: true });

    return fetchProducts(data)
      .then(() => this.setState({
        loading: false,
        error: null,
      }))
      .catch(err => this.setState({
        loading: false,
        error: err,
      }));
  };

  render = () => {
    const { Layout, products, match } = this.props;
    const { loading, error } = this.state;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        productId={id}
        error={error}
        loading={loading}
        products={products}
        reFetch={() => this.fetchData()}
      />
    );
  };
}

const mapStateToProps = state => ({
  products: state.products.products || {},
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: dispatch.products.getProducts,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
