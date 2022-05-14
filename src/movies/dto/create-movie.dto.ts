import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateMovieDTO{
    @IsString()
    readonly title: string
    
    @IsNumber()
    readonly year: number

    @IsOptional()
    @IsString({each: true})  // each : 하나씩 검사
    readonly genres: string[]
}