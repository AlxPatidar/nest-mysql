import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, IsInt } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'PostId is required' })
  @IsInt({ message: 'Post id must be integer' })
  postId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(5, { message: 'Title must have 6 chars' })
  @MaxLength(40, { message: 'Title is too long. only 40 chars allow.' })
  title: string;

  @ApiProperty({ required: false })
  body: string;
}
