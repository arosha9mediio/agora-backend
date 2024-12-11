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
    // 
    const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format

  return this.bookingRepository.find({
    where: {
      doctorId,
      bookingDate: formattedToday, // Compare directly with the formatted date
    },
      select: ['patientId', 'channelName', 'bookingTime', 'bookingDate', 'paymentStatus'], // Select only required fields
    });}
}