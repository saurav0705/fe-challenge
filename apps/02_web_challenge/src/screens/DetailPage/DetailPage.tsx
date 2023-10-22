import { Badge, Box, Flex, Grid, Pagination, Title } from '@mantine/core';
import { Direction } from './components/Direction';
import { Sort } from './components/Sort';
import { Type } from './components/Type';
import { useOrgRepoList } from '../../hooks/useOrgRepoList';
import { RepoCard } from '../../components/RepoCard/RespoCard';
import { useWindowScroll } from '@mantine/hooks';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

export const DetailsPage = () => {
  const params = useParams();
  const { filters, setSort, setType, setDirection, repos, changePage, pages } =
    useOrgRepoList(params.org ?? '');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, scrollTo] = useWindowScroll();

  const scrollToTop = useCallback(() => {
    scrollTo({ y: 0 });
  }, [scrollTo]);
  return (
    <Box>
      <Box
        className="blur"
        style={{
          position: 'sticky',
          top: '60px',
          backdropFilter: 'blur(15px)',
          zIndex: 99,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Flex align={'center'} direction={'row-reverse'}>
          <Direction value={filters.direction} setFunction={setDirection} />
          <Sort value={filters.sort} setFunction={setSort} />
          <Type value={filters.type} setFunction={setType} />
        </Flex>
        <Flex
          align={'center'}
          justify={'center'}
          style={{ marginTop: '20px', padding: '20px' }}
        >
          <Pagination
            value={filters.page}
            onChange={(page) => {
              changePage(page);
              scrollToTop();
            }}
            total={(pages ?? 0) + (repos.length && repos.length >= 12 ? 1 : 0)}
          />
        </Flex>
        <Title order={2} ta="center" p={12}>
          Find The Repos Below for <br />
          <Badge variant="filled" size="lg">
            {params.org}
          </Badge>
        </Title>
      </Box>
      <Grid>
        {repos.map((item) => (
          <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
            <RepoCard data={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};
