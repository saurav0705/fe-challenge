import { Avatar, rem } from '@mantine/core';
import {
  Spotlight,
  SpotlightActionData,
  SpotlightActionGroupData,
} from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchStore, useSearchStore } from '../../store/search.store';
import {
  ACTIONS_STRING,
  DefaultGroup,
  NOTIFICATIONS,
  SPOTLIGHT,
  THROTTLE_TIMEOUT,
} from './constants';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

export const SearchComponent = () => {
  const ref = useRef<NodeJS.Timeout>();
  const notificationId = useRef<string>('');
  const { results, previous, query, hasError } = useSearchStore(
    (state) => state
  );
  const [actions, setActions] =
    useState<SpotlightActionGroupData[]>(DefaultGroup);
  const navigate = useNavigate();

  const transformResponseToActions = useCallback(
    (item: SearchStore['results']): SpotlightActionData[] => {
      if (!item) {
        return [];
      }

      return [
        {
          id: item.id.toString(),
          label: item.login,
          description: item.description ?? '',
          onClick: () => navigate(`/details/${item.login}`),
          leftSection: <Avatar src={item.avatar_url} radius={'sm'} />,
        },
      ];
    },
    [navigate]
  );

  useEffect(() => {
    if (hasError) {
      notifications.hide(notificationId.current ?? '');
      notificationId.current = notifications.show(NOTIFICATIONS.ORG_NOT_FOUND);
    }

    if (results) {
      setActions([
        {
          group: ACTIONS_STRING.SEARCH,
          actions: transformResponseToActions(results),
        },
      ]);
      return;
    }

    setActions([
      {
        group: ACTIONS_STRING.SEARCH,
        actions: transformResponseToActions(results),
      },
      {
        group: ACTIONS_STRING.PREVIOUS,
        actions: previous.map((item) => transformResponseToActions(item)[0]),
      },
    ]);
  }, [results, previous, hasError, transformResponseToActions]);

  const throttle = useCallback(
    (param: string) => {
      clearTimeout(ref.current);
      ref.current = setTimeout(() => query(param), THROTTLE_TIMEOUT);
    },
    [query]
  );

  return (
    <Spotlight
      actions={actions}
      highlightQuery
      onQueryChange={throttle}
      searchProps={{
        leftSection: (
          <IconSearch
            style={{ width: rem(20), height: rem(20) }}
            stroke={1.5}
          />
        ),
        placeholder: SPOTLIGHT.PLACEHOLDER,
      }}
    />
  );
};
