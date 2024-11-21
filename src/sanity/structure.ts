import type { StructureResolver } from "sanity/structure";

// Define excluded document types to avoid duplication
const excludedDocTypes = [
  "post",
  "category",
  "author",
  "product",
  "show",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Blog Section
      S.listItem()
        .id("blog")
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ])
        ),

      // Products Section (directly accessible)
      S.documentTypeListItem("product").title("Products"),

      // Shows Section
      S.documentTypeListItem("show").title("Shows"),

      // Divider between main sections and other items
      S.divider(),

      // Include other document types that are not part of the main sections
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !excludedDocTypes.includes(item.getId()!)
      ),
    ]);