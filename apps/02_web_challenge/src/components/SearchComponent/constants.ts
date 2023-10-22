import { SpotlightActionGroupData } from '@mantine/spotlight';

export const ACTIONS_STRING = {
  SEARCH: 'Search',
  PREVIOUS: 'Previous',
  LOADING: 'Loding..',
};

export const SPOTLIGHT = {
  PLACEHOLDER: 'Search...',
};

export const DefaultGroup: SpotlightActionGroupData[] = [
  {
    group: ACTIONS_STRING.SEARCH,
    actions: [],
  },
  {
    group: ACTIONS_STRING.PREVIOUS,
    actions: [],
  },
];

export const THROTTLE_TIMEOUT = 500;

export const NOTIFICATIONS = {
  ORG_NOT_FOUND: {
    color: 'red',
    title: 'Not Found',
    message: 'Organization you Search For Is Not Found',
  },
};
