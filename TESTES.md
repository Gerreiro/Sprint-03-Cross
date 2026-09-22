# Documento de Testes Manuais — GrassWatch Sprint 3

**Projeto:** GrassWatch — Monitoramento de Vegetação em Rodovias  
**Sprint:** 3 — Protótipo Funcional Completo  
**Data:** Junho/2025  
**Testado em:** Expo Go (dispositivo físico Android / iOS)

---

## Fluxo 1 — Visualizar lista de ocorrências

**Cenário:** Usuário abre o app e visualiza a lista de ocorrências cadastradas.

| Campo | Resultado |
|---|---|
| **Pré-condição** | App iniciado com dados mockados carregados |
| **Passos** | 1. Abrir o app |
| | 2. Observar a tela inicial |
| **Resultado esperado** | Lista exibe 6 ocorrências, contadores no topo (2 alto, 2 médio, 2 baixo), banner com 2 alertas IoT |
| **Resultado obtido** | Lista exibiu todas as 6 ocorrências corretamente. Contadores corretos. Banner de alerta IoT exibindo BR-101 km 312 e BR-381 km 445 |
| **Status** | ✅ PASSOU |

---

## Fluxo 2 — Filtrar ocorrências por nível de risco

**Cenário:** Operador quer ver apenas ocorrências de risco alto.

| Campo | Resultado |
|---|---|
| **Pré-condição** | App na tela de lista com 6 ocorrências |
| **Passos** | 1. Tocar no filtro "Alto" |
| | 2. Observar a lista atualizada |
| | 3. Tocar no filtro "Todas" |
| **Resultado esperado** | Filtro "Alto" exibe 2 ocorrências. Filtro "Todas" volta a exibir 6 |
| **Resultado obtido** | Filtro funcionou corretamente. "Alto" exibiu 2 registros. "Todas" retornou 6. Filtro "Pendentes" exibiu 2 registros corretamente |
| **Status** | ✅ PASSOU |

---

## Fluxo 3 — Criar nova ocorrência (fluxo feliz)

**Cenário:** Operador de campo registra nova ocorrência com todos os dados.

| Campo | Resultado |
|---|---|
| **Pré-condição** | App na tela de lista |
| **Passos** | 1. Tocar no botão "+" (FAB) |
| | 2. Preencher: Trecho "SP-330 km 74", Local "Acostamento direito", Operador "Carlos", Distância "12", Risco "Médio", Descrição "Vegetação moderada" |
| | 3. Tocar em "Registrar ocorrência" |
| **Resultado esperado** | Ocorrência salva, app retorna para lista, novo card aparece no topo |
| **Resultado obtido** | Ocorrência criada com sucesso. Card apareceu no topo da lista com risco "Médio" e status "Pendente". Contador atualizado de 6 para 7 |
| **Status** | ✅ PASSOU |

---

## Fluxo 4 — Validação de formulário (campos obrigatórios)

**Cenário:** Operador tenta registrar ocorrência sem preencher campos obrigatórios.

| Campo | Resultado |
|---|---|
| **Pré-condição** | Tela de cadastro aberta |
| **Passos** | 1. Tocar em "Registrar ocorrência" sem preencher nada |
| **Resultado esperado** | Mensagens de erro aparecem abaixo dos campos obrigatórios vazios. Ocorrência NÃO é salva |
| **Resultado obtido** | Erros exibidos inline: "Informe o trecho da rodovia", "Informe a localização", "Informe o nome do operador", "Selecione o nível de risco". Campos com borda vermelha. Nenhuma ocorrência criada |
| **Status** | ✅ PASSOU |

---

## Fluxo 5 — Visualizar detalhe e atualizar status

**Cenário:** Supervisor abre uma ocorrência pendente e avança o status.

| Campo | Resultado |
|---|---|
| **Pré-condição** | Lista com ao menos uma ocorrência "Pendente" |
| **Passos** | 1. Tocar no card "BR-101 km 312" (risco alto, pendente) |
| | 2. Verificar dados na tela de detalhe |
| | 3. Tocar em "Iniciar atendimento" |
| | 4. Tocar em "←" para voltar |
| **Resultado esperado** | Detalhe exibe todos os dados do sensor (8cm, 82% umidade). Botão muda status para "Em andamento". Card na lista reflete o novo status |
| **Resultado obtido** | Detalhe exibiu distância 8cm e umidade 82% corretamente. Status atualizado para "Em andamento" imediatamente. Ao voltar, card exibiu status atualizado |
| **Status** | ✅ PASSOU |

---

## Fluxo 6 — Excluir ocorrência

**Cenário:** Operador remove uma ocorrência cadastrada por engano.

| Campo | Resultado |
|---|---|
| **Pré-condição** | Tela de detalhe de qualquer ocorrência |
| **Passos** | 1. Tocar no ícone 🗑 no canto superior direito |
| | 2. Confirmar no alerta de confirmação |
| **Resultado esperado** | Alerta de confirmação exibido. Após confirmar, ocorrência removida e lista atualizada |
| **Resultado obtido** | Alerta exibido corretamente com opções "Cancelar" e "Excluir". Ao confirmar, voltou para lista sem a ocorrência. Contador decrementou |
| **Status** | ✅ PASSOU |

---

## Fluxo 7 — Estado de lista vazia

**Cenário:** Usuário aplica filtro que não retorna resultados.

| Campo | Resultado |
|---|---|
| **Pré-condição** | App com ocorrências apenas de risco alto e médio (excluindo as de risco baixo) |
| **Passos** | 1. Excluir todas as ocorrências de risco baixo |
| | 2. Tocar no filtro "Baixo" |
| **Resultado esperado** | Tela exibe mensagem "Nenhuma ocorrência para este filtro" com ícone |
| **Resultado obtido** | Estado vazio exibido corretamente com ícone 📋 e mensagem contextual |
| **Status** | ✅ PASSOU |

---

## Fluxo 8 — Confirmação para risco alto

**Cenário:** Operador tenta registrar ocorrência de risco alto.

| Campo | Resultado |
|---|---|
| **Pré-condição** | Formulário preenchido com risco "Alto" |
| **Passos** | 1. Selecionar risco "Alto" no formulário |
| | 2. Preencher demais campos obrigatórios |
| | 3. Tocar em "Registrar ocorrência" |
| **Resultado esperado** | Alerta de confirmação "⚠ Risco Alto" antes de salvar |
| **Resultado obtido** | Alerta exibido com mensagem de confirmação. Ao cancelar, permanece no formulário. Ao confirmar, registra e volta para lista |
| **Status** | ✅ PASSOU |

---

## Resumo dos Testes

| Total testado | Passaram | Falharam |
|---|---|---|
| 8 fluxos | 8 ✅ | 0 ❌ |

---

## Pontos de Melhoria Identificados

1. **Status no detalhe não reflete em tempo real** — ao voltar à lista e reabrir o detalhe, o status não atualiza automaticamente a referência local. Workaround atual: reabrir o card. *Solução na Sprint 4: mover estado para contexto global ou Redux.*
2. **Câmera não funcional** — área de foto é apenas placeholder. *Sprint 4: expo-camera.*
3. **Dados não persistem** — ao fechar o app, os dados mockados são recarregados. *Sprint 4: AsyncStorage ou Firebase.*
4. **Sem feedback de loading** — ao simular uma futura chamada de API, não há indicador de carregamento. *Sprint 4: ActivityIndicator.*
