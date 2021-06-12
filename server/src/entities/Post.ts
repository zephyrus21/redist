import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: 'text' })
  title!: string;
}

// import { ObjectType, Field, Int } from 'type-graphql';
// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
//   BaseEntity,
//   ManyToOne,
//   OneToMany,
// } from 'typeorm';
// import { User } from './User';
// import { Updoot } from './Updoot';

// @ObjectType()
// @Entity()
// export class Post extends BaseEntity {
//   @Field()
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Field()
//   @Column()
//   title!: string;

//   @Field()
//   @Column()
//   text!: string;

//   @Field()
//   @Column({ type: 'int', default: 0 })
//   points!: number;

//   @Field(() => Int, { nullable: true })
//   voteStatus: number | null; // 1 or -1 or null

//   @Field()
//   @Column()
//   creatorId: number;

//   @Field()
//   @ManyToOne(() => User, (user) => user.posts)
//   creator: User;

//   @OneToMany(() => Updoot, (updoot) => updoot.post)
//   updoots: Updoot[];

//   @Field(() => String)
//   @CreateDateColumn()
//   createdAt: Date;

//   @Field(() => String)
//   @UpdateDateColumn()
//   updatedAt: Date;
// }