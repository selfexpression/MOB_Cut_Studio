/* eslint-disable no-unused-vars */
import type { FormikValues } from 'formik';

import type { Product, CartItem } from '../types/interfaces';

export interface SortedMap {
  [key: string]: (products: Product[]) => Product[];
}

export const sortedMap: SortedMap = {
  toHighPrice: (products) => products.sort((a, b) => (a.price ?? 0) - (b.price ?? 0)),
  toLowPrice: (products) => products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0)),
};

export const sortedByStock = (products: Product[]) => (
  products.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0)));

export const formatMessage = (message: string): string => {
  const lines = message.split('\n');
  const trimmedLines = lines.map((line) => line.trim());
  return trimmedLines.join('\n');
};

export const createOrderMessage = (
  formValues: FormikValues,
  cartItems: CartItem[],
  total: number,
): string => {
  const userInfo = `Имя: ${formValues.firstname}
                    Номер телефона: ${formValues.phoneNumber}\n`;

  const order = cartItems.map((item, index) => (
    `${index + 1}: ${item.brand} ${item.name}
    Количество: ${item.quantity}`
  )).join('\n');

  return `${userInfo}
          Товары:
          ${order}\n
          Сумма заказа: ${total}₽`;
};

export const isValidProduct = (product: Product): product is Product => {
  const {
    name, categoryID, brand, price, inStock, id,
  } = product;

  return (
    typeof name === 'string'
    && typeof categoryID === 'number'
    && (typeof brand === 'string' || brand === null)
    && (typeof price === 'number' || price === null)
    && typeof inStock === 'boolean'
    && typeof id === 'number'
  );
};
