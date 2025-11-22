import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tweets: defineTable({
    userId: v.string(),
    text: v.string(),
    likes: v.number(),
    // if u retweeting, this field is the og tweet's link
    retweet: v.optional(v.string()),
  })
    .index("by_userid", ["userId"]),
})