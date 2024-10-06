import { Alert } from "@mui/material";

import { fetchOffers } from "@/actions/products-actions";

import ProductsListView from "@/sections/products/view/products-list-view";

interface Props {
  searchParams: Record<"page", string | undefined>;
}
export default async function Page({ searchParams: { page } }: Props) {
  const offers = await fetchOffers(page ? +page : 1);

  if ("error" in offers) {
    return <Alert severity="error">{offers.error}</Alert>;
  }

  if (offers.pagesCount === 0) {
    return <Alert severity="warning">No products found</Alert>;
  }

  return (
    <ProductsListView products={offers.items} pagesCount={offers.pagesCount} />
  );
}