import { Select } from '@mantine/core';
import { FILTERS } from '../constant';
import classes from '../styles.module.css';
import { OrgDetailPageResponseObjectType } from '../../../hooks/useOrgRepoList';
import { FilterProp } from '../interface';

export const Type = ({
  value,
  setFunction,
}: FilterProp<OrgDetailPageResponseObjectType['type']>) => {
  return (
    <Select
      className={classes.m3}
      label="Type"
      data={FILTERS.type}
      allowDeselect={false}
      value={value}
      onChange={(item) =>
        setFunction(
          item as NonNullable<OrgDetailPageResponseObjectType['type']>
        )
      }
    />
  );
};
