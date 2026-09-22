# 🌿 GrassWatch

> Sistema de monitoramento de crescimento de vegetação em rodovias  
> Desenvolvido para o desafio **Motiva**

---

## 👥 Time

Samuel Nunes : 564435
Henry dos Santos : 565309
JOAO VITOR LIMA : 566541
Miguel Vanucci Delgado : 563491



---

## 🚨 Problema

Rodovias enfrentam risco de segurança causado pelo crescimento descontrolado de vegetação nos acostamentos. O monitoramento hoje é **manual e reativo** — equipes percorrem a estrada só depois que o problema já é visível.

## 💡 Solução

O GrassWatch combina um **sensor IoT físico** (ESP32 + HC-SR04) instalado no solo que mede o crescimento da grama por distância, e um **app mobile** onde operadores de campo registram, classificam e acompanham ocorrências em tempo real.

## 👤 Usuários

- **Operador de campo** — registra ocorrências, valida alertas do sensor com a câmera, classifica o risco
- **Supervisor** — acompanha o painel de ocorrências e prioriza ações de manutenção

---

## 📱 Stack

- React Native + Expo
- TypeScript
- Dados mockados (Sprint 3) → Firebase Realtime DB (Sprint 4)



---

## ✅ Status das Funcionalidades

| Funcionalidade | Status | Observações |
|---|---|---|
| Listagem de ocorrências | ✅ Completo | Com filtros por risco e status |
| Filtros por risco/status | ✅ Completo | baixo / médio / alto / pendente / resolvida |
| Contadores no topo | ✅ Completo | Totais por nível de risco |
| Alerta IoT (banner) | ✅ Completo | Exibe alertas de sensores com risco alto |
| Estado vazio | ✅ Completo | Mensagem contextual por filtro |
| Cadastro de ocorrência | ✅ Completo | Com validação de campos obrigatórios |
| Validação de formulário | ✅ Completo | Erros inline + alerta para risco alto |
| Detalhe da ocorrência | ✅ Completo | Dados do sensor, status, operador, descrição |
| Atualizar status | ✅ Completo | Pendente → Em andamento → Resolvido |
| Excluir ocorrência | ✅ Completo | Com alerta de confirmação |
| Dados mockados | ✅ Completo | 6 ocorrências cobrindo todos os cenários |
| Integração Firebase | ⏳ Pendente | Sprint 4 |
| Câmera real | ⏳ Pendente | Sprint 4 — expo-camera |
| Leitura real do sensor IoT | ⏳ Pendente | Sprint 4 — Firebase Realtime DB |
| Autenticação | ⏳ Pendente | Sprint 4 |

---

## 🧪 Cenários de Mock

| Cenário | Coberto? |
|---|---|
| Ocorrência risco alto + pendente | ✅ |
| Ocorrência risco médio + em andamento | ✅ |
| Ocorrência risco baixo + resolvida | ✅ |
| Ocorrência sem câmera validada | ✅ |
| Múltiplos alertas IoT simultâneos | ✅ |
| Lista filtrada vazia | ✅ |

---

## 🔜 Plano Sprint 4

**Prioridade alta**
- Integração Firebase — substituir mocks pelo Realtime Database
- Leitura do sensor IoT — consumir dados do ESP32 via Firebase
- Câmera real — integrar `expo-camera` para captura de foto

**Prioridade média**
- Autenticação — login por operador
- Persistência local — AsyncStorage para uso offline
- Notificações push — alertar supervisor em risco alto

---

## ▶️ Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR code com o app **Expo Go** no celular.


---

## 📁 Estrutura
