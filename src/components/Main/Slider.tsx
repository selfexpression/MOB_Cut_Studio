import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChevronCompactLeft as ArrowLeft,
  ChevronCompactRight as ArrowRight,
} from 'react-bootstrap-icons';
import cn from 'classnames';

import { actions } from '../../slices/sliderSlice';
import { getSliderState } from '../../utils/selectors';

type IntervalId = ReturnType<typeof setInterval>;

const Arrows: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const intervalIdRef = useRef<IntervalId | null>(null);

  const clearExistingInterval = () => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
  };

  const setNewInterval = () => {
    intervalIdRef.current = setInterval(() => {
      dispatch(actions.toggleSlide('next'));
    }, 5000);
  };

  const toggleSlide = (selector: string): void => {
    dispatch(actions.toggleSlide(selector));
    clearExistingInterval();
    setNewInterval();
  };

  useEffect(() => {
    setNewInterval();
    return () => clearExistingInterval();
  }, [dispatch]);

  return (
    <>
      <ArrowRight
        className="next"
        type="button"
        aria-label={t('ariaLabels.next')}
        onClick={() => toggleSlide('next')}
      />
      <ArrowLeft
        className="prev"
        type="button"
        aria-label={t('ariaLabels.prev')}
        onClick={() => toggleSlide('prev')}
      />
    </>
  );
};

export const Slider = (): JSX.Element => {
  const { t } = useTranslation();
  const { currentSlide, images } = useSelector(getSliderState);

  return (
    <section id="slider" className="bg-light">
      <div className="slider-text">
        <p>
          {t('slider.text')}
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
