import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class Client {
@PrimaryGeneratedColumn('uuid')
id : string;

@ApiProperty({
    description: "Numero de dni",
    example: "22555999"
})
@Column()
dni : number;

@ApiProperty({
    description: "Nombre del cliente",
    example: "Juan"
})
@Column()
name: string;

@ApiProperty({
    description: "Apellido del cliente",
    example: "Perez"
})
@Column()
lastName: string;

@ApiProperty({
    description: "Telefono del cliente solo numeros, sin guiones, paremtesis o comas",
    example: "3857408499"
})
@Column()
phone: number;

@ApiProperty({
    description: "mail del cliente, opcional",
    example: "perez@mail.com"
})
@Column({unique: true})
email: string;


//totalDebtCache
//createdAt

}
