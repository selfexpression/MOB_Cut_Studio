import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { teamImages } from '../../assets/team/index';
import { linkRoutes } from '../../utils/routes';
import { getReviewsWidgetState } from '../../utils/selectors';
import { actions } from '../../slices/reviewsSlice';

import { Widget } from './Widget';

interface TeamCardProps {
  handleToggleWidget: () => void;
}

const TeamCards: React.FC<TeamCardProps> = ({
  handleToggleWidget,
}): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleCurrentEmployee = (id: number): void => {
    dispatch(actions.setCurrentEmployeeId(id));
    handleToggleWidget();
  };

  return (
    <div className="team-card-container">
      {teamImages.map(({ photo, id }) => (
        <div key={id} className="team-card">
          <img src={photo} alt={t('alts.teammate')} className="team-image" />
          <div className="team-card-info">
            <h3 className="teammate-name">
              {t(`team.teammates.${id}`)}
            </h3>
            <div
              className="reviews-button-wrapper"
              onClick={() => handleCurrentEmployee(id)}
            >
              <button type="button" className="reviews-button" />
              <p>{t('team.reviews')}</p>
            </div>
            <p className="teammate-description">
              {t(`team.teammatesDescription.${id}`)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const reviewsLinksMapping: { [key: number]: string } = {
  1: linkRoutes.reviews.maslov,
  2: linkRoutes.reviews.golub,
  3: linkRoutes.reviews.anikin,
};

export const Team: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpenWidget, currentEmployeeId } = useSelector(
    getReviewsWidgetState,
  );

  const handleToggleWidget = (): void => {
    dispatch(actions.toggleWidget(!isOpenWidget));
  };

  return (
    <section id="team" className="bg-light text-center">
      <div className="team-container">
        <div className="team-text">
          <h1>{t('team.header')}</h1>
          <p>{t('team.description')}</p>
        </div>
        <TeamCards handleToggleWidget={handleToggleWidget} />
        <Widget
          isOpenWidget={isOpenWidget}
          handleToggleWidget={handleToggleWidget}
          formLink={reviewsLinksMapping[currentEmployeeId]}
        />
      </div>
    </section>
  );
};
