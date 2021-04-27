import { DesafioStatus } from './../interfaces/desafio.status.enum'
import { BadRequestException, PipeTransform } from '@nestjs/common'

export class DesafioStatusValidaPipe implements PipeTransform {
  readonly statusPermitidos = [
    DesafioStatus.ACEITO,
    DesafioStatus.NEGADO,
    DesafioStatus.CANCELADO
  ]
  transform(value: any) {
    const status = value.status.toUpperCase()
    if (!this.EhStatusValido(status)) {
      throw new BadRequestException(`${status} não é um status valido`)
    }
    return value
  }

  private EhStatusValido(status: DesafioStatus) {
    const idx = this.statusPermitidos.indexOf(status)
    return idx !== -1
  }
}
