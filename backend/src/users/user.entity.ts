import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Task } from "src/tasks/task.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => Task, (task) => task.user) // Define the relationship with Task
  tasks: Task[]; // Array of tasks associated with the user

  // Optional methods for additional functionalities
  // ...
}
