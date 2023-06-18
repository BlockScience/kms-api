import { Badge, createStyles, DefaultMantineColor } from "@mantine/core";
import { PropsWithChildren } from "react";

const useStyles = createStyles((theme) => ({
  badge: {
    borderRadius: theme.radius.sm,
    padding: '0px 3px 0px 3px',
    height: '1.6em',
    border: '1px solid',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3],
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    cursor: 'pointer',
  },
  badgeColored: {
    borderRadius: theme.radius.sm,
    padding: '0px 3px 0px 3px',
    marginTop: '0.3em',
    height: '1.6em',
    // borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3],
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    cursor: 'pointer',
  }
}));

interface InlineTagProps {
  color?: DefaultMantineColor
}

export default function InlineTag(props: PropsWithChildren<InlineTagProps>) {
  const style = useStyles();
  const { background, color } = style.theme.fn.variant({ variant: 'dark', color: props.color });
  const backgroundDimmed = style.theme.fn.rgba((background || ''), 0.3);
  const borderLightened = style.theme.fn.lighten(backgroundDimmed, 0.2);
  return <Badge tt="inherit" fw={500} size="lg" bg={props.color ? backgroundDimmed : ''} style={props.color ? { borderColor: borderLightened, borderWidth: 1 } : {}} color={props.color ? color : ''} className={props.color ? style.classes.badgeColored : style.classes.badge}>{props.children}</Badge>;
}