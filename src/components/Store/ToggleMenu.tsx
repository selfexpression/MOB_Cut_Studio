import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { actions as filterActions } from '../../slices/filterMenuSlice';
import { actions as sortActions } from '../../slices/sortMenuSlice';
import {
  getFilterState,
  getSortState,
  getDatabaseState,
} from '../../utils/selectors';
import { filterProducts } from '../../thunks/databaseThunks';
import type { AppDispatch } from '../../types/aliases';
import { SortIcon } from '../Icons/SortIcon';

interface ToggleMenuHandler {
  handleToggleMenu: () => void;
}

interface ToggleCurrentBrand {
  handleCurrentBrand: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface ToggleCurrentCategory {
  handleCurrentCategory: (id: number | null) => void;
}

interface MenuProps extends ToggleMenuHandler {
  isOpenMenu: boolean;
  List: React.FC<ToggleMenuHandler>;
  TogglerIcon: React.JSX.Element;
  marker: string;
}

const BrandList: React.FC<ToggleCurrentBrand> = ({ handleCurrentBrand }) => {
  const { initialProducts } = useSelector(getDatabaseState);
  const { isOpenMenu, currentBrandNames } = useSelector(getFilterState);

  const brands = _.uniqWith(
    initialProducts.map((product) => product.brand.toLowerCase()),
  ).map((brand) => brand.replace(/^\w/, (c) => c.toUpperCase()));

  return (
    <div
      className={cn('filter-list', {
        opened: isOpenMenu,
      })}
    >
      {brands.map((brand) => (
        <label htmlFor={brand} className="item checkbox-item" key={brand}>
          <input
            type="checkbox"
            id={brand}
            name={brand}
            checked={currentBrandNames.includes(brand.toLowerCase())}
            onChange={handleCurrentBrand}
          />
          <span className="checkmark" />
          <span>{brand}</span>
        </label>
      ))}
    </div>
  );
};

const CategoryList: React.FC<ToggleCurrentCategory> = ({
  handleCurrentCategory,
}) => {
  const { t } = useTranslation();
  const { isOpenMenu } = useSelector(getFilterState);
  const { categories } = useSelector(getDatabaseState);

  return (
    <ul
      className={cn('filter-list', {
        opened: isOpenMenu,
      })}
    >
      {categories.map(({ id }) => (
        <li key={id} className="item" onClick={() => handleCurrentCategory(id)}>
          {t(`toggleMenu.filterList.categories.${id}`)}
        </li>
      ))}
    </ul>
  );
};

const SortList: React.FC<ToggleMenuHandler> = ({ handleToggleMenu }) => {
  const dispatch = useDispatch();
  const { isOpenMenu, currentValue } = useSelector(getSortState);
  const { t } = useTranslation();
  const sortValues = t('toggleMenu.sortValues', { returnObjects: true });

  const handleCurrentValue = (value: string): void => {
    dispatch(sortActions.setCurrentValue(value));
    handleToggleMenu();
  };

  return (
    <ul
      className={cn('sort-list', {
        opened: isOpenMenu,
      })}
    >
      {Object.entries(sortValues).map(([key, value]) => (
        <li
          key={key}
          className={cn('menu-btn item', {
            active: key === currentValue,
          })}
          onClick={() => handleCurrentValue(key)}
        >
          {value}
        </li>
      ))}
    </ul>
  );
};

const Menu: React.FC<MenuProps> = ({
  isOpenMenu,
  handleToggleMenu,
  List,
  TogglerIcon,
  marker,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${marker}-menu`}>
      <button
        type="button"
        aria-label={t(`toggleMenu.${marker}MenuToggle`)}
        aria-expanded={isOpenMenu}
        onClick={handleToggleMenu}
      >
        {TogglerIcon}
      </button>
      <List handleToggleMenu={handleToggleMenu} />
    </div>
  );
};

const FilterList: React.FC<ToggleMenuHandler> = ({ handleToggleMenu }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { isOpenMenu, isOpenCategories, isOpenBrands } =
    useSelector(getFilterState);

  const handleToggleCategories = () => {
    dispatch(filterActions.toggleCategories(!isOpenCategories));
  };

  const handleToggleBrands = () => {
    dispatch(filterActions.toggleBrands(!isOpenBrands));
  };

  const handleCurrentCategory = (id: number | null): void => {
    const payload = { id };

    dispatch(filterActions.setCurrentCategoryID(payload));
    dispatch(filterProducts());
    handleToggleMenu();
  };

  const handleCurrentBrand = (e: ChangeEvent<HTMLInputElement>) => {
    const payload = {
      name: e.target.name.toLowerCase(),
      isCheckedInput: e.target.checked,
    };

    dispatch(filterActions.setCurrentBrandNames(payload));
    dispatch(filterProducts());
  };

  const handleResetFilters = () => {
    dispatch(filterActions.setCurrentBrandNames(null));
    handleCurrentCategory(null);
    handleToggleMenu();
  };

  return (
    <div
      className={cn('filter-list', {
        opened: isOpenMenu,
      })}
    >
      <button
        type="button"
        aria-label="categories"
        className={cn('menu-btn item', {
          active: isOpenCategories,
        })}
        onClick={handleToggleCategories}
      >
        По категориям
      </button>
      {isOpenCategories && (
        <CategoryList handleCurrentCategory={handleCurrentCategory} />
      )}
      <button
        type="button"
        aria-label="brands"
        className={cn('menu-btn item', {
          active: isOpenBrands,
        })}
        onClick={handleToggleBrands}
      >
        По производителю
      </button>
      {isOpenBrands && <BrandList handleCurrentBrand={handleCurrentBrand} />}
      <button
        type="button"
        aria-label="reset"
        className="menu-btn item"
        onClick={handleResetFilters}
      >
        {t('toggleMenu.filterList.reset')}
      </button>
    </div>
  );
};

const FilterMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpenMenu } = useSelector(getFilterState);

  const handleToggleMenu = (): void => {
    dispatch(filterActions.toggleMenu(!isOpenMenu));
  };

  const TogglerIcon = () => (
    <span
      className={cn('toggle-line', {
        opened: isOpenMenu,
      })}
    />
  );

  return (
    <Menu
      isOpenMenu={isOpenMenu}
      handleToggleMenu={handleToggleMenu}
      List={FilterList}
      TogglerIcon={TogglerIcon()}
      marker={'filter'}
    />
  );
};

const SortMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpenMenu } = useSelector(getSortState);

  const handleToggleMenu = (): void => {
    dispatch(sortActions.openSortMenu(!isOpenMenu));
  };

  return (
    <Menu
      isOpenMenu={isOpenMenu}
      handleToggleMenu={handleToggleMenu}
      List={SortList}
      TogglerIcon={SortIcon()}
      marker={'sort'}
    />
  );
};

export const ToggleMenu: React.FC = () => {
  const { t } = useTranslation();
  const { currentCategoryID } = useSelector(getFilterState);
  const currentFilterValue = currentCategoryID
    ? t(`toggleMenu.filterList.categories.${currentCategoryID}`)
    : t('toggleMenu.defaultFilter');

  return (
    <div className="toggle-menu-container">
      <div className="current-filter">
        <span>{currentFilterValue}</span>
      </div>
      <div className="toggle-menu-wrapper">
        <div className="toggle-menu">
          <FilterMenu />
          <SortMenu />
        </div>
      </div>
    </div>
  );
};
