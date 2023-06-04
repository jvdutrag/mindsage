import { PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Exclude } from 'class-transformer'

export abstract class BaseModel {
    @PrimaryColumn()
    id: string

    @Exclude()
    @CreateDateColumn()
    created_at: Date

    @Exclude()
    @UpdateDateColumn()
    updated_at: Date

    @Exclude()
    @DeleteDateColumn()
    deleted_at?: Date

    @BeforeInsert()
    beforeInsertActions?() {
        this.id = uuid()
    }
}
