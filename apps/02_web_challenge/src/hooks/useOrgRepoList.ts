import { useSearchParams } from 'react-router-dom';
import { Endpoints } from '@octokit/types';
import { useCallback, useEffect, useState } from 'react';
import { Github } from '../services/github';

export type OrgDetailPageResponseObjectType = Omit<
  Endpoints['GET /orgs/{org}/repos']['parameters'],
  'per_page' | 'org'
>;

const supportedParams: OrgDetailPageResponseObjectType | null = {
  type: 'all',
  direction: 'asc',
  sort: 'created',
  page: 1,
};

export const useOrgRepoList = (org: string) => {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] =
    useState<OrgDetailPageResponseObjectType>(supportedParams);
  const [repos, setRepos] = useState<
    Endpoints['GET /orgs/{org}/repos']['response']['data']
  >([]);

  const [maxPage, setMaxPage] = useState<number>(1);

  const fetch = useCallback(
    async (overrides?: Partial<OrgDetailPageResponseObjectType>) => {
      const data = await Github.getReposForOrg({
        ...filters,
        ...overrides,
        org,
      });
      setRepos(data.data);
    },
    [filters, org]
  );

  const syncParams = useCallback(
    (args: OrgDetailPageResponseObjectType) => {
      const _p = Object.entries(args).reduce((prev, curr) => {
        const value = args ? curr[1] : params.get(curr[0]) ?? curr[1];

        return {
          ...prev,
          [curr[0]]:
            curr[0] === 'page' ? parseInt(value.toString(), 10) : value,
        };
      }, {} as OrgDetailPageResponseObjectType);
      setParams({ ..._p, page: _p.page?.toString() ?? '1' });
      return _p;
    },
    [params, setParams]
  );

  useEffect(() => {
    const _p = syncParams(supportedParams);
    setFilters(_p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org]);

  useEffect(() => {
    syncParams(filters);
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const setDirection = useCallback(
    async (params: OrgDetailPageResponseObjectType['direction']) => {
      setFilters((filters) => ({ ...filters, direction: params, page: 1 }));
    },
    []
  );

  const setSort = useCallback(
    async (params: OrgDetailPageResponseObjectType['sort']) => {
      setFilters((filters) => ({ ...filters, sort: params, page: 1 }));
    },
    []
  );

  const setType = useCallback(
    async (params: OrgDetailPageResponseObjectType['type']) => {
      setFilters((filters) => ({ ...filters, type: params, page: 1 }));
    },
    []
  );

  const changePage = useCallback(async (page: number) => {
    setMaxPage((maxPage) => (page > maxPage ? page : maxPage));
    setFilters((filters) => ({ ...filters, page }));
  }, []);

  return {
    filters,
    setSort,
    setType,
    changePage,
    repos,
    setDirection,
    hasNextPage: !!repos.length,
    pages: maxPage,
  };
};
