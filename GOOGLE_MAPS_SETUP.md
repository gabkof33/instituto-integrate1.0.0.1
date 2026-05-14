# Configuração - Google Maps API

## Como Configurar a Chave da API do Google Maps

Para que o mapa funcione corretamente, você precisa configurar uma chave da API do Google Maps.

### Passo 1: Obter a Chave da API

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto (ou selecione um existente)
3. Ative a "Maps JavaScript API" no painel de APIs
4. Vá para "Credenciais" e crie uma chave de API
5. Copie a chave gerada

### Passo 2: Adicionar a Chave ao Projeto

Abra o arquivo `src/client/index.html` e substitua:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&loading=async"></script>
```

Por:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_AQUI&loading=async"></script>
```

### Dicas de Segurança

- **Restrinja a chave**: No Google Cloud Console, configure restrições de HTTP Referrer para sua chave
- **Use variáveis de ambiente**: Para produção, considere usar uma variável de ambiente em vez de hardcoding a chave

### Informações do Mapa

O mapa foi configurado com as seguintes informações:

- **Endereço**: R. Vital Macedo, 366 - Tabajaras, Uberlândia - MG, 38400-290
- **Telefone**: (34) 3306-5700
- **Coordenadas**: -18.9141, -48.2777 (Uberlândia, MG)
- **Horário de Funcionamento**: Seg-Sex 08:00-21:00, Sábado e Domingo fechado

### Personalizações Disponíveis

Você pode customizar o mapa editando o arquivo `src/client/components/Map.ts`:

- Alterar as cores do mapa
- Mudar o nível de zoom padrão
- Adicionar mais marcadores
- Personalizar o estilo do info window

---

**Status**: ✅ Mapa implementado e pronto para uso após adicionar a chave da API
