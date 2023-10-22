import { create } from 'zustand';
import { Github } from '../services/github';
import { Endpoints } from '@octokit/types';
import { LocalStorageInstance } from '../services/LocalStorage';

export type OrgResponseType = Endpoints['GET /orgs/{org}']['response']['data'];

export type SearchStore = {
  results: OrgResponseType | null;
  previous: Array<OrgResponseType>;
  query: (query: string) => void;
  isLoading: boolean;
  hasSearchOrg: boolean;
  hasError: boolean;
  deletePrevious: (id: number) => void;
};

const mutatePrevious = (
  curr: OrgResponseType,
  previous: Array<OrgResponseType>
) => {
  const filteredDate = previous.filter((item) => item.id !== curr.id);
  return [...filteredDate, curr];
};

export const useSearchStore = create<SearchStore>((set) => ({
  results: null,
  previous: JSON.parse(LocalStorageInstance.get('previous-search') ?? '[]'),
  isLoading: false,
  hasSearchOrg: false,
  hasError: false,
  query: async (query: string) => {
    if (!query.length) {
      set(() => ({
        results: null,
        isLoading: true,
        hasSearchOrg: !!query.length,
        hasError: false,
      }));
      return;
    }
    set(() => ({
      isLoading: true,
      hasSearchOrg: !!query.length,
      hasError: false,
    }));
    try {
      const res = await Github.searchForOrganizations(query);
      set((state) => {
        const updatedPrevious = mutatePrevious(res.data, state.previous);
        LocalStorageInstance.set(
          'previous-search',
          JSON.stringify(updatedPrevious)
        );
        return {
          results: res.data,
          previous: updatedPrevious,
        };
      });
    } catch (e) {
      console.log(`Error Ocuured While querying`, e);
      set(() => ({ hasError: true }));
    }

    set(() => ({ isLoading: false }));
  },
  deletePrevious: (id: number) => {
    set((state) => {
      const updatedPrevious = state.previous.filter((item) => item.id !== id);
      LocalStorageInstance.set(
        'previous-search',
        JSON.stringify(updatedPrevious)
      );
      return {
        previous: updatedPrevious,
      };
    });
  },
}));
