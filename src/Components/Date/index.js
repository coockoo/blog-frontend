import React from 'react';
import { parseISO, format as formatFn } from 'date-fns';
import cn from 'classnames';

import s from './styles.less';

export default function Date(props) {
  const { value, format, className, isLoading } = props;

  const formattedValue = value ? formatFn(parseISO(value), format) : null;
  const content = isLoading ? null : formattedValue;

  return (
    <div className={cn(s.date, { [s.isLoading]: isLoading }, className)} title={value}>
      {content}
    </div>
  );
}

Date.defaultProps = {
  format: "eeee, do 'of' MMMM yyyy",
};
