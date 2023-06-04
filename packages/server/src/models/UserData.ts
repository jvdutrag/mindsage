import { Entity, Column } from 'typeorm'

import { BaseModel } from './BaseModel'

import { UserGender } from './enums'

@Entity({
    name: 'user-data'
})
export class UserData extends BaseModel {
    @Column({ type: 'enum', enum: UserGender, nullable: true })
    gender?: UserGender

    @Column({ type: 'date', nullable: true })
    date_of_birth: string
}
