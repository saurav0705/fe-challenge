import { Select } from '@mantine/core';
import { FILTERS } from '../constant';
import classes from '../styles.module.css';
import { FilterProp } from '../interface';
import { OrgDetailPageResponseObjectType } from '../../../hooks/useOrgRepoList';

export const Direction = ({
  value,
  setFunction,
}: FilterProp<OrgDetailPageResponseObjectType['direction']>) => {
  return (
    <Select
      label="Direction"
      className={classes.m3}
      data={FILTERS.direction}
      allowDeselect={false}
      value={value}
      onChange={(item) =>
        setFunction(
          item as NonNullable<OrgDetailPageResponseObjectType['direction']>
        )
      }
    />
  );
};
