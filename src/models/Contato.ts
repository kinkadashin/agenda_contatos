import * as enums from '../utils/enums/Contato'

class Contato {
  nomeCompleto: string
  telefone: string
  email: string
  classificacao: enums.Classificacao
  id: number

  constructor(
    nomeCompleto: string,
    email: string,
    telefone: string,
    classificacao: enums.Classificacao,
    id: number
  ) {
    // eslint-disable-next-line prettier/prettier
    (this.nomeCompleto = nomeCompleto),
      (this.telefone = telefone),
      (this.email = email),
      (this.classificacao = classificacao),
      (this.id = id)
  }
}

export default Contato
