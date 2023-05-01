import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Url } from "url";
  import { url } from "inspector";
  
  @Entity()
  export class Media {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column({ type: String, nullable: true })
    video_name : string;
  
    @Column({ type: String, nullable: true })
    video_type : string;
  
    @Column({ type: String, nullable: true })
    host_name : string;
  
    @Column({ type: String, nullable: true })
    contactNo : number;
  
    @CreateDateColumn({ type: "timestamp" })
    createdAt : Date;
  
    @CreateDateColumn({ type: "timestamp" })
    lastModified : Date;
  
    @Column({ default: true })
    isActive : boolean;
  
    @Column({ default: false })
    isDeleted : boolean;
  
    @Column({type:String, nullable: true })
    videoUrl? : string;
  
    // @OneToOne(
    //   () => PartnersLogin,
    //   (partnerLogin) => partnerLogin.partnerBillingDetails,
    //   {
    //     onDelete: "CASCADE",
    //   }
    // )
    // @JoinColumn({ name: "profileId", referencedColumnName: "profileId" })
    // partnerLogin: PartnersLogin;
  }
  
  
  