import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';

export class UpdateValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public description: string;

  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @ApiProperty({ required: true, type: 'number' })
  public amount: number;

  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @ApiProperty({ required: true, type: 'number' })
  public value: number;
}
