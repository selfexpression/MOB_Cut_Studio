import React from 'react';
import { useTranslation } from 'react-i18next';

import { teamImages } from '../../assets/team/index';

const TeamCards: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="team-card-container">
      {teamImages.map(({ photo, id }) => (
        <div
          key={id}
          className="team-card"
        >
          <img
            src={photo}
            alt={t('alts.teammate')}
            className="team-image"
          />
          <div className="team-card-text">
            <div className="teammate-name text-center">
              {t(`team.teammates.${id}`)}
            </div>
            <div className="teammate-description">
              {t(`team.teammatesDescription.${id}`)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Team: React.FC = () => {
  const { t } = useTranslation();
  const teamDescriptions = t('team.description', { returnObjects: true });

  return (
    <section id="team" className="bg-light text-center">
      <div className="team-container">
        <div className="team-text">
          <h1 className="text-center text-header aqua-color mb-4">
            {t('team.header')}
          </h1>
          {Object.entries(teamDescriptions).map(([key, value]) => (
            <p key={key} className="m-1">
              {value}
            </p>
          ))}
        </div>
        <TeamCards />
      </div>
    </section>
  );
};
