import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppBar from '../../../node_modules/@mui/material/AppBar'
import Box from '../../../node_modules/@mui/material/Box'
import CssBaseline from '../../../node_modules/@mui/material/CssBaseline'
import Drawer from '../../../node_modules/@mui/material/Drawer'
import IconButton from '../../../node_modules/@mui/material/IconButton'
import MenuIcon from '../../../node_modules/@mui/icons-material/Menu'
import Toolbar from '../../../node_modules/@mui/material/Toolbar'

import * as enums from '../../utils/enums/Contato'

import * as S from './styles'
import { Botao, Campo, MainContainer, Titulo } from '../../styles'

import FiltroCard from '../../components/FiltroCard'

import { RootReducer } from '../../store'
import { alterarTermo } from '../../store/reducers/filtro'

import Contato from '../../components/Contato'

const drawerWidth = 240

interface Props2 {
  window?: () => Window
}

type Props = {
  mostrarFiltros: boolean
}

const DrawerELista = ({ mostrarFiltros }: Props, props: Props2) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { itens } = useSelector((state: RootReducer) => state.contatos)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const filtraContatos = () => {
    let contatosFiltrados = itens
    if (termo !== undefined) {
      contatosFiltrados = contatosFiltrados.filter(
        (item) =>
          item.nomeCompleto.toLowerCase().search(termo.toLowerCase()) >= 0 ||
          item.telefone.search(termo) >= 0
      )

      if (criterio === 'classificacao') {
        contatosFiltrados = contatosFiltrados.filter(
          (item) => item.classificacao === valor
        )
      }

      return contatosFiltrados
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementação =
      termo !== undefined && termo.length > 0 ? `| buscando por: ${termo}` : ''

    if (criterio === 'todos') {
      mensagem = `${quantidade} Contato(s) encontrado(s) ${complementação}`
    } else {
      mensagem = `${quantidade} Contato(s) encontrado(s) a classificação: ${`${valor}`} ${complementação}`
    }

    return mensagem
  }

  const contatos = filtraContatos()
  const mensagem = exibeResultadoFiltragem(contatos.length)

  const drawer = (
    <S.Aside>
      <div>
        {mostrarFiltros ? (
          <>
            <Campo
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(e) => {
                dispatch(
                  alterarTermo(e.target.value.replace(/[^a-zA-Z0-9--- ]/g, ''))
                )
              }}
            />
            <S.Filtros onClick={handleDrawerToggle}>
              <FiltroCard
                valor={enums.Classificacao.AMIGO}
                criterio="classificacao"
                legenda="Amigos"
              />
              <FiltroCard
                valor={enums.Classificacao.FAMILIAR}
                criterio="classificacao"
                legenda="Familiares"
              />
              <FiltroCard
                valor={enums.Classificacao.OUTROS}
                criterio="classificacao"
                legenda="Outros"
              />
              <FiltroCard criterio="todos" legenda="Todos" />
            </S.Filtros>
          </>
        ) : (
          <Botao onClick={() => navigate('/')} type="button">
            Voltar à lista de tarefas
          </Botao>
        )}
      </div>
    </S.Aside>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
        color="transparent"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <MainContainer>
          <Titulo as="p">{mensagem}</Titulo>
          <ul>
            {contatos.map((c) => (
              <li key={c.id}>
                <Contato
                  id={c.id}
                  nomeCompleto={c.nomeCompleto}
                  email={c.email}
                  telefone={c.telefone}
                  classificacao={c.classificacao}
                />
              </li>
            ))}
          </ul>
        </MainContainer>
      </Box>
    </Box>
  )
}

export default DrawerELista
