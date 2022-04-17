import { compareSync, hashSync } from 'bcrypt';
import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Address } from 'src/addresses/addresses.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index({ unique: true })
  @Column()
  public username: string;

  @Column()
  public password: string;

  @Index({ unique: true })
  @Column()
  public email: string;

  @Column()
  public name: string;

  @Column({ type: 'timestamp' })
  public createdAt: Date;

  @Column({ type: 'timestamp' })
  public updatedAt: Date;

  private tempPassword: string;
  
  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  createTimestamp() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.password = hashSync(this.password, 10);
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
    if (this.password && this.password != '') {
      if (!compareSync(this.password, this.tempPassword)) {
        this.password = hashSync(this.password, 10);
      }
    }
  }

  @OneToMany(() => Address, addresses => addresses.user)
  addresses: Address[]

  constructor(username: string, password: string, email: string, name: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.name = name;
  }
}
