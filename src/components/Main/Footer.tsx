import React, { useEffect, useRef, useState } from 'react';
import {
  Telegram, Whatsapp, Telephone,
} from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useYMaps } from '@pbe/react-yandex-maps';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../slices/bookingWidgetSlice';
import { linkRoutes } from '../../utils/routes';
import { getBookingWidgetState } from '../../utils/selectors';

const Ymap = () => {
  const ymaps = useYMaps(['Map', 'Placemark']);
  const mapRef = useRef(null);

  useEffect(() => {
    const settings = {
      center: [55.025854, 82.931218],
      placemark: [55.025854, 82.931218],
      zoom: 14,
    };

    if (!ymaps || !mapRef.current) {
      return;
    }

    mapRef.current = new ymaps.Map(mapRef.current, {
      center: settings.center,
      zoom: settings.zoom,
    });

    const placemark = new ymaps.Placemark(settings.placemark);
    mapRef.current.geoObjects.add(placemark);
  }, [ymaps]);

  return (
    <div ref={mapRef} className="map" />
  );
};

const InteractiveElements = () => {
  const { t } = useTranslation();
  const [isVibrating, setVibrating] = useState(false);
  const dispatch = useDispatch();
  const { isOpenWidget } = useSelector(getBookingWidgetState);

  const handleWidgetShow = () => {
    dispatch(actions.toggleWidget(!isOpenWidget));
  };

  useEffect(() => {
    const toggleVibration = () => {
      setVibrating((prevVibrating) => !prevVibrating);
    };

    const toggleInterval = setInterval(() => {
      toggleVibration();
    }, 1000);

    return () => clearInterval(toggleInterval);
  }, [isVibrating]);

  return (
    <>
      <button
        type="button"
        aria-label={t('ariaLabels.bookingBtn')}
        className="btn-info-booking booking-btn rounded-1 mb-3"
        onClick={handleWidgetShow}
      >
        <span>{t('navbar.onlineBooking')}</span>
      </button>
      <div className="footer-social d-flex align-items-center">
        <a href={linkRoutes.whatsapp()} className="d-flex align-items-center">
          <Whatsapp className="me-1" />
          {t('navbar.whatsapp')}
        </a>
        <a href={linkRoutes.telegram()} className="ms-2 d-flex align-items-center">
          <Telegram className="me-1" />
          {t('navbar.telegram')}
        </a>
      </div>
      <div className="d-flex align-items-center mt-3">
        <Telephone className={isVibrating ? 'vibrating-phone' : ''} />
        <a href={linkRoutes.phoneNumber()}>
          <button
            type="button"
            aria-label={t('ariaLabels.callBtn')}
            className="rounded-5 m-2 btn-info-booking call-btn booking-btn"
          >
            <span>{t('navbar.phoneNumber')}</span>
          </button>
        </a>
      </div>
    </>
  );
};

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer" className="bg-dark">
      <div className="footer-container">
        <div className="footer-contacts text-center">
          <h1 className="footer-head m-2">{t('footer.ourContacts')}</h1>
          <div className="m-3 footer-text">
            <InteractiveElements />
            <p className="footer-text no-wrap">{t('footer.location')}</p>
          </div>
        </div>
        <div className="map-container">
          <h2 className="footer-head m-3 p-3 text-center">
            {t('footer.findUsOnMap')}
          </h2>
          <Ymap />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
