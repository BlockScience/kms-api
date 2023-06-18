import { Badge, Text, createStyles } from "@mantine/core";
import { PropsWithChildren } from "react";
import { currentColorScheme, useTheme } from "@/utilities/theme";

const useStyles = createStyles((theme) => ({
  tag: {
    borderRadius: theme.radius.sm,
    padding: '0px 3px 0px 3px',
    border: '1px solid',
    backgroundColor: currentColorScheme() === 'dark' ? useTheme().colors.dark[4] : useTheme().colors.gray[2],
    borderColor: currentColorScheme() === 'dark' ? useTheme().colors.dark[3] : useTheme().colors.gray[3],
    color: currentColorScheme() === 'dark' ? useTheme().colors.gray[3] : useTheme().colors.dark[6],
    cursor: 'pointer'
  }
}));

interface InlineTagProps {
  linkTo?: string;
  color?: string;
}

export default function InlineTag(props: PropsWithChildren<InlineTagProps>) {
  const { classes } = useStyles();
  const { colors } = useTheme();
  const bgCol = currentColorScheme() === 'dark' ? colors.gray[8] : colors.gray[2];
  return (
    <Badge bg={bgCol} tt="inherit" fw={500} size="lg" className={classes.tag}>{props.children}</Badge>
  );
}