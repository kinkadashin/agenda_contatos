import { useState, FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  MainContainer,
  Titulo,
  Campo,
  BotaoSalvar,
  Botao
} from '../../styles/index'
import { Form, Opcoes, Opcao } from './styles'

import * as enums from '../../utils/enums/Contato'
import { cadastrar } from '../../store/reducers/contatos'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [nomeCompleto, setNomeCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [classificacao, setClassificacao] = useState(enums.Classificacao.OUTROS)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    const maskedValue = value
      .replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3')
      .trim()
    setTelefone(maskedValue)
  }

  const testaEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  const cadastrarContato = (evento: FormEvent) => {
    evento.preventDefault()

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

    if (!email || !nomeCompleto || telefone.length === 4) {
      alert(
        'Todos os campos devem ser preenchidos antes de confirmar a edição.'
      )
      return
    }

    if (
      !nomeCompleto
        .trim()
        .split(' ')
        .every((part) => /^[a-zA-ZÀ-ÿ\s-]+$/i.test(part)) ||
      nomeCompleto.trim().split(' ').length < 2
    ) {
      alert(
        'Nome incompleto ou inválido. Por favor, insira um nome completo (nome e sobrenome) usando apenas letras e espaços.'
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
      cadastrar({
        nomeCompleto,
        email,
        telefone,
        classificacao
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Titulo style={{ textAlign: 'center' }}>Novo contato</Titulo>
      <Form onSubmit={cadastrarContato} onReset={() => navigate('/')}>
        <Campo
          type="text"
          value={nomeCompleto}
          onChange={(evento) => setNomeCompleto(evento.target.value)}
          placeholder="Nome completo do contato"
          required
        />
        <Campo
          type="text"
          placeholder="Telefone do contato"
          value={telefone}
          onChange={handleInputChange}
          required
          inputMode="numeric"
        />
        <Campo
          type="email"
          placeholder="E-mail do contato"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        />
        <Opcoes>
          <p>Classificação</p>
          {Object.values(enums.Classificacao).map((classificacao) => (
            <>
              <Opcao key={classificacao}>
                <input
                  value={classificacao}
                  type="radio"
                  name="classificacao"
                  id={classificacao}
                  defaultChecked={classificacao === enums.Classificacao.OUTROS}
                  onChange={({ target }) =>
                    setClassificacao(target.value as enums.Classificacao)
                  }
                  required
                />{' '}
                <label htmlFor={classificacao}>{classificacao}</label>
              </Opcao>
            </>
          ))}
        </Opcoes>
        <BotaoSalvar type="submit">Adicionar</BotaoSalvar>
        <Botao type="reset">Voltar</Botao>
      </Form>
    </MainContainer>
  )
}

export default Formulario
