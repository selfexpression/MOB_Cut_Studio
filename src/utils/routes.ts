export const pageRoutes = {
  mainPage: () => '/',
  teamPage: () => '/team',
};

export const firebaseApiRoutes = {
  carts: () => 'carts',
  productImagesApi: (id: number) => `product-images/${id}.jpg`,
  categories: () => 'categories',
  products: () => 'products',
};

export const linkRoutes = {
  whatsapp: () => 'https://wa.me/+79994652506',
  telegram: () => 'https://t.me/+79994652506',
  phoneNumber: () => 'tel:+79994652506',
};
