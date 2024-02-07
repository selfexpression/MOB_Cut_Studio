/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFormik, type FormikValues } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import type { TFunction } from 'i18next';
import { PatternFormat } from 'react-number-format';

import { getCartState } from '../../utils/selectors';
import { useFirestore, useAuth } from '../../hooks/index';
import { updateCart } from '../../thunks/cartThunks';
import type { AppDispatch } from '../../types/aliases';
import cartImage from '../../assets/cart-image.png';
import { formatMessage, createOrderMessage } from '../../utils/helpers';
import { actions } from '../../slices/cartSlice';
import { pageRoutes, serverApiRoutes } from '../../utils/routes';
import { loadData } from '../../thunks/databaseThunks';

import { QuantityControl } from './QuantityControl';

const schema = (t: TFunction) => Yup.object().shape({
  firstname: Yup
    .string()
    .required(t('cart.inputErrors.required')),
  phoneNumber: Yup
    .string()
    .required(t('cart.inputErrors.required'))
    .matches(/(.*\d.*){11}/, t('cart.inputErrors.matches')),
});

type FormFieldMap = Record<string, (fieldName: string) => React.ReactNode>;

interface FieldProps {
  fieldName: string;
  formik: FormikValues;
}

const ItemQuantityControl: React.FC<{ currentId: number }> = ({ currentId }) => {
  const userUID = useAuth();
  const db = useFirestore();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector(getCartState);
  const currentItem = items.find((item) => item.id === currentId);

  if (!currentItem) return null;

  const { id, quantity } = currentItem;

  const handleUpdate = (updateQuantityType: string) => {
    dispatch(updateCart({
      userUID,
      db,
      id,
      updateQuantityType,
      cartActionType: 'quantity',
    }));
  };

  return (
    <QuantityControl
      handler={handleUpdate}
      quantity={quantity}
    />
  );
};

const SmallScreenItem: React.FC<{
  brand: string,
   name: string,
   id: number,
   price: number
  }> = ({
    brand, name, id, price,
  }) => (
    <div className="small-screen-item p-2 aqua-color">
      <Link
        className="no-decoration d-block"
        to={pageRoutes.currentProduct(id)}
      >
        {`${brand} ${name}`}
      </Link>
      <span>{`${price}₽`}</span>
    </div>
  );

const CartItems: React.FC = () => {
  const { items } = useSelector(getCartState);

  return useMemo(() => (
    <>
      {items.map(({
        brand, name, price, id, imageURL,
      }) => (
        <tr key={id} className="cart-item">
          <td className="cart-product-img p-4">
            <img src={imageURL} alt={name} className="mr-5"/>
            <SmallScreenItem
              brand={brand}
              name={name}
              id={id}
              price={price as number}
            />
          </td>
          <td className="item-name text-start aqua-color">
            <Link
              className="no-decoration"
              to={pageRoutes.currentProduct(id)}
            >
              {`${brand} ${name}`}
            </Link>
          </td>
          <td className="item-price text-center mr-5">{`${price}₽`}</td>
          <td className="item-counter text-center">
            <ItemQuantityControl currentId={id} />
          </td>
        </tr>
      ))}
    </>
  ), [items]);
};

const CartFooter: React.FC = () => {
  const { t } = useTranslation();
  const { totalAmount } = useSelector(getCartState);

  return (
    <div className="cart-footer">
      <Link
        className="p-2 align-self-start no-decoration"
        to={pageRoutes.storePage()}
      >
        {t('cart.continueShopping')}
      </Link>
      <div className="p-2 align-self-end">
        {`${t('cart.cartOuter.total')} ${totalAmount}₽`}
      </div>
    </div>
  );
};

const CartOuter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="cart-outer">
      <h2 className="p-4 ml-1">{t('cart.cartOuter.title')}</h2>
      <table className="mt-4">
        <thead>
          <tr>
            <th />
            <th className="item-name text-start p-3">{t('cart.cartOuter.productCol')}</th>
            <th className="item-price p-3 mr-5">{t('cart.cartOuter.priceCol')}</th>
            <th className="item-quantity p-3">{t('cart.cartOuter.quantityCol')}</th>
          </tr>
        </thead>
        <tbody>
          <CartItems />
        </tbody>
      </table>
      <CartFooter />
    </div>
  );
};

