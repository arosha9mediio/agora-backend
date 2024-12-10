import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: string;

  @Column()
  patientId: string;

  @Column()
  channelName: string;

  @Column()
  bookingTime: string;

  @Column()
  bookingDate: string;

  @Column({ default: 'pending' })
  paymentStatus: string;

  @CreateDateColumn()
  createdAt: Date;
}
