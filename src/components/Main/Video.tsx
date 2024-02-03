import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@reactuses/core';
import cn from 'classnames';

import backgroundVideo from '../../assets/video/background-video.mp4';
import videoPoster from '../../assets/video/video-poster.jpg';
import { useScrollY } from '../../hooks';

export const Video: React.FC = () => {
  const { t } = useTranslation();
  const isWide = useMediaQuery('(min-width: 768px)');
  const [isScrolled, setScrolled] = useState(false);
  const { scrollY } = useScrollY();

  useEffect(() => {
    if (scrollY > 170) {
      setScrolled(true);
    }
  }, [scrollY]);

  return (
    <section id="video" className="bg-light">
      <div className="video-container">
        <div className={cn('video-text', {
          'fade-up': isScrolled,
        })}>
          <p className="text-content aqua-color m-1">{t('video.paragraph1')}</p>
          <p className="text-content aqua-color m-1">{t('video.paragraph2')}</p>
        </div>
        <div className="video-wrapper">
          <video
            autoPlay
            muted
            loop
            preload="auto"
            playsInline
            className="videoframe"
            poster={videoPoster}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          {isWide ? (<div className="video-image" />) : null}
        </div>
      </div>
    </section>
  );
};
