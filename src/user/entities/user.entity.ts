import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,  } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    f_name: string;

    @Column({ length: 100 })
    l_name: string;

    @Column({ length: 11, default: null, unique: true })
    phone: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 100 })
    image: string;

    @Column()
    is_phone_verified: boolean;

    @Column()
    email_verified_at: boolean;

    @Column({ length: 200 })
    password: string;

    @Column({ length: 500 })
    cm_firebase_token: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
