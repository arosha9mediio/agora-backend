import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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
  async getTodaysBookings(doctorId: string): Promise<Booking[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Start of the next day

    return this.bookingRepository.find({
      where: {
        doctorId,
        bookingDate: Between(
          today.toISOString().split('T')[0],
          tomorrow.toISOString().split('T')[0],
        ),
      },
      select: ['patientId', 'channelName', 'bookingTime'], // Select only required fields
    });}
}