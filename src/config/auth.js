/*
    Dados do server
   * Nome : CotaboxTesteServer
   * Objetivo: Fornecer e receber dados para o frontend
   * Desenvolvedor: Hernani Almeida
   * data criacao: 22/12/2020 - 27/12/2020
   
*/
/*exporta variaveis para criacao do jwttoken*/
export default {
    secret: process.env.APP_SECRET,
    expiresIn: '7d',
  };