import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Blog Post',
  })
  title: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of my first blog post.',
    nullable: true,
  })
  content: string | null;

  @ApiProperty({
    description: 'The ID of the user who created the post',
    example: '01H5K4Z2Y3N5Q7R9T1W3E5R7',
  })
  userId: string;
}
