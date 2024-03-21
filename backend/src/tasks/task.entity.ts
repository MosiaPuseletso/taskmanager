import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  dueDate: Date; // nullable to allow tasks without a due date

  @Column()
  priority: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.tasks) // Define the relationship with User
  @JoinColumn({ name: 'userId' }) // Specify the foreign key column name
  user: User;

  // Optional methods for additional functionalities
  // ...
}
