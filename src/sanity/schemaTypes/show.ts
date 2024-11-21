import { defineField, defineType } from "sanity";

export default defineType({
  name: "show",
  title: "Show",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "location",
      type: "string",
    }),
    defineField({
      name: "showDate",
      type: "datetime",
    }),
  ],
  validation: (Rule) => 
    Rule.custom(async (_, context) => {
      const client = context.getClient({apiVersion: '2023-05-03'})
      const count = await client.fetch('count(*[_type == "show"])')
      return count > 3 
        ? 'Only 3 shows are allowed. Please delete an existing show before adding a new one.'
        : true
    })
});
