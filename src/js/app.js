import '../css/app.css';
import Alpine from 'alpinejs'
import axios from 'axios';
window.Alpine = Alpine
Alpine.directive('uppercase', el => {
    el.textContent = el.textContent.toUpperCase()
})

// Alpine.data('dropdown', () => ({
//     open: false,

//     toggle() {
//         this.open = !this.open
//     }
// }))

// window.Alpine.store('store', {
//     items: [],
// }, true)
// window.myComponent = function() {
//     return {
//         itemIds() {
//             return this.$store['store'].items
//         },
//         getItems() {
//             let vm = this;
//             return axios(config).then((response) => {
//                 vm.$store['store'].items = response.data.data.product.title;
//                 console.log(vm);
//             }).catch((error) => {
//                 console.log(error)
//             })
//         },
//     }
// }


Alpine.data('main', () => ({
    light: true,
    medium: false,
    dark: false,
    decaf: false,

    setEnter(roast) {
        switch (roast) {
            case 'light':
                this.light = true
                this.medium = false
                this.dark = false
                this.decaf = false
                break;
            case 'medium':
                this.medium = true
                this.light = false
                this.dark = false
                this.decaf = false
                break;
            case 'dark':
                this.dark = true
                this.light = false
                this.medium = false
                this.decaf = false
                break;
            case 'decaf':
                this.decaf = true
                this.light = false
                this.medium = false
                this.dark = false
                break;
        }

    }
}))

let data = JSON.stringify({
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

let config = {
    method: 'post',
    url: 'https://lifeboostcoffee.myshopify.com/api/2022-04/graphql.json',
    headers: {
        'X-Shopify-Storefront-Access-Token': 'f81f808b4e00de733d0e8195d5e0c6a9',
        'Content-Type': 'application/json'
    },
    data: data
};

axios(config)
    .then(function(response) {
        console.log(response.data.data.product.variants.edges);
        Alpine.store('productStore', {
            "products": response.data.data.product.variants.edges
        })
    })
    .catch(function(error) {
        console.log(error);
    });


Alpine.start()




import ( /* webpackChunkName: "myModule", webpackPrefetch: true */ './dynamic_import').then(module => module.default());

console.log('Hello from app.js');