import { Post } from '../entities/Post';
import { MyContext } from '../types';
import { Ctx, Query, Resolver } from 'type-graphql';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    return ctx.em.find(Post, {});
  }
}
