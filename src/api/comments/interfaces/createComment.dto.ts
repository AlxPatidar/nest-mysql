import { IsNotEmpty, MinLength, MaxLength, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'comment is required' })
  @MinLength(5, { message: 'comment must have 6 chars' })
  @MaxLength(90, { message: 'comment is too long. only 90 chars allow.' })
  comment: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'PostId is required' })
  @IsInt({ message: 'PostId must be integer' })
  postId: number;
}
