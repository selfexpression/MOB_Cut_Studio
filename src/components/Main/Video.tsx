import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@reactuses/core';

import backgroundVideo from '../../assets/video/background-video.mp4';
import videoPoster from '../../assets/video/video-poster.jpg';

export const Video: React.FC = () => {
  const { t } = useTranslation();
  const isWide = useMediaQuery('(min-width: 768px)');

  return (
    <section id="video" className="bg-light">
      <div className="video-container">
        <div className="video-text">
          <p className="text-content aqua-color p-5">{t('video.paragraph')}</p>
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
