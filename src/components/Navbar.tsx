import React from 'react';
import { useMediaQuery } from '@reactuses/core';
import { useDispatch, useSelector } from 'react-redux';
import { Telegram, Whatsapp } from 'react-bootstrap-icons';
import cn from 'classnames';
import { Link as ScrollLink, animateScroll } from 'react-scroll';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

import { actions } from '../slices/navbarSlice';
import { pageRoutes, linkRoutes } from '../utils/routes';
import { getNavbarState, getCartState } from '../utils/selectors';

import { Logo } from './Icons/Logo';
import { HomeIcon } from './Icons/HomeIcon';
import { CartIcon } from './Icons/CartIcon';
import { BackButton } from './Icons/BackButton';

type NavLinkProps = Record<string, boolean>;

interface SocialLinksProps {
  t?: TFunction;
}

const PageNavLink: React.FC<NavLinkProps> = ({ isMainPage }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(actions.toggleMenu(false));
  };

  const pagesMap = {
    services: ScrollLink,
    store: RouterLink,
    team: RouterLink,
    slider: ScrollLink,
    footer: ScrollLink,
  };

  return (
    isMainPage
      ? (
        <div className="page-link-wrapper">
          {Object.entries(pagesMap).map(([pageName, Link]) => (
            <Link
              className='page-link'
              key={pageName}
              to={pageName}
              duration={500}
              smooth="true"
              onClick={handleToggleMenu}
            >
              {t(`navbar.${pageName}`)}
            </Link>
          ))}
        </div>
      )
      : (
        null
      )
  );
};

const HomePageButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(actions.toggleMenu(false));
  };

  return (
    <div className="home-page-btn">
      <RouterLink
        to={pageRoutes.mainPage()}
        onClick={handleToggleMenu}
      >
        <HomeIcon />
      </RouterLink>
    </div>
  );
};

const LanguageToggleButton: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLangSwitch = () => {
    const { language } = i18n;
    const lang = (language === 'en' ? 'ru' : 'en');
    i18n.changeLanguage(lang);
  };

  return (
    <button
      type="button"
      aria-label={t('ariaLabels.langSwitcher')}
      onClick={handleLangSwitch}
      className="lang-switch-btn"
    >
      <span>{t('lang.currentLang')}</span>
    </button>
  );
};

const NavbarLogo: React.FC<NavLinkProps> = () => {
  const location = useLocation();
  const isMainPage = location.pathname === pageRoutes.mainPage();
  const navigate = useNavigate();
  const { scrollToTop } = animateScroll;

  return (
    <div
      className="navbar-logo"
      onClick={isMainPage
        ? scrollToTop
        : () => navigate(pageRoutes.mainPage())
      }
    >
      <Logo />
    </div>
  );
};

const CartLink: React.FC = () => {
  const { items } = useSelector(getCartState);
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart-link-wrapper">
      <RouterLink
        className="no-decoration cart-link"
        to={pageRoutes.cartPage()}
      >
        <CartIcon />
      </RouterLink>
      {items.length
        ? <div className="items-in-cart">{itemsCount}</div>
        : ''}
    </div>
  );
};

const MenuToggleButton: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpenMenu } = useSelector(getNavbarState);

  const handleToggleMenu = () => {
    dispatch(actions.toggleMenu(!isOpenMenu));
  };

  return (
    <button
      className={cn('navbar-toggle-menu', {
        opened: isOpenMenu,
      })}
      type="button"
      aria-label='open-navbar'
      aria-expanded={isOpenMenu}
      onClick={handleToggleMenu}
    >
      <div className="line" />
      <div className="line" />
      <div className="line" />
      <div className="line" />
      <div className="line" />
      <div className="line" />
    </button>
  );
};

const NavbarIcons: React.FC<NavLinkProps> = ({ isMainPage, isProductPage, isWide }) => (
  <div className="d-flex align-items-center">
    {isProductPage ? <BackButton /> : null}
    {!isMainPage ? <HomePageButton /> : null}
    <CartLink />
    {isWide ? <LanguageToggleButton /> : <MenuToggleButton />}
  </div>
);

const NavbarLinks: React.FC<NavLinkProps> = ({ isMainPage, isProductPage, isWide }) => (
  <div className="navbar-links">
    <NavbarLogo isMainPage={isMainPage} />
    <PageNavLink isMainPage={isMainPage} />
    <NavbarIcons
      isMainPage={isMainPage}
      isProductPage={isProductPage}
      isWide={isWide}
    />
  </div>
);

export const SocialLinks: React.FC<SocialLinksProps> = ({ t = null }) => {
  const socialLinks = {
    telegram: Telegram,
    whatsapp: Whatsapp,
  };

  return (
    <>
      {Object.entries(socialLinks).map(([contact, Icon]) => (
        <a
          key={contact}
          href={linkRoutes[contact as keyof typeof socialLinks]()}
          className="contact-links"
        >
          <Icon />
          {t ? <span>{t(`navbar.${contact}`)}</span> : ''}
        </a>
      ))}
    </>
  );
};

const NavbarBody: React.FC<NavLinkProps> = ({ isMainPage }) => {
  const { isOpenMenu } = useSelector(getNavbarState);

  return (
    <div className={cn('navbar-body', {
      'navbar-body-show': isOpenMenu,
      'navbar-body-hide': !isOpenMenu,
    })}>
      <PageNavLink isMainPage={isMainPage} />
      <div className="navbar-footer">
        <div className="navbar-contacts">
          <SocialLinks />
        </div>
        <LanguageToggleButton />
      </div>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const isWide = useMediaQuery('(min-width: 1024px)');
  const location = useLocation();
  const isMainPage = location.pathname === pageRoutes.mainPage();
  const isProductPage = location.pathname.replace(/\/\d+$/, '') === pageRoutes.anyProductPage();

  return (
    <nav className="navbar">
      {isWide
        ? <NavbarLinks
          isMainPage={isMainPage}
          isProductPage={isProductPage}
          isWide={isWide}
        />
        : <div className="d-flex align-items-center justify-content-between w-100">
          <NavbarLogo isMainPage={isMainPage} />
          <NavbarIcons
            isMainPage={isMainPage}
            isProductPage={isProductPage}
            isWide={isWide}
          />
        </div>
      }
      <NavbarBody isMainPage={isMainPage} />
    </nav>
  );
};
