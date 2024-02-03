import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { actions } from '../../slices/bookingWidgetSlice';
import { useScrollY } from '../../hooks/index';
import { serviceImages } from '../../assets/services/index';
import { getBookingWidgetState } from '../../utils/selectors';

interface Props {
  isScrolled: boolean;
}

const ServiceText: React.FC<Props> = ({ isScrolled }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('services-text', {
      'fade-down': isScrolled,
    })}>
      <h1 className="text-header">
        {t('services.heading')}
      </h1>
      <p className="p-3 text-content">
        {t('services.description')}
      </p>
    </div>
  );
};

const ServiceCards: React.FC<Props> = ({ isScrolled }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('services-flow', {
      'scale-down': isScrolled,
    })}>
      {serviceImages.map(({ image, id }) => (
        <div
          key={id}
          className="services-card"
        >
          <img
            src={image}
            alt="card"
            loading="lazy"
            className={isScrolled ? 'scale-up' : ''}
          />
          <div className="text-start text-content p-2">
            {t(`services.names.${id}`)}
          </div>
        </div>
      ))}
    </div>
  );
};

const BookingButton: React.FC<Props> = ({ isScrolled }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpenWidget } = useSelector(getBookingWidgetState);

  const handleToggleWidget = () => {
    dispatch(actions.toggleWidget(!isOpenWidget));
  };

  return (
    <div className="p-5">
      <button
        type="button"
        aria-label={t('ariaLabels.bookingBtn')}
        className={cn('services-btn', {
          'scale-up': isScrolled,
        })}
        onClick={handleToggleWidget}
      >
        {t('services.chooseService')}
      </button>
    </div>
  );
};

export const Services: React.FC = () => {
  const { scrollY } = useScrollY();
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (scrollY > 1500) {
      setScrolled(true);
    }
  }, [scrollY]);

  return (
    <section id="services" className="bg-light text-center">
      <ServiceText isScrolled={isScrolled} />
      <ServiceCards isScrolled={isScrolled} />
      <BookingButton isScrolled={isScrolled} />
    </section>
  );
};
