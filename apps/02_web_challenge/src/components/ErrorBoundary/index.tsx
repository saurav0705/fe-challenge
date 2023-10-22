import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from '@mantine/core';
import image from './image.svg';
import classes from './styles.module.css';
import { Component } from 'react';

export function NotFoundPage() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div style={{ textAlign: 'center' }}>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button size="md" mt="xl" className={classes.control}>
            Get back to home page
          </Button>
        </div>
      </SimpleGrid>
    </Container>
  );
}

type ErrorBoundaryState = {
  hasError: boolean;
};
type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <NotFoundPage />;
    }

    return this.props.children;
  }
}
