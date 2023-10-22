import {
  Badge,
  Group,
  Title,
  Card,
  SimpleGrid,
  Container,
} from '@mantine/core';
import classes from './styles.module.css';
import { PreviousSearchCard } from '../../components/PreviousSearchCard/PreviousSearchCard';
import { useSearchStore } from '../../store/search.store';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const { previous, deletePrevious } = useSearchStore((state) => state);
  const navigate = useNavigate();
  const features = previous.map((item) => (
    <Card
      key={item.name}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <PreviousSearchCard
        data={item}
        navigate={(target) => navigate(target)}
        onDelete={deletePrevious}
      />
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Previous Searches
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Find Your Previous Searches Below
      </Title>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
