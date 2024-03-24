import { PaginationDto } from '../dto/pagination.dto';

export const getPagination = ({
  page,
  limit,
}: PaginationDto): {
  skip: number;
  take: number;
} => {
  return {
    skip: limit * (page - 1),
    take: limit,
  };
};
