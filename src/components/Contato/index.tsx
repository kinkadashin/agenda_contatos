import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remover, editar } from '../../store/reducers/contatos'
import ContatoClass from '../../models/Contato'
import { Botao, BotaoSalvar } from '../../styles'

type Props = ContatoClass

const Contato = ({
  telefone: telefoneOriginal,
  nomeCompleto,
  email: emailOriginal,
  classificacao,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (telefoneOriginal.length > 0) {
      setTelefone(telefoneOriginal)
    }
  }, [telefoneOriginal])

  useEffect(() => {
    if (emailOriginal.length > 0) {
      setEmail(emailOriginal)
    }
  }, [emailOriginal])

  const cancelarEdicao = () => {
    setEstaEditando(false)
    setTelefone(telefoneOriginal)
    setEmail(emailOriginal)
  }

  const testaEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  const confirmaEdicao = () => {
    const ddd = telefone.match(/^\((\d{2})\)/)
    const dddsValidos = [
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '21',
      '22',
      '24',
      '27',
      '28',
      '31',
      '32',
      '33',
      '34',
      '35',
      '37',
      '38',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
      '48',
      '49',
      '51',
      '53',
      '54',
      '55',
      '61',
      '62',
      '63',
      '64',
      '65',
      '66',
      '67',
      '68',
      '69',
      '71',
      '73',
      '74',
      '75',
      '77',
      '79',
      '81',
      '82',
      '83',
      '84',
      '85',
      '86',
      '87',
      '88',
      '89',
      '91',
      '92',
      '93',
      '94',
      '95',
      '96',
      '97',
      '98',
      '99'
    ]

    if (!email || telefone.length === 4) {
      alert(
        'Todos os campos devem ser preenchidos antes de confirmar a edição.'
      )
      return
    }

    if (!telefone.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
      alert(
        `Telefone incompleto ou inválido: ${telefone}. Por favor, insira o número no formato correto (XX) XXXXX-XXXX.`
      )
      return
    }

    if (ddd && !dddsValidos.includes(ddd[1])) {
      alert(
        `DDD inválido: ${ddd[1]}. Por favor, insira um código de área válido.`
      )
      return
    }

    if (!testaEmail()) {
      alert(
        `E-mail incompleto ou inválido: ${email}. Por favor, insira um endereço de e-mail válido (exemplo: nome@dominio.com).`
      )
      return
    }

    dispatch(
      editar({
        nomeCompleto,
        email,
        telefone,
        classificacao,
        id
      })
    )
    setEstaEditando(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 11) {
      setTelefone(value)
    }
    const maskedValue = value
      .replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3')
      .trim()
    setTelefone(maskedValue)
  }

  return (
    <S.Card>
      <S.Titulo>
        {estaEditando && <em>Editando: </em>}
        {nomeCompleto}
      </S.Titulo>
      <S.Tag parametro="classificacao" classificacao={classificacao}>
        {classificacao}
      </S.Tag>
      <S.Informacoes
        value={telefone}
        type="text"
        onChange={handleInputChange}
        disabled={!estaEditando}
        {...(estaEditando
          ? { style: { border: '2px solid black', borderRadius: '8px' } }
          : '')}
        inputMode="numeric"
        pattern="[0-9]*"
        minLength={10}
        required
      />
      <S.Informacoes
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={!estaEditando}
        {...(estaEditando
          ? { style: { border: '2px solid black', borderRadius: '8px' } }
          : '')}
        required
      />

      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar onClick={confirmaEdicao}>Salvar</BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Contato
