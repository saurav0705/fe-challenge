import { Card, Avatar, Text, Group, Button, Box, Flex } from '@mantine/core';
import classes from './styles.module.css';
import { OrgResponseType } from '../../store/search.store';
import { IconCircleMinus } from '@tabler/icons-react';

type StatsType = {
  key: 'followers' | 'following';
  label: string;
};

const stats: StatsType[] = [
  { key: 'followers', label: 'Followers' },
  { key: 'following', label: 'Follows' },
];

export function PreviousSearchCard({
  data,
  navigate,
  onDelete,
}: {
  data: OrgResponseType;
  navigate: (target: string) => void;
  onDelete: (id: number) => void;
}) {
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {data[stat.key]}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card
      withBorder
      padding="xl"
      radius="md"
      className={classes.card}
      h={'100%'}
    >
      <Flex justify={'flex-end'}>
        <IconCircleMinus
          color="red"
          onClick={() => onDelete(data.id)}
          cursor={'pointer'}
        />
      </Flex>
      <Card.Section h={100} />
      <Avatar
        src={data.avatar_url}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {data.name ?? data.login}
      </Text>
      <Box style={{ marginTop: 'auto' }}>
        <Text ta="center" fz="sm" c="dimmed">
          {data.description}
        </Text>
        <Group mt="md" justify="center" gap={30}>
          {items}
        </Group>
        <Button
          fullWidth
          radius="md"
          mt="xl"
          size="md"
          onClick={() => navigate(`/details/${data.login}`)}
        >
          Go To Details Page
        </Button>
      </Box>
    </Card>
  );
}
