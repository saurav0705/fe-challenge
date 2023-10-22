import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSunFilled, IconMoonStars } from '@tabler/icons-react';

export function ThemeToggleButton() {
  const mantine = useMantineColorScheme();

  return (
    <ActionIcon
      variant="outline"
      color={mantine.colorScheme === 'dark' ? 'yellow' : 'blue'}
      onClick={mantine.toggleColorScheme}
      title="Toggle color scheme"
    >
      {mantine.colorScheme === 'dark' ? (
        <IconSunFilled size={18} />
      ) : (
        <IconMoonStars size={18} />
      )}
    </ActionIcon>
  );
}
