import { Alert, Box, Skeleton, Stack } from "@mui/material";

import { fetchSubCategories } from "@/actions/products-actions";

import SubCategoriesFilter from "@/sections/products/subCategories-filter";

interface Props {
  searchParams: {
    categoryId: string | undefined;
    subCategoryId: string | undefined;
  };
}

export default async function Page({
  searchParams: { categoryId, subCategoryId },
}: Props) {
  if (!categoryId) {
    return (
      <Box>
        <Stack direction="row" spacing={2}>
          {[...Array(5)].map((_, index) => (
            <Skeleton
              variant="text"
              sx={{
                fontSize: "36px",
                display: "block",
                width: "7rem",
              }}
            />
          ))}
        </Stack>
      </Box>
    );
  }

  const subCategories = await fetchSubCategories(categoryId);
  if ("error" in subCategories) {
    throw new Error(subCategories.error);
  }

  if (subCategories.length === 0) {
    return <Alert severity="error">No subCategories found</Alert>;
  }

  return (
    <SubCategoriesFilter
      subCategories={subCategories}
      initialSubCategoryId={subCategoryId}
    />
  );
}
