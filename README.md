
# Boilerplate Synergia 🚀

   O **Boilerplate Synergia** é uma base sólida para desenvolvimento de aplicações web, combinando **MeteorJS**, **ReactJS**, **MongoDB** e **Material-UI**. Ele fornece uma estrutura organizada, segurança e boas práticas para um desenvolvimento ágil e eficiente.

## 🎯 Objetivo do Projeto

   O intuito deste projeto é servir como **treinamento** com a ferramenta **Boilerplate Synergia**, permitindo que desenvolvedores aprimorem suas habilidades no uso dessas tecnologias integradas, facilitando a construção de aplicações.


## 📌 Sumário

- [Estrutura de Pastas](#estrutura-de-pastas)
- [Primeiros Passos](#primeiros-passos)
- [Funcionalidades](#funcionalidades)
- [Modulo To do List  ](#modulo-to-do-list)

---

## 📂 Estrutura de Pastas

```shell
├── .meteor                 # Arquivos do Meteor
├── client                  # Frontend React e estilização
├── imports                 # Código principal
│   ├── api                 # Comunicação com o banco
│   ├── app                 # Configuração e rotas
│   ├── hooks               # Hooks customizados
│   ├── libs                # Bibliotecas auxiliares
│   ├── modules             # Módulos do sistema
│   │   ├── toDos           # Modulo de tarefas
│   ├── security            # Configuração de segurança
│   ├── server              # Configuração do servidor
│   ├── sysPages            # Páginas independentes
│   ├── typings             # Tipagens TypeScript
│   └── ui                  # Componentes de interface
├── public                  # Arquivos públicos
├── server                  # Configuração inicial do backend
├── tests                   # Testes automatizados
└── private                 # Arquivos privados
```

---

## 🚀 Primeiros Passos

1️⃣ Clone o repositório:
```bash
git clone https://github.com/anderson-neves-dev/ToDoListBoilerplateSynergia
```

2️⃣ Instale as dependências:
```bash
cd MeteorReactBaseMUI && meteor npm install
```

3️⃣ Rode a aplicação:
```bash
meteor
```

4️⃣ Acesse no navegador:
[http://localhost:3000](http://localhost:3000)

📌 **Credenciais Padrão:**
```text
Login: admin@mrb.com
Senha: admin@mrb.com
```

---

## 📝 Funcionalidades

- **SysForm** 📝 - Gerenciamento automático de formulários.
- **ComplexTable** 📊 - Geração automática de tabelas baseadas nos schemas.
- **APIs Modulares** 🔌 - Estrutura modular para fácil manutenção.
- **Suporte a Temas** 🎨 - Customização com Material-UI e Styled Components.
- **Segurança e Controle de Acesso** 🔒 - Mapeamento de permissões e papéis de usuário.

---

## 📖 Modulo To do List 

### 🛡️ BMR-01 – Acesso Restrito 🔐
- O sistema exige login e tela de cadastar para acesso aos módulos.


### 📌 BMR-02 – Tela Inicial com Atividades Recentes 🏡
- Exibe as 5 últimas tarefas adicionadas ou atualizadas.
- Botão **"Minhas Tarefas"** direciona para o módulo To-Do List.
- O filtro é feito no **servidor** via publicações do Meteor.

### ✅ BMR-03 – Módulo To-Do List 📝
- Criar, editar e listar tarefas.
- Exibe **ícone**, **descrição** e **autor**.
- Mensagens de **sucesso/erro** ao adicionar.
- Marcar tarefas como **concluídas** ✅ ou **Não concluídas** ⏳.
- Edição e exclusão apenas pelo criador.
- Extra: Modal para visualização.

### 🔐 BMR-04 – Restrição de Edição/Exclusão ⚠️
- Somente o criador pode alterar ou excluir sua tarefa.
- Todos podem visualizar as tarefas.

### 🔏 BMR-05 – Tarefas Pessoais 👤
- Definir se a tarefa é **pessoal** (somente visível pelo criador).
- Implementado via **publicações do Meteor**.

### 🔍 BMR-06 – Pesquisa de Tarefas 🔎
- Filtro de tarefas por **descrição**.
- Feito no **servidor** via publicações do Meteor.
  
### 📱 BMR-09 – Design Resposivo 📱
  - Ajuste para dispositivos móveis.
  - Alteração de cores primárias e secundárias.




🔗 **Wireframe:** [Figma](https://www.figma.com/proto/FIwjONvPxPIbvYEj2J3ycT/ToDo-List?page-id=0%3A1&node-id=19%3A889)

---
