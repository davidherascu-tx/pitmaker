import { defineConfig } from "sanity";

import { structureTool } from "sanity/structure";

import { productSchema } from "./sanity/schemaTypes/product";



export default defineConfig({

  basePath: "/admin", // Where the CMS will live

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,

  dataset: "production",

  title: "Pitmaker Admin",

  plugins: [structureTool()],

  schema: {

    types: [productSchema],

  },

});