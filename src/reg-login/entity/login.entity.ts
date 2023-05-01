import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity()
export class SignUp {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  username: string;

  
  @Column({type:String, nullable: true})
  password:string;
    
  @Column({ nullable: true })
  name: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  lastModified: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: false })
  isBlocked: boolean;

  
}
