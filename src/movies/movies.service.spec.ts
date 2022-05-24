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

    service.create({   // movie test용 생성
        title:"Test Movie",
        genres: ["Test"],
        year: 2000,
      })
  });

  afterAll(() => {

  })

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
      const movie = service.getOne(1)
      expect(movie).toBeDefined()
      expect(movie.id).toEqual(1)
    })
    
    it("should throw 404 error", () => {
      try{
        service.getOne(999)
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Not Found Movie with ID : 999`) // 보통 안씀!
      }
    })
  })
  describe("deleteOne", () => {
    it("delete a movie", () => {
      const beforeDelete = service.getAll().length
      service.deleteOne(1)
      const afterDelete = service.getAll().length

      expect(afterDelete).toBeLessThan(beforeDelete) // toEqual(beforeDelete - 1)
    })

    it("should throw 404 error", () => {
      try{
        service.deleteOne(999)
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length
      service.create({   // movie test용 생성
        title:"Test Movie",
        genres: ["Test"],
        year: 2000,
      })
      
      const afterCreate = service.getAll().length
      expect(afterCreate).toBeGreaterThan(beforeCreate) // toEqual(beforeDelete - 1)
    })
  })

  describe("update", () => {
    it("should update a movie", () => {
      service.create({   // movie test용 생성
        title:"Test Movie",
        genres: ["Test"],
        year: 2000,
      })
      
      service.update(1, { title: 'updated test'})
      const movie = service.getOne(1)
      expect(movie.title).toEqual('updated test')
    })

    it("should throw a NotFoundException", () => {
      try{
        service.update(999, {})
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })
});