const FirstnameField: React.FC<FieldProps> = ({ fieldName, formik }) => {
  const { t } = useTranslation();

  return (
    <input
      type="text"
      id={fieldName}
      name={fieldName}
      placeholder={t(`cart.formFields.${fieldName}`)}
      onChange={formik.handleChange}
      value={formik.values[fieldName]}
      className={classNames('form-field p-2 rounded-2', {
        'is-valid': !formik.errors[fieldName],
        'is-invalid': formik.errors[fieldName],
      })}
    />
  );
};

const PhoneNumberField: React.FC<FieldProps> = ({ fieldName, formik }) => (
  <PatternFormat
    format="+7 (###) - ### - ####"
    mask=" "
    allowEmptyFormatting
    type="tel"
    name={fieldName}
    value={formik.values[fieldName]}
    onChange={formik.handleChange}
    className={classNames('form-field p-2 rounded-2', {
      'is-valid': !formik.errors[fieldName],
      'is-invalid': formik.errors[fieldName],
    })}
  />
);

const Fields: React.FC<FormikValues> = ({ formik }) => {
  const mapping: FormFieldMap = {
    phoneNumber: (fieldName) => <PhoneNumberField fieldName={fieldName} formik={formik} />,
    firstname: (fieldName) => <FirstnameField fieldName={fieldName} formik={formik} />,
  };

  return (
    <>
      {Object.entries(formik.values).map(([fieldName]) => (
        <div key={fieldName} className="mt-3">
          {mapping[fieldName](fieldName)}
          <div className="invalid-tooltip m-2">{formik.errors[fieldName]}</div>
          <label htmlFor={fieldName}></label>
        </div>
      ))}
    </>
  );
};

const OrderForm: React.FC = () => {
  const userUID = useAuth();
  const db = useFirestore();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalAmount } = useSelector(getCartState);
  // const apiURL = process.env.NODE_ENV === 'production'
  //   ? process.env.REACT_APP_API_URL_PRODUCTION
  //   : process.env.REACT_APP_API_URL_DEVELOPMENT;
  const formik = useFormik({
    initialValues: {
      firstname: '',
      phoneNumber: '',
    },
    validationSchema: schema(t),
    onSubmit: async (values, { setSubmitting }) => {
      const orderMessage = createOrderMessage(values, items, totalAmount);

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL_DEVELOPMENT}${serverApiRoutes.sendMessage()}`,
          { message: formatMessage(orderMessage) },
        );

        dispatch(actions.toggleOrderStatus(true));

        dispatch(updateCart({
          userUID,
          db,
          cartActionType: 'trash',
        }));
        setTimeout(() => dispatch(actions.toggleOrderStatus(false)), 5000);
      } catch (error) {
        console.error('Form submit request error:', error);
        throw error;
      }

      setSubmitting(false);
    },
  });

  return (
    <div className="text-center">
      <h2 className="p-4">{t('cart.orderForm.title')}</h2>
      <form onSubmit={formik.handleSubmit}>
        <Fields formik={formik} />
        <button
          type="submit"
          aria-label="submit-btn"
          className="submit-btn mt-3"
          disabled={formik.isSubmitting}
        >
          {t('cart.submitButton')}
        </button>
      </form>
    </div>
  );
};

const EmptyCart: React.FC = () => {
  const { isOrderPlaced, isLoaded } = useSelector(getCartState);
  const { t } = useTranslation();

  return (
    isLoaded ? (
      <div className="cart-container vh-100">
        <div className="empty-cart-items">
          {isOrderPlaced ? (
            <>
              <span className="p-1">{`${t('cart.thanksForBuying')} `}</span>
              <span className="p-1">{`${t('cart.shoppingCompleted')} `}</span>
            </>
          ) : (
            <>
              <img src={cartImage} alt="cart" className="empty-cart-image" />
              <span>{`${t('cart.emptyCart')} `}</span>
            </>
          )}
          <Link to={pageRoutes.storePage()}>
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    ) : (
      <div className="spinner-loader" />
    )
  );
};

export const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector(getCartState);
  const totalAmount = items.reduce((acc, item) => acc + (item.price as number) * item.quantity, 0);

  useEffect(() => {
    dispatch(actions.setTotalAmount(totalAmount));
  }, [totalAmount]);

  return (
    !items.length
      ? (
        <EmptyCart />
      ) : (
        <div className="cart-container">
          <div className="cart-wrapper">
            <CartOuter />
            <OrderForm />
          </div>
        </div>
      )
  );
};
