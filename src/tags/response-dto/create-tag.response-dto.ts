import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateTagResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
