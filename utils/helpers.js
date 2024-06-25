import { RATE_LABELS } from './constants';

export const getRateDisplay = (rates) => {
  if (!rates) return '';

  for (const rateType of Object.keys(RATE_LABELS)) {
    if (rates[rateType]) {
      return `$${rates[rateType].toLocaleString()}/${
        RATE_LABELS[rateType].short
      }`;
    }
  }

  return '';
};
