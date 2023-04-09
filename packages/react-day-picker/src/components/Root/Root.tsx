import React, { AriaAttributes, useEffect, useState } from 'react';

import { Month } from 'components/Month';
import { useDayPicker } from 'contexts/DayPicker';
import { useFocusContext } from 'contexts/Focus';
import { useNavigation } from 'contexts/Navigation';
import { DataAttributes } from 'types/DayPickerBase';

/** Render the container with the months according to the number of months to display. */
export function Root(): JSX.Element {
  const dayPicker = useDayPicker();
  const focusContext = useFocusContext();
  const navigation = useNavigation();

  const [hasInitialFocus, setHasInitialFocus] = useState(false);

  // Focus the focus target when initialFocus is passed in
  useEffect(() => {
    if (!dayPicker.initialFocus) return;
    if (!focusContext.focusTarget) return;
    if (hasInitialFocus) return;

    focusContext.focus(focusContext.focusTarget);
    setHasInitialFocus(true);
  }, [
    dayPicker.initialFocus,
    hasInitialFocus,
    focusContext.focus,
    focusContext.focusTarget,
    focusContext
  ]);

  // Apply classnames according to props
  const classNames = [dayPicker.classNames.root, dayPicker.className];
  if (dayPicker.numberOfMonths > 1) {
    classNames.push(dayPicker.classNames.multiple_months);
  }
  if (dayPicker.showWeekNumber) {
    classNames.push(dayPicker.classNames.with_weeknumber);
  }

  const style = {
    ...dayPicker.styles.root,
    ...dayPicker.style
  };

  const dataAttributes = (Object.keys(dayPicker) as Array<keyof DataAttributes>)
    .filter((key) => key.startsWith('data-'))
    .reduce(
      (attrs, key) => ({ ...attrs, [key]: dayPicker[key] }),
      {} as DataAttributes
    );

  const ariaAttributes = (Object.keys(dayPicker) as Array<keyof AriaAttributes>)
    .filter((key) => key.startsWith('aria-'))
    .reduce(
      (attrs, key) => ({ ...attrs, [key]: dayPicker[key] }),
      {} as AriaAttributes
    );

  return (
    <div
      className={classNames.join(' ')}
      style={style}
      dir={dayPicker.dir}
      id={dayPicker.id}
      {...dataAttributes}
      {...ariaAttributes}
    >
      <div
        className={dayPicker.classNames.months}
        style={dayPicker.styles.months}
      >
        {navigation.displayMonths.map((month, i) => (
          <Month key={i} displayIndex={i} displayMonth={month} />
        ))}
      </div>
    </div>
  );
}
