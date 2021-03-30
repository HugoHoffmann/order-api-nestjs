import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';

export class SaveValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  @ApiProperty({ required: true, type: 'number' })
  public amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  @ApiProperty({ required: true, type: 'number' })
  public value: number;
}
