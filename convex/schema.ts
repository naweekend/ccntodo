import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tweets: defineTable({
    text: v.string(),
    // if u retweeting, this field is the og tweet's link
    retweet: v.optional(v.string()),
    userId: v.string(),
    userName: v.string(),
    userFullName: v.string(),
    userPicture: v.string(),
  })
    .index("by_userid", ["userId"]),
  likes: defineTable({
    tweetId: v.id("tweets"),
    userId: v.string(),
  })
    .index("by_tweetId", ["tweetId"])
})