# qa-challenging-dom-and-api-tests

# QA Challenge  Cypress Automation
Este repositório contém o **desafio técnico de QA** dividido em duas partes: 
1. **Automação de interface web** (UI) 
2. **Automação de testes de API + validação de schema**  

Desenvolvido utilizando **Cypress** + **Ajv** (validador de JSON Schema).

---  

## Tecnologias utilizadas  
- [Cypress](https://www.cypress.io/)  framework de testes E2E e API   
- [Ajv](https://ajv.js.org/)  validação de JSON Schema   
- [Node.js](https://nodejs.org/en/)  runtime para execução local    

--- 

## 📁 Estrutura do projeto

qa-challenging-dom-and-api-tests/ 
│ 
├─ cypress/ 
│ ├─ e2e/ 
│ │ ├─ ui_challenging_dom.cy.js → testes de interface web 
│ │ └─ api_users.cy.js → testes da API /users 
│ ├─ fixtures/ 
│ │ └─ user.schema.json → schema de validação de usuários 
│ 
├─ cypress.config.js → configurações globais 
├─ package.json → dependências do projeto 
├─ README.md → documentação do desafio


---  

## ⚙ Instalação e execução  

### Pré-requisitos 
- Node.js ≥ 18 
- npm ≥ 8  

### Passos
```bash 
# 1. Clone o repositório 
git clone https://github.com/<seu-usuario>/qa-challenging-dom-and-api-tests.git cd qa-challenging-dom-and-api-tests  

# 2. Instale as dependências 
npm install  

#3. Execute os testes em modo headless 
npx cypress run  

# 4. (Opcional) Abra o runner interativo 
npx cypress open
