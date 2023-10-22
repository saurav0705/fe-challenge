import { Text, Group, Flex, Card } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import classes from './styles.module.css';
import { Endpoints } from '@octokit/types';

type RepoCardPropType = {
  data: Endpoints['GET /orgs/{org}/repos']['response']['data'][0];
};

export function RepoCard({ data }: RepoCardPropType) {
  return (
    <Flex align={'center'} justify={'center'}>
      <Card
        withBorder
        padding="md"
        radius="md"
        style={{ width: '350px', margin: '10px', height: '150px' }}
        onClick={() => window.open(data.clone_url, '_blank')}
      >
        <Group wrap="nowrap" style={{ margin: '10px' }}>
          <IconBrandGithub size={'50px'} radius="md" />
          <div>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {data.full_name}
            </Text>
            <Text fz="lg" fw={500} className={classes.name}>
              {data.name}
            </Text>
          </div>
        </Group>
      </Card>
    </Flex>
  );
}
