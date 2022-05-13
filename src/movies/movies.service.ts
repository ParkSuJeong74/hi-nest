import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = []

    getAll(): Movie[] {
        return this.movies
    }

    getOne(id:string): Movie{
        const movie=this.movies.find(movie => movie.id === +id) // +id == parseInt(id)
        if(!movie){
            throw new NotFoundException(`Not Found Movie with ID : ${id}`) // 예외처리, httpExceptino에서 확장된 nest 기능
        }
        return movie
    }

    deleteOne(id:string) {
        this.getOne(id)
        this.movies=this.movies.filter(movie => movie.id !== +id)
    }

    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id:string, updateData){
        const movie = this.getOne(id)
        this.deleteOne(id)
        this.movies.push({...movie, ...updateData}) // 가짜 DB를 쓰기 때문에 사용하는 로직
    }
}
