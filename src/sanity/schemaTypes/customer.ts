import { defineField, defineType } from "sanity";

export default defineType({
  name: "customer",
  title: "Customer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
    }),
    // Additional fields as necessary
  ],
});
