import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChevronCompactLeft as ArrowLeft,
  ChevronCompactRight as ArrowRight,
} from 'react-bootstrap-icons';
import cn from 'classnames';

import { actions } from '../../slices/sliderSlice';
import { getSliderState } from '../../utils/selectors';

const Arrows: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const nextSlide = useCallback(() => {
    dispatch(actions.nextSlide());
  }, [dispatch]);

  const prevSlide = () => {
    dispatch(actions.prevSlide());
  };

  useEffect(() => {
    const intervalId = setInterval(() => nextSlide(), 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, nextSlide]);

  return (
    <>
      <ArrowRight
        className="next"
        type="button"
        aria-label={t('ariaLabels.next')}
        onClick={nextSlide}
      />
      <ArrowLeft
        className="prev"
        type="button"
        aria-label={t('ariaLabels.prev')}
        onClick={prevSlide}
      />
    </>
  );
};

export const Slider = () => {
  const { t } = useTranslation();
  const { currentSlide, images } = useSelector(getSliderState);

  return (
    <section id="slider" className="bg-light">
      <div className="slider-text">
        <p className="text-content">
          {t('carousel.description')}
        </p>
      </div>
      <div className="slider-wrapper">
        <div className="slider">
          {images.map(({ image, id }) => (
            <div
              className={cn('slide', {
                active: id === currentSlide,
                inactive: id !== currentSlide,
              })}
              key={id}
            >
              <img
                src={image}
                loading="lazy"
                alt={`${t('alts.slider')} ${id}`}
                className="w-100 h-100"
              />
            </div>
          ))}
        </div>
        <Arrows />
      </div>
    </section>
  );
};
