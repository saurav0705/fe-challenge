import { Group, Button, Text, Box, Flex, Code } from '@mantine/core';
import { IconBrandGithubFilled, IconSearch } from '@tabler/icons-react';
import classes from './styles.module.css';
import { ThemeToggleButton } from '../ThemeToggleButton/ThemeToggleButton';
import { spotlight } from '@mantine/spotlight';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  return (
    <Box
      className="blur"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        backdropFilter: 'blur(15px)',
      }}
    >
      <header className={classes.header}>
        <Group justify="space-between" h="100%" style={{ cursor: 'pointer' }}>
          <Flex align={'center'} onClick={() => navigate('/')}>
            <IconBrandGithubFilled size={30} />
            <Text size="md" fw={'900'}>
              Github Looker
            </Text>
          </Flex>

          <Group>
            <ThemeToggleButton />
            <Button onClick={spotlight.open}>
              <IconSearch size={'18'} />
              <Group visibleFrom="sm">
                <Code color="blue.9" c="white">
                  ⌘ + K
                </Code>
              </Group>
            </Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
