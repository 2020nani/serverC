/*
    Dados do server
   * Nome : CotaboxTesteServer
   * Objetivo: Fornecer e receber dados para o frontend
   * Desenvolvedor: Hernani Almeida
   * data criacao: 22/12/2020 - 27/12/2020
   
*/

/*configura variaveis de ambiente para teste e desenvolvimento*/
const dotenv =require('dotenv');

dotenv.config({
  path: process.env.NODE_ENV==="test" ? 'test.env' : '.env'
  
})