import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Skill } from './skill-entity';
import { ExchangeSkill } from './exchange-skill-entity';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  campusId: string;

  @OneToMany(() => Skill, (skill) => skill.creator)
  posts: Skill[];

  @OneToMany(() => ExchangeSkill, (req) => req.proposer)
  sentRequests: ExchangeSkill[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
