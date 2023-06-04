import { Entity, Column, JoinColumn, OneToOne } from 'typeorm'

import { BaseModel } from './BaseModel'
import { UserData } from './UserData'
import { Language } from './enums'

@Entity({
    name: 'user'
})
export class User extends BaseModel {
    @Column()
    email: string

    @Column({ nullable: true })
    name: string

    @Column()
    provider: string

    @OneToOne(() => UserData, { nullable: true, cascade: true })
    @JoinColumn({ name: 'user_data_id' })
    data: UserData

    @Column({ type: 'enum', enum: Language, default: Language.PORTUGUESE })
    language: Language
}
