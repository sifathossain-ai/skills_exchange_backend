import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user-entity';
import { ExchangeSkill } from './exchange-skill-entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  teachingSkill: string;

  @Column()
  skillImage: string;

  @Column('simple-array')
  wantedSkills: string[];

  @Column({ type: 'text' })
  description: string;

  @Column()
  category: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  creator: User[];

  @OneToMany(() => ExchangeSkill, (req) => req.post)
  request: ExchangeSkill[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
