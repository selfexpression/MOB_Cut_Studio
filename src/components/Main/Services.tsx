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
      <h1 className="aqua-color">
        {t('services.header')}
      </h1>
      <p className="p-3">
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
          <p className="text-center p-2">
            {t(`services.names.${id}`)}
          </p>
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
    <div className="p-2">
      <button
        type="button"
        aria-label={t('ariaLabels.bookingBtn')}
        className={cn('booking-btn', {
          'scale-up': isScrolled,
        })}
        onClick={handleToggleWidget}
      >
        {t('services.chooseService')}
      </button>
    </div>
  );
};

const Discounts: React.FC<Props> = ({ isScrolled }) => {
  const { t } = useTranslation();
  const discounts = t('services.discounts', { returnObjects: true });
  const discountsQuantity = Object.keys(discounts).length;
  const [currentDisount, setCurrentDiscount] = useState(0);

  const nextDiscount = () => {
    setCurrentDiscount((currentDisount + 1) % discountsQuantity);
  };

  useEffect(() => {
    const intervalId = setInterval(nextDiscount, 3000);

    return () => clearInterval(intervalId);
  }, [currentDisount]);

  const price = (
    <>
      <span className="old-price">{'2900'}</span>
      <span className="new-price">{' 2600'}</span>
    </>
  );

  return (
    <div className={cn('services-discounts', {
      'scale-up': isScrolled,
    })}>
      {Object.entries(discounts).map(([key, value], index) => (
        <p key={key} className={cn('discount', {
          active: index === currentDisount,
          inactive: index !== currentDisount,
        })}>
          {value}
          {key === 'fatherAndSon' ? price : null}
        </p>
      ))}
    </div>
  );
};

export const Services: React.FC = () => {
  const { scrollY } = useScrollY();
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (scrollY > 1200) {
      setScrolled(true);
    }
  }, [scrollY]);

  return (
    <section id="services" className="bg-light text-center">
      <ServiceText isScrolled={isScrolled} />
      <ServiceCards isScrolled={isScrolled} />
      <Discounts isScrolled={isScrolled} />
      <BookingButton isScrolled={isScrolled} />
    </section>
  );
};
