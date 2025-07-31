# Estrutura do Projeto - Maré Viva

## Arquitetura de Arquivos
```
mare_viva_website/
├── index.html              # Página inicial
├── login.html              # Página de login
├── cadastro.html           # Página de cadastro
├── noticias.html           # Página de notícias
├── parcerias.html          # Página de parcerias
├── loja.html               # Página da loja
├── denuncias.html          # Página de denúncias
├── contribuir.html         # Página de contribuição
├── sobre.html              # Página sobre nós
├── metas.html              # Página de metas ODS
├── css/
│   ├── reset.css           # Reset CSS
│   ├── variables.css       # Variáveis CSS
│   ├── base.css            # Estilos base
│   ├── components.css      # Componentes reutilizáveis
│   ├── layout.css          # Layout e grid
│   └── responsive.css      # Media queries
├── js/
│   ├── main.js             # JavaScript principal
│   ├── menu.js             # Funcionalidades do menu
│   ├── forms.js            # Validações de formulário
│   └── utils.js            # Funções utilitárias
├── images/                 # Imagens do Figma
└── assets/                 # Outros recursos
```

## Componentes Reutilizáveis

### 1. Header
- Logo "Maré Viva"
- Menu hamburger
- Barra de pesquisa (quando aplicável)
- Ícone de usuário

### 2. Navigation Menu
- Menu lateral deslizante
- Itens de navegação com ícones
- Seção "Sobre Nós"

### 3. Cards
- Card de produto
- Card de parceiro
- Card informativo
- Card de notícia

### 4. Forms
- Formulário de login
- Formulário de cadastro
- Formulário de denúncia
- Validações JavaScript

### 5. Buttons
- Botão primário (turquesa)
- Botão secundário
- Botão de envio
- Estados de hover

### 6. Footer
- Links de redes sociais
- Informações de contato
- Links úteis

## Responsividade

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Estratégia Mobile-First
1. Design base para mobile
2. Progressivo enhancement para telas maiores
3. Flexbox e CSS Grid para layouts
4. Imagens responsivas
5. Tipografia fluida

## Tecnologias Utilizadas
- HTML5 semântico
- CSS3 com Flexbox e Grid
- JavaScript vanilla (ES6+)
- Responsive design
- Progressive enhancement
- Acessibilidade (ARIA labels)

## Funcionalidades JavaScript
1. Menu hamburger toggle
2. Validação de formulários
3. Smooth scrolling
4. Lazy loading de imagens
5. Animações CSS ativadas por JS
6. Gerenciamento de estado do menu

