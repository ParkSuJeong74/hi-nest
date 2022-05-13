import { Controller, Delete, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesServices: MoviesService){}
    @Get()
    getAll(): Movie[]{
        return this.moviesServices.getAll()
    }

    @Get('search')  // id보다 위에 있어야함
    search(@Query('year') searchingYear: string){   // search?year=2000
        return `searching ${searchingYear}`
    }

    @Get(':id')
    getOne(@Param("id") movieId:string): Movie{
        return this.moviesServices.getOne(movieId)
    }

    @Post()
    create(@Body() movieData){
        return this.moviesServices.create(movieData)
    }

    @Delete(':id')
    remove(@Param("id") movieId:string){
        return this.moviesServices.deleteOne(movieId)
    }

    @Patch(':id')
    patch(@Param('id') movieId: string, @Body() updateData){
        return this.moviesServices.update(movieId, updateData)
    }
}
