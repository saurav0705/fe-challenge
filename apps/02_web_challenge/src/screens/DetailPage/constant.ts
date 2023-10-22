import { OrgDetailPageResponseObjectType } from '../../hooks/useOrgRepoList';

type FilterObject = {
  [k in keyof Omit<OrgDetailPageResponseObjectType, 'org'>]: Array<{
    label: string;
    value: NonNullable<OrgDetailPageResponseObjectType[k]>;
  }>;
};

export const FILTERS: FilterObject = {
  direction: [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ],
  sort: [
    { label: 'Created', value: 'created' },
    { value: 'full_name', label: 'Full Name' },
    { value: 'pushed', label: 'Pushed' },
    { label: 'Updated', value: 'updated' },
  ],
  type: [
    { value: 'all', label: 'All' },
    { value: 'forks', label: 'Forks' },
    { value: 'member', label: 'Member' },
    { value: 'private', label: 'Private' },
    { value: 'public', label: 'Public' },
    { value: 'sources', label: 'Sources' },
  ],
};
