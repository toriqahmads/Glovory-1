import { User } from 'src/users/user.entity';
import {
    Entity,
    Column,
    BeforeInsert,
    BeforeUpdate,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class Address {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('uuid')
    public user_id: string;

    @Column()
    public address: string;

    @Column()
    public city: string;

    @Column({ type: 'timestamp' })
    public createdAt: Date;

    @Column({ type: 'timestamp' })
    public updatedAt: Date;

    @ManyToOne(() => User, user => user.addresses)
    @JoinColumn({ name: 'user_id' })
    public user: User;
    
    @BeforeInsert()
    createTimestamp() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }

    constructor(user_id: string, address: string, city: string) {
        this.user_id = user_id;
        this.address = address;
        this.city = city;
    }
}