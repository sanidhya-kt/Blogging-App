const { Schema, model, SchemaType } = require("mongoose");

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    coverImageURL: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Blog = model("Bblog", blogSchema);
module.exports = Blog;
