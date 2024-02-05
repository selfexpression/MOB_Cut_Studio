import React, { useEffect, useRef, useState } from 'react';
import {
  Telegram, Whatsapp, Telephone,
} from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useYMaps } from '@pbe/react-yandex-maps';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { actions } from '../../slices/bookingWidgetSlice';
import { linkRoutes } from '../../utils/routes';
import { getBookingWidgetState } from '../../utils/selectors';

const Ymap: React.FC = () => {
  const ymaps = useYMaps(['Map', 'Placemark']);
  const mapRef = useRef(null);

  useEffect(() => {
    const settings = {
      center: [55.025854, 82.931218],
      placemark: [55.025854, 82.931218],
      zoom: 14,
    };

    if (!ymaps || !mapRef.current) return;

    const map = new ymaps.Map(mapRef.current, {
      center: settings.center,
      zoom: settings.zoom,
    });

    const placemark = new ymaps.Placemark(settings.placemark, {});
    map.geoObjects.add(placemark);
  }, [ymaps]);

  return (
    <div ref={mapRef} className="map" />
  );
};

const InteractiveElements: React.FC = () => {
  const { t } = useTranslation();
  const [isVibrating, setVibrating] = useState(false);
  const dispatch = useDispatch();
  const { isOpenWidget } = useSelector(getBookingWidgetState);

  const handleToggleWidget = () => {
    dispatch(actions.toggleWidget(!isOpenWidget));
  };

  useEffect(() => {
    const toggleInterval = setInterval(() => {
      setVibrating((prevVibrating) => !prevVibrating);
    }, 1000);

    return () => clearInterval(toggleInterval);
  }, [isVibrating]);

  return (
    <>
      <button
        type="button"
        aria-label={t('ariaLabels.bookingBtn')}
        className="booking-btn"
        onClick={handleToggleWidget}
      >
        <span>{t('header.onlineBooking')}</span>
      </button>
      <div className="social-links">
        <a href={linkRoutes.whatsapp()} className="link">
          <Whatsapp className="mr-1" />
          {t('navbar.whatsapp')}
        </a>
        <a href={linkRoutes.telegram()} className="link">
          <Telegram className="mr-1" />
          {t('navbar.telegram')}
        </a>
      </div>
      <div className="d-flex align-items-center mt-3">
        <Telephone className={cn('mr-2', {
          'vibrating-phone': isVibrating,
        })} />
        <a href={linkRoutes.phoneNumber()}>
          <button
            type="button"
            aria-label={t('ariaLabels.callBtn')}
            className="booking-btn"
          >
            <span>{t('footer.phoneNumber')}</span>
          </button>
        </a>
      </div>
    </>
  );
};

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-contacts text-content">
          <h2 className="m-2 uppercase">{t('footer.ourContacts')}</h2>
          <div className="footer-interactive">
            <InteractiveElements />
            <p className="no-wrap">{t('footer.location')}</p>
          </div>
        </div>
        <div className="map-container ">
          <h2 className="text-content">
            {t('footer.findUsOnMap')}
          </h2>
          <Ymap />
        </div>
      </div>
    </footer>
  );
};
