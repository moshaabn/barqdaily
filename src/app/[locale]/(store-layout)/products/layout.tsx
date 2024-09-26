import { ReactNode } from "react";

import { Stack, Container } from "@mui/material";

export default async function Layout({
  children,
  categories,
  subcategories,
  productsList,
  modal,
}: {
  children: ReactNode;
  categories: ReactNode;
  subcategories: ReactNode;
  productsList: ReactNode;
  modal: ReactNode;
}) {
  return (
    <Stack spacing={2} minHeight="100%" py={3} component={Container}>
      {categories}
      {subcategories}
      {productsList}
      {modal}
      {children}
    </Stack>
  );
}