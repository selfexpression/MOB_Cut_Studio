import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useFirestore } from '../../hooks/index';
import { getDatabaseState } from '../../utils/selectors';
import { loadData } from '../../thunks/databaseThunks';
import type { AppDispatch } from '../../types/aliases';
import { actions as filterActions } from '../../slices/filterMenuSlice';
import { actions as sortActions } from '../../slices/sortMenuSlice';
import { pageRoutes } from '../../utils/routes';

import { ToggleMenu } from './ToggleMenu';

const ProductsList: React.FC = () => {
  const { t } = useTranslation();
  const { products } = useSelector(getDatabaseState);

  return (
    <>
      {products.map(({ name, id, price, brand, inStock, imageURL }) => (
        <div key={id} className="collection-item">
          <Link to={pageRoutes.currentProduct(id)}>
            <img
              src={imageURL}
              alt={name}
              loading="lazy"
              className={classNames('item-image', { 'out-of-stock': !inStock })}
            />
            <div className="item-info">
              <h3>{`${brand} ${name}`}</h3>
              <span>{price ? `${price}₽` : t('store.outOfStock')}</span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

const NotFoundMessage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-items-wrapper">
      <div className="items">
        <span>{t('store.notFound')}</span>
        <span>{t('store.changeCriteria')}</span>
      </div>
    </div>
  );
};

export const Store: React.FC = () => {
  const db = useFirestore();
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoaded } = useSelector(getDatabaseState);

  const handleToggleOpenMenu = () => {
    dispatch(filterActions.toggleMenu(false));
    dispatch(sortActions.openSortMenu(false));
  };

  useEffect(() => {
    if (!isLoaded) dispatch(loadData({ db }));
  }, []);

  return (
    <header>
      <ToggleMenu />
      <main className="collection-products">
        <div className="collection-wrapper" onClick={handleToggleOpenMenu}>
          {!products.length && isLoaded ? (
            <NotFoundMessage />
          ) : (
            <ProductsList />
          )}
        </div>
        {!isLoaded ? <div className="spinner-loader" /> : ''}
      </main>
    </header>
  );
};
