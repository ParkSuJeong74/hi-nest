import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { NotFoundError } from 'rxjs';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll()
      expect(result).toBeInstanceOf(Array) // array 인스턴스인지 테스트
    })
  })
  
  describe("getOne", () => {
    it("should return a movie", () => {
      service.create({   // movie test용 생성
        title:"Test Movie",
        genres: ["Test"],
        year: 2000,
      })

      const movie = service.getOne(1)
      expect(movie).toBeDefined()
      expect(movie.id).toEqual(1)
    })
    
    it("shoule throw 404 error", () => {
      try{
        service.getOne(999)
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Not Found Movie with ID : 999`)
      }
    })
  })

});
