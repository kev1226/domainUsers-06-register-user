import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for user registration.
 * Applies validations and transformations for name, email and password.
 */
export class RegisterDto {
  @ApiProperty({ example: 'Jane Doe' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePass123' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
