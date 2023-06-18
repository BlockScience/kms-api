import { Text, createStyles } from "@mantine/core";
import { PropsWithChildren } from "react";
import { currentColorScheme, useTheme } from "@/utilities/theme";

const useStyles = createStyles((theme) => ({
  tag: {
    borderRadius: theme.radius.sm,
    padding: '0px 3px 0px 3px',
  }
}));

interface InlineTagProps {
  linkTo?: string;
  color?: string;
}

export default function InlineTag(props: PropsWithChildren<InlineTagProps>) {
  const { classes } = useStyles();
  const bgCol = currentColorScheme() === 'dark' ? useTheme().colors.blue[9] : useTheme().colors.blue[2];
  return (
    <Text span bg={props.color ? props.color : bgCol} color={props.color && "black"} className={classes.tag}>{props.children}</Text>
  );
}