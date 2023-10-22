import { Select } from '@mantine/core';
import { FILTERS } from '../constant';
import classes from '../styles.module.css';
import { OrgDetailPageResponseObjectType } from '../../../hooks/useOrgRepoList';
import { FilterProp } from '../interface';

export const Sort = ({
  value,
  setFunction,
}: FilterProp<OrgDetailPageResponseObjectType['sort']>) => {
  return (
    <Select
      label="Sort"
      className={classes.m3}
      data={FILTERS.sort}
      allowDeselect={false}
      value={value}
      onChange={(item) =>
        setFunction(
          item as NonNullable<OrgDetailPageResponseObjectType['sort']>
        )
      }
    />
  );
};
