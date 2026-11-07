# OrbitLab — Atividade Bootstrap e Tailwind CSS

Projeto acadêmico de página web responsiva sobre uma plataforma fictícia de cursos de tecnologia. Desenvolvido com **HTML5, Bootstrap 5, Tailwind CSS 4 e JavaScript nativo**, sem backend e sem dependências de build.

## Páginas

- **`index.html`** — implementação principal com **Bootstrap 5.3.8**.
- **`tailwind/index.html`** — implementação **independente** com **Tailwind CSS 4** (desafio extra).
- **`docs/ROTEIRO_APRESENTACAO.md`** — guia para demonstrar o projeto no vídeo obrigatório e comparar os frameworks.

As imagens são SVGs locais produzidos para o projeto, com caminhos relativos. **É necessário acesso à internet para carregar os frameworks via CDN.** O Tailwind usa o Play CDN para esta atividade demonstrativa; para produção, o recomendado é compilá-lo durante o build.

## Como executar no GitHub Codespaces (ambiente pedido pelo professor)

1. Crie um **repositório** no GitHub e envie o conteúdo desta pasta para a raiz dele (incluindo a pasta `.devcontainer`).
2. No repositório, abra **Code → Codespaces → Create codespace on main**.
3. Abra o terminal integrado e execute:

   ```bash
   python3 -m http.server 8000 --bind 0.0.0.0
   ```

4. Em **Ports / Portas**, abra a porta **8000** em um navegador ou use **Open in Browser**.
5. Acesse `/index.html` para Bootstrap e `/tailwind/index.html` para Tailwind.

Também funciona localmente abrindo o HTML no navegador; para uma experiência mais próxima da publicação, prefira servidor HTTP simples (inclusive a extensão Live Server do VS Code).

## Lista de verificação dos requisitos

| Requisito | Bootstrap | Tailwind |
|---|---|---|
| HTML5 semântico (`header`, `main`, `section`, `footer`) | ✓ | ✓ |
| Navbar com logo, 4 itens e menu mobile | `navbar`, `collapse` | Flex responsivo + JS nativo |
| Carrossel, 3 slides, botões, indicadores e animação | `carousel slide` | Grid/Flex + JS nativo |
| 3 cards em grid responsivo | `card`, `row-cols-*` | `grid`, `md:grid-cols-2`, `lg:grid-cols-3` |
| Tabela listrada, 6 linhas, scroll mobile | `table-striped`, `table-responsive` | `overflow-x-auto`, `even:bg-*` |
| Formulário com 4 campos e HTML5 validation | `form-control`, `form-select`, `checkValidity()` | Utilitários + `reportValidity()` |
| Modal com título, texto, ações e overlay | `modal fade` | Diálogo + overlay + JS nativo |
| Responsividade para mobile, tablet e desktop | Breakpoints Bootstrap | Breakpoints Tailwind |
| Acessibilidade: labels, ARIA, foco, tags semânticas | ✓ | ✓ |
| Filtro interativo na tabela (extra opcional) | ✓ | ✓ |

Os seis componentes obrigatórios da atividade são **Navbar, Carrossel, Cards, Tabela, Formulário e Modal**; o projeto contém esses seis em **cada** implementação.

## Testes rápidos

1. Em largura mobile (375 px), clique no menu hambúrguer, navegue até outra seção e confirme que o menu fecha.
2. No carrossel, clique em **Anterior**, **Próximo** e nos indicadores (3 slides).
3. Clique em **Ver detalhes** em um card, veja título/descrição e feche o modal (Bootstrap: Esc; Tailwind: Esc ou overlay).
4. Filtre a tabela por Front-end: devem sobrar **2 encontros**; volte para todas as áreas: **6 encontros**.
5. Tente enviar o formulário vazio: a validação deve impedir o envio. Preencha os quatro campos corretamente e veja a mensagem de confirmação.
6. Faça o teste em **375, 768 e 1440 px**, e, se possível, em Chrome, Firefox, Edge e Safari.

## Observações importantes

- **Os dados são fictícios:** cursos, datas, disponibilidade, mensagens e contatos ilustram funcionalidades visuais, sem inscrições reais.
- **O formulário não envia dados:** a mensagem de sucesso é uma simulação local e não depende de servidor.
- Não usa React, jQuery, bibliotecas de ícones ou plugins adicionais. A versão Bootstrap usa o JS oficial do Bootstrap; a versão Tailwind usa JavaScript nativo.
- O professor pede **um vídeo curto explicativo mostrando funcionamento e código no GitHub Codespaces**. Para o desafio extra (0,2 ponto), pede **um novo vídeo** demonstrando Tailwind e comparando as soluções. Nenhum vídeo está incluído, pois exige gravação da sua própria apresentação.

## Estrutura de diretórios

```text
OrbitLab_Atividade_CSS/
├── index.html                   # Bootstrap 5 (principal)
├── css/style.css                # Personalização visual Bootstrap
├── js/app.js                    # Filtro, validação e modal dinâmico
├── assets/                      # Ilustrações SVG locais e favicon
├── tailwind/
│   ├── index.html               # Versão Tailwind 4 (independente)
│   ├── style.css                # Apenas transições e ajustes específicos
│   └── app.js                   # Navbar, carrossel, modal, filtro e formulário
├── docs/ROTEIRO_APRESENTACAO.md
└── .devcontainer/devcontainer.json
```
