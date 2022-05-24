import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스팅 환경에서도 필요
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 어떤 decorator도 없는 property의 object는 거름
        forbidNonWhitelisted: true,// 이상한걸 보내면 request를 막음
        transform: true, // 원하는 타입으로 변환
      })
    )
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {

    it('GET', () => {
      return request(app.getHttpServer()) // 서버
        .get('/movies')
        .expect(200)
        .expect([]); // 지금은 빈 DB 사용
    });

    it('POST 201', () => {
      return request(app.getHttpServer()) // 서버
        .post('/movies')
        .send({
          title:'Test',
          year:2000,
          genres: ['test']
        })
        .expect(201)
    });

    it('POST 400', () => {
      return request(app.getHttpServer()) // 서버
        .post('/movies')
        .send({
          title:'Test',
          year:2000,
          genres: ['test'],
          other:"thing"
        })
        .expect(400)
    });

    // 없기 때문에 404
    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404)
    })
  })

  describe('/movies/id', () => {
    it.todo('GET') // 만들어야할 때
    
    it('GET 200', () => {
      return request(app.getHttpServer())
      .get('/movies/1') // id는 number type, but string(transform 필요)
      .expect(200)
    })
    it('GET 400', () => {
      return request(app.getHttpServer())
      .get('/movies/999') // id는 number type, but string(transform 필요)
      .expect(404)
    })
    it('PATCH', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({title:'updated test'})
      .expect(200)
    })
    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200)
    })
  })
});
