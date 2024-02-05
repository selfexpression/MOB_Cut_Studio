import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParallaxController } from 'react-scroll-parallax';
import { useMediaQuery } from '@reactuses/core';

import { actions } from '../../slices/bookingWidgetSlice';
import { useScrollY } from '../../hooks/index';
import { getBookingWidgetState } from '../../utils/selectors';
import { pageRoutes } from '../../utils/routes';
import { backgroundImages } from '../../assets/background';

const Background: React.FC = () => {
  const { t } = useTranslation();
  const { scrollY } = useScrollY();
  const parallaxController = useParallaxController();
  const isWide = useMediaQuery('(min-width: 768px)');

  const handleImageLoad = () => parallaxController?.update();

  useEffect(() => {
    handleImageLoad();
  }, [parallaxController]);

  const translateBanner = `translate3d(0px, -${scrollY}px, 0px)`;
  const translateLayer = `translate3d(0px, calc(${scrollY}px / 1.5), 0px)`;

  return (
    <picture
      className="parallax-banner"
      style={isWide ? { transform: translateBanner } : undefined}
    >
      {backgroundImages.map(({ width, srcSet }) => (
        <source
          key={width}
          media={`(max-width: ${width}px)`}
          type="image/jpeg"
          srcSet={srcSet}
          onLoad={handleImageLoad}
        />
      ))}
      <img
        alt={t('alts.background')}
        className="parallax-layer"
        style={isWide ? { transform: translateLayer } : undefined}
        onLoad={handleImageLoad}
      />
    </picture>
  );
};

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpenWidget } = useSelector(getBookingWidgetState);

  const handleToggleWidget = () => {
    dispatch(actions.toggleWidget(!isOpenWidget));
  };

  return (
    <header id={pageRoutes.mainPage()} className="main-header">
      {backgroundImages.length
        ? (
          <>
            <Background />
            <main
              className="main-content"
            >
              <p className="text-content color-light text-center m-0 p-4">
                {t('header.text')}
              </p>
              <button
                type="button"
                aria-label={t('ariaLabels.bookingBtn')}
                className="booking-btn"
                onClick={handleToggleWidget}
              >
                <span>{t('header.onlineBooking')}</span>
              </button>
            </main>
          </>
        ) : (
          <div className="spinner-loader" />
        )}
    </header>
  );
};
