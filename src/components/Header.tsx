import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParallaxController } from 'react-scroll-parallax';
import cn from 'classnames';
import { useMediaQuery } from '@reactuses/core';

import { actions } from '../slices/bookingWidgetSlice';
import { useScrollY } from '../hooks/index';
import { getBookingWidgetState, getImageState } from '../utils/selectors';
import { loadImageFolder } from '../thunks/imagesThunk';
import { firebaseApiRoutes } from '../utils/routes';
import { AppDispatch } from '../types/aliases';

const Background: React.FC = () => {
  const { t } = useTranslation();
  const { scrollY } = useScrollY();
  const dispatch = useDispatch<AppDispatch>();
  const { backgroundImages } = useSelector(getImageState);
  const parallaxController = useParallaxController();
  const isWide = useMediaQuery('(min-width: 768px)');
  const isHeight = useMediaQuery('(min-height: 1024px)');
  const handleImageLoad = () => parallaxController?.update();

  useEffect(() => {
    if (!backgroundImages.length) {
      dispatch(loadImageFolder({
        folderPath: firebaseApiRoutes.backgroundImages(),
      }));
    }

    handleImageLoad();
  }, [parallaxController]);

  const translateBanner = `translate3d(0px, -${scrollY}px, 0px)`;
  const translateLayer = `translate3d(0px, calc(${scrollY}px / 1.5), 0px)`;

  return (
    <picture
      className="parallax-banner parallax-wrapper banner"
      style={isWide && isHeight ? { transform: translateBanner } : undefined}
    >
      {backgroundImages.map(({ width, url }) => (
        <source
          key={width}
          media={`(max-width: ${width}px)`}
          type="image/jpeg"
          srcSet={url}
          onLoad={handleImageLoad}
        />
      ))}
      <img
        alt={t('alts.background')}
        className="parallax-layer parallax-wrapper layer"
        style={isWide && isHeight ? { transform: translateLayer } : undefined}
        onLoad={handleImageLoad}
      />
    </picture>
  );
};

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpenWidget } = useSelector(getBookingWidgetState);
  const buttonClasses = cn(
    'btn-info-booking',
    'booking-btn',
    'head-booking-btn',
    'mt-4 rounded-0',
  );

  const handleWidget = () => {
    dispatch(actions.toggleWidget(!isOpenWidget));
  };

  return (
    <header id="/" className="main-header bg-light vh-100">
      <Background />
      <main
        className="main-content main-content-animation d-flex flex-column align-items-center"
      >
        <p className="text-content color-light text-center m-0">
          {t('header.text')}
        </p>
        <button
          type="button"
          aria-label={t('ariaLabels.bookingBtn')}
          className={buttonClasses}
          onClick={handleWidget}
        >
          <span>{t('header.onlineBooking')}</span>
        </button>
      </main>
    </header>
  );
};
