import '../css/app.css';
import Alpine from 'alpinejs'
import axios from 'axios';
window.axios = require('axios');

window.Alpine = Alpine

Alpine.directive('uppercase', el => {
    el.textContent = el.textContent.toUpperCase()
})

const Products = () => {
    const data = JSON.stringify({
        query: `query FetchProductSample {
      product(handle: "main-roast") {
        id
        title
        variants(first: 15) {
          edges {
            node {
              id
              title
              sku
              priceV2 {
                amount
              }
              image {
                url(transform: {maxWidth: 300})
                altText
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }`,
        variables: {}
    });

    const config = {
        method: 'post',
        url: 'https://lifeboostcoffee.myshopify.com/api/2022-04/graphql.json',
        headers: {
            'X-Shopify-Storefront-Access-Token': 'f81f808b4e00de733d0e8195d5e0c6a9',
            'Content-Type': 'application/json'
        },
        data: data
    };
    return {
        itemIds() {
            return this.$store.productStore.products
        },
        async getItems() {
            let vm = this;
            return axios(config).then((response) => {
                Alpine.store('productStore', {
                    products: response.data.data.product.variants.edges,
                    async getVar(roast, type) {
                        return this.products.filter(product => {
                            return product.node.title.toLowerCase().includes(type.toLowerCase()) && product.node.title.toLowerCase().includes(roast.toLowerCase())

                        })

                    }
                })
                console.log(vm);
            }).catch((error) => {
                console.log(error)
            })
        },
    }
}
console.log(Products().getItems());

Alpine.data('roast', () => ({
    roast: 'light',
    setRoast(roast) {
        this.roast = roast
    }
}))



Alpine.data('type', () => ({
    type: 'beans',
    setType(type) {
        this.type = type
    }
}))

Alpine.store('productStore', {
    products: {},

    // axios(config).then(function(response) {
    //         this.products = response.data.data.product.variants.edges
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     });

})


Alpine.start()



import ( /* webpackChunkName: "myModule", webpackPrefetch: true */ './dynamic_import').then(module => module.default());

console.log('Hello from app.js');