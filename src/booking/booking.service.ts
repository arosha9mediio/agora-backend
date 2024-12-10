import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './bookingDto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const channelName = `${createBookingDto.patientId}_${createBookingDto.doctorId}`;
    const booking = this.bookingRepository.create({
      ...createBookingDto,
      channelName,
    });

 
    return await this.bookingRepository.save(booking);
  }

  async getBookings(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }
}