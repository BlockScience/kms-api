import { Text, createStyles } from "@mantine/core";
import { PropsWithChildren } from "react";

const useStyles = createStyles((theme) => ({
  tag: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[9] : theme.colors.blue[2],
    borderRadius: theme.radius.sm,
    padding: '0px 3px 0px 3px',
  }
}));

interface InlineTagProps {
  linkTo?: string;
}

export default function InlineTag(props: PropsWithChildren<InlineTagProps>) {
  const { classes } = useStyles();
  return (
    <Text span className={classes.tag}>{props.children}</Text>
  );
}