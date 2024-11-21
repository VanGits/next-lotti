import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
  validation: (Rule) => 
    Rule.custom(async (_, context) => {
      const client = context.getClient({apiVersion: '2023-05-03'})
      const count = await client.fetch('count(*[_type == "product"])')
      return count > 7 
        ? 'Only 7 products are allowed. Please delete an existing product before adding a new one.'
        : true
    })
});
