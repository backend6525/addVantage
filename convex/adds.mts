import {v} from 'convex/values'
import {mutation} from './_generated/server'
import { query } from './_generated/server';

export const createAdd = mutation({
    args:{
        addName:v.string(),
        teamId:v.string(),
        createdBy:v.string(), 
        type:v.optional(v.string()),
        costPerView:v.optional(v.string()),
        nOfDaysRunning:v.optional(v.string())
        
    },
    handler:async(ctx, args)=>{
        const result = await ctx.db.insert('adds',args)
        return result;
    }
}) 

// Retrieving Alladds filtered by Email

export const list = query({
    args:{
        email:v.string()
        
    },
    handler:async(ctx, args)=>{
        const adds = await ctx.db.query('adds')
        .filter((q)=>q.eq(q.field('createdBy'), args.email))
        .collect()

        return adds
    }
})

// Retrieving Alladds 
export const listAll = query({
  handler: async (ctx) => {
    const adds = await ctx.db.query('adds').collect();
    return adds;
  },
});
