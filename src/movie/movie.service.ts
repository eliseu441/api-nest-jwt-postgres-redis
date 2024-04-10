import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
  ) {}

  /**
   * this is function is used to create Movie in Movie Entity.
   * @param createMovieDto this will type of createMovieDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of movie
   */
  createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();
    movie.filme = createMovieDto.filme;
    return this.movieRepository.save(movie);
  }

  /**
   * this function is used to get all the movie's list
   * @returns promise of array of movies
   */
  findAllMovie(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of movie.
   * @returns promise of movie
   */
  viewMovie(id: number): Promise<Movie> {
    return this.movieRepository.findOneBy({ id });
  }

  /**
   * this function is used to updated specific movie whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of movie.
   * @param updateMovieDto this is partial type of createMovieDto.
   * @returns promise of udpate movie
   */
  updateMovie(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();
    movie.filme = updateMovieDto.filme;
    movie.id = id;
    return this.movieRepository.save(movie);
  }

  /**
   * this function is used to remove or delete movie from database.
   * @param id is the type of number, which represent id of movie
   * @returns nuber of rows deleted or affected
   */
  removeMovie(id: number): Promise<{ affected?: number }> {
    return this.movieRepository.delete(id);
  }
}