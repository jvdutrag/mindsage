import { Entity, Column, PrimaryColumn, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { cookieExpirationInDays } from '../configs'

import { User } from './User'

@Entity({
    name: 'user-token'
})
export class UserToken {
    @PrimaryColumn()
    id: string

    @Column()
    value: string

    @ManyToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column()
    user_agent: string

    @Column()
    user_ip_address: string

    @Column({ type: 'timestamp' })
    expires_at: Date

    @BeforeInsert()
    beforeInsertActions?() {
        const expirationDate = new Date(new Date().setDate(new Date().getDate() + cookieExpirationInDays)).setHours(new Date().getHours() + 3)

        this.expires_at = new Date(expirationDate)
        this.id = uuid()
    }
}
