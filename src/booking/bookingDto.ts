import { IsNotEmpty, IsString, IsEnum, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  // @IsString()
  // @IsNotEmpty()
  // channelName: string;

  @IsDateString()
  @IsNotEmpty()
  bookingDate: string;

  @IsString()
  @IsNotEmpty()
  bookingTime: string;

  @IsEnum(['done', 'pending'])
  paymentStatus: string;
}
