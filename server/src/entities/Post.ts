import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

import { Field, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ type: 'int', default: 0 })
  points!: number;

  // @Field(() => Int, { nullable: true })
  // voteStatus: number | null; // 1 or -1 or null

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

// import { User } from './User';
// import { Updoot } from './Updoot';

// @ObjectType()
// @Entity()
// export class Post extends BaseEntity {

//   @OneToMany(() => Updoot, (updoot) => updoot.post)
//   updoots: Updoot[];

// }
