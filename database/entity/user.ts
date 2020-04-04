import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    transformer: {
      from(value: string) {
        return value;
      },

      to(value: string) {
        return value.trim().toLowerCase();
      },
    },
  })
  userName: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  dateCreated: Date;
}
