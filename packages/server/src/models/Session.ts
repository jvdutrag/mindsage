import { Entity, BeforeInsert, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { User } from './User'

@Entity({
    name: 'session'
})
export class Session {
    @PrimaryColumn()
    id: string

    @ManyToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column({ type: 'timestamptz' })
    started_at: Date

    @Column({ type: 'timestamptz', nullable: true })
    ended_at: Date

    @BeforeInsert()
    beforeInsertActions?() {
        this.id = uuid()
        this.started_at = new Date()
    }
}
