import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Skill } from './skill-entity';
import { User } from './user-entity';

export enum ExchangeStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity()
export class ExchangeSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Skill, (post) => post.request)
  post: Skill;

  @ManyToOne(() => User, (user) => user.sentRequests)
  proposer: User;

  @Column()
  skillOffered: string;

  @Column({
    type: 'enum',
    enum: ExchangeStatus,
    default: ExchangeStatus.PENDING,
  })
  status: ExchangeStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
