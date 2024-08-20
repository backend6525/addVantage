import {v} from "convex/values"
import {query, mutation} from "./_generated/server"


export const getTeam = query({
  args: {
    email: v.optional(v.string()),
    teamName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query('teams');
    if (args.email) {
      query = query.filter(q => q.eq(q.field('createdBy'), args.email));
    }
    if (args.teamName) {
      query = query.filter(q => q.eq(q.field('teamName'), args.teamName));
    }
    const result = await query.collect();
    return result;
  },
});


 export const createTeam = mutation({
        args:{teamName:v.string(), 
        createdBy:v.string(),
    
    },
        handler:async(ctx, args) =>{
            const existingTeam = await ctx.db.query('teams')
            .filter((q) => q.eq(q.field('teamName'), args.teamName))
            .first();
            if(existingTeam){
                throw new Error(`Team with name ${args.teamName}, already exists.`)
            }
            const result = await ctx.db.insert('teams',args)
            return result;
        }
 })

 export const deleteTeam = mutation({
    args: {
      id: v.id("_team"),
    },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
  });