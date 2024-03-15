import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { CloseIcon } from '../Icons/CloseIcon';

interface Props {
  isOpenWidget: boolean;
  handleToggleWidget: () => void;
  formLink: string;
}

export const Widget = (
  {
    isOpenWidget,
    handleToggleWidget,
    formLink,
  }: Props,
): JSX.Element => {
  const { t } = useTranslation();

  return (
    <aside className={cn('booking-widget-container', {
      'show-booking': isOpenWidget,
      'hide-booking': !isOpenWidget,
    })}>
      <div className="booking-widget-wrapper">
        <iframe
          title={t('others.yclients')}
          src={formLink}
          className="booking-frame"
        >
        </iframe>
        <button
          type="button"
          aria-label={t('ariaLabels.closeBtn')}
          onClick={handleToggleWidget}
          className="close-btn"
        >
          <CloseIcon />
        </button>
      </div>
    </aside>
  );
};
