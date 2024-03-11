export const pageRoutes = {
  mainPage: () => '/',
  teamPage: () => '/team',
  storePage: () => '/store',
  cartPage: () => '/cart',
  productPage: () => '/product/:productId',
  anyProductPage: () => '/product',
  currentProduct: (id: number) => `/product/${id}`,
};

export const firebaseApiRoutes = {
  carts: () => 'carts',
  productImagesApi: (id: number) => `product-images/${id}.jpg`,
  categories: () => 'categories',
  products: () => 'products',
};

export const linkRoutes = {
  reviews: {
    maslov: 'https://n984073.yclients.com/company/913844/create-record/master-info/913844/2771548?o=m2771548s13525666',
    golub: 'https://n984073.yclients.com/company/913844/create-record/master-info/913844/2780988?o=m2780988s13525666',
    anikin: 'https://n984073.yclients.com/company/913844/create-record/master-info/913844/2787920?o=m2787920s13525666',
  },
  whatsapp: () => 'https://wa.me/+79994652506',
  telegram: () => 'https://t.me/+79994652506',
  phoneNumber: () => 'tel:+79994652506',
};

export const serverApiRoutes = {
  sendMessage: () => '/send-message',
};
