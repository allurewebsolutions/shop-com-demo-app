import initState from '../store/products';
import AppConfig from '../constants/config';

export default {
  /**
   *  Initial state
   */
  state: {
    products: initState.products,
  },

  /**
   * Reducers
   */
  reducers: {
    replaceProducts(state, payload) {
      let products = [];
      // Pick out the props I need
      if (payload && typeof payload === 'object') {
        products = payload.map(item => ({
          id: item.id,
          title: item.name,
          body: item.shortDescription,
          price: item.maximumPriceString,
          image: item.image.sizes[0].url,
          links: item.links,
        }));
      }
      return {
        ...state,
        products,
      };
    },
  },
  /**
   * Effects/Actions
   */
  effects: () => ({
    /**
     * Get Products
     *
     * @return {Promise}
     */
    async getProducts() {
      await fetch('https://api2.shop.com/AffiliatePublisherNetwork/v2/products?publisherId=TEST&locale=en_US&site=shop&shipCountry=US&term=test&perPage=10&onlyMaProducts=false', {
        method: 'GET',
        headers: {
          'api_Key': AppConfig.shopComAPI,
        },
      })
        .then(resp => resp.json())
        .then(data => this.replaceProducts(data.products))
        .catch(error => console.log(error.message));
    },
  }),
};
