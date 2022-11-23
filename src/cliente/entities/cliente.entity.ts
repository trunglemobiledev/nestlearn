import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 11 })
    cpf: string;

    @Column({ length: 11 })
    fone: string;

    @Column({ length: 11 })
    celular: string;

    @Column()
    status: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
