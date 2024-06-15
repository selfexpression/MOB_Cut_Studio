import React, { useEffect, useRef, useState } from 'react';
import { Telephone } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useYMaps } from '@pbe/react-yandex-maps';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { actions } from '../../slices/bookingWidgetSlice';
import { linkRoutes } from '../../utils/routes';
import { getBookingWidgetState } from '../../utils/selectors';
import { SocialLinks } from '../Navbar';

const Ymap: React.FC = (): JSX.Element => {
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

  return <div ref={mapRef} className="map" />;
};

const CallButton: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [isVibrating, setVibrating] = useState(false);

  useEffect(() => {
    const toggleInterval = setInterval(() => {
      setVibrating((prevVibrating) => !prevVibrating);
    }, 1000);

    return () => clearInterval(toggleInterval);
  }, [isVibrating]);

  return (
    <div className="call-button-wrapper">
      <Telephone
        className={cn({
          vibrating: isVibrating,
        })}
      />
      <a href={linkRoutes.phoneNumber()}>
        <button
          type="button"
          aria-label={t('ariaLabels.callBtn')}
          className="booking-button"
        >
          {t('footer.phoneNumber')}
        </button>
      </a>
    </div>
  );
};

const InteractiveElements: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpenWidget } = useSelector(getBookingWidgetState);

  const handleToggleWidget = () => {
    dispatch(actions.toggleWidget(!isOpenWidget));
  };

  return (
    <>
      <button
        type="button"
        aria-label={t('ariaLabels.bookingBtn')}
        className="booking-button"
        onClick={handleToggleWidget}
      >
        {t('header.onlineBooking')}
      </button>
      <div className="social-links">
        <SocialLinks />
      </div>
      <CallButton />
    </>
  );
};

export const Footer: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-contacts">
          <h3>{t('footer.contacts')}</h3>
          <div className="footer-interactive">
            <InteractiveElements />
            <p>{t('footer.location')}</p>
          </div>
        </div>
        <div className="map-container ">
          <h3>{t('footer.findUsOnMap')}</h3>
          <Ymap />
        </div>
      </div>
    </footer>
  );
};
