# 📚 Library App

![GitHub repo size](https://img.shields.io/github/repo-size/wenblack/library-app)
![GitHub last commit](https://img.shields.io/github/last-commit/wenblack/library-app)
![GitHub issues](https://img.shields.io/github/issues/wenblack/library-app)
![License](https://img.shields.io/github/license/wenblack/library-app)

Aplicativo mobile para auxiliar bibliotecários no gerenciamento de livros e usuários, desenvolvido com **React Native (Expo)**, **TypeScript** e **SQLite**.

---

## ✨ Funcionalidades

- ✅ Cadastro de livros e usuários
- 📖 Listagem de livros com status (`Disponível` ou `Em uso`)
- 🔄 Reserva de livro para um usuário
- 🛠️ Tela de detalhes com edição e reserva
- 🔍 Campo de busca por título
- 🧭 Navegação inferior (Tab Navigation)
- 🎨 Ícones com `expo-vector-icons`

---

## 📸 Demonstração

> _Adicione prints reais aqui se tiver_

<img src="assets/screenshots/home.png" width="250" /> <img src="assets/screenshots/book-details.png" width="250" />

---

## 🛠️ Tecnologias

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo Router](https://expo.github.io/router/)
- [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [Native Base](https://nativebase.io/)
- [expo-vector-icons](https://icons.expo.fyi/)

---

## 🚀 Como executar

```bash
# Clone o projeto
git clone https://github.com/wenblack/library-app
cd library-app

# Instale as dependências
npm install

# Inicie o app
npx expo start
```

## 📁 Estrutura

```bash
app/
├── (tabs)/               # Navegação por abas
├── index.tsx             # Página inicial com busca e listagem
├── livro/[id].tsx        # Detalhes e reserva
├── livros/novo.tsx       # Cadastro de livros
├── usuarios/novo.tsx     # Cadastro de usuários
database/
├── index.ts              # Inicialização do banco
├── hooks/                # Lógica SQLite (livros e usuários)
```
