import { Evento } from './../interfaces/categoria.interface'
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator'

export class AtualizarCategoriaDto {
  @IsString()
  @IsOptional()
  descricao: string

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  eventos: Array<Evento>
}
