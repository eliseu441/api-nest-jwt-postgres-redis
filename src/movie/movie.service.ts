import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
  ) {}

  createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();
    movie.filme = createMovieDto.filme;
    return this.movieRepository.save(movie);
  }

  findAllMovie(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  viewMovie(id: number): Promise<Movie> {
    return this.movieRepository.findOneBy({ id });
  }

  updateMovie(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();
    movie.filme = updateMovieDto.filme;
    movie.id = id;
    return this.movieRepository.save(movie);
  }
  removeMovie(id: number): Promise<{ affected?: number }> {
    return this.movieRepository.delete(id);
  }
}
