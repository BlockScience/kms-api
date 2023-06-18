import { Title, Space } from "@mantine/core";
import { PropsWithChildren } from "react";

interface PageTitleProps {
  /* Whether to add space after the title */
  noSpace?: boolean;
}

export function PageTitle(props: PropsWithChildren<PageTitleProps>) {
  return (
    <div>
      <Title mt={30} order={2}>{props.children}</Title>
      {!props.noSpace && <Space h='sm' />}
    </div>
  );
}