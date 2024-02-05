import React from 'react';
import { useMediaQuery } from '@reactuses/core';
import { useDispatch, useSelector } from 'react-redux';
import { Telegram, Whatsapp } from 'react-bootstrap-icons';
import cn from 'classnames';
import { Link as ScrollLink, animateScroll } from 'react-scroll';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { actions } from '../slices/navbarSlice';
import { pageRoutes, linkRoutes } from '../utils/routes';
import { getNavbarState } from '../utils/selectors';

import { Logo } from './Icons/Logo';
import { HomeIcon } from './Icons/HomeIcon';

const NavLink: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isOpenMenu } = useSelector(getNavbarState);
  const isMainPage = location.pathname === pageRoutes.mainPage();

  const handleToggleMenu = () => {
    dispatch(actions.toggleMenu(!isOpenMenu));
  };

  const pagesMap = {
    services: ScrollLink,
    store: RouterLink,
    team: RouterLink,
    slider: ScrollLink,
    footer: ScrollLink,
  };

  return (
    <>
      {isMainPage
        ? (
          Object.entries(pagesMap).map(([pageName, Link]) => (
            <Link
              key={pageName}
              to={pageName}
              duration={500}
              smooth="true"
              className="nav-link"
              onClick={handleToggleMenu}
            >
              {t(`navbar.${pageName}`)}
            </Link>
          ))
        )
        : (
          <RouterLink
            to={pageRoutes.mainPage()}
            onClick={handleToggleMenu}
            className="nav-link"
          >
            {HomeIcon()}
          </RouterLink>
        )
      }
    </>
  );
};

const LangSwitcher: React.FC = () => {
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

const NavbarBody: React.FC = () => {
  const isWide = useMediaQuery('(min-width: 768px)');
  const { isOpenMenu } = useSelector(getNavbarState);

  const socialLinks = {
    telegram: Telegram,
    whatsapp: Whatsapp,
  };

  return (
    isWide
      ? (
        <div className="navbar-links">
          <div className="mr-1">
            <NavLink />
          </div>
          <LangSwitcher />
        </div>
      )
      : (
        <div className={cn('navbar-body', {
          'navbar-body-show': isOpenMenu,
          'navbar-body-hide': !isOpenMenu,
        })}>
          <div className="d-flex flex-column p-2">
            <NavLink />
          </div>
          <div className="navbar-footer">
            <div className="navbar-contacts">
              {Object.entries(socialLinks).map(([contact, Icon]) => (
                <a
                  key={contact}
                  href={linkRoutes[contact as keyof typeof socialLinks]()}
                  className="contact-links"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <LangSwitcher />
          </div>
        </div>
      )
  );
};

const ToggleButton: React.FC = () => {
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

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isMainPage = location.pathname === pageRoutes.mainPage();
  const isWide = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();
  const { scrollToTop } = animateScroll;

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={isMainPage ? scrollToTop : () => navigate(pageRoutes.mainPage())}
      >
        <Logo />
      </div>
      {!isWide ? <ToggleButton /> : null}
      <NavbarBody />
    </nav>
  );
};
