import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './bookingDto';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get()
  async getBookings(): Promise<Booking[]> {
    return this.bookingService.getBookings();
  }
  @Get('doctor/:doctorId/today')
  async getTodaysBookings(@Param('doctorId') doctorId: string) {
    return this.bookingService.getTodaysBookings(doctorId);
  }
}
