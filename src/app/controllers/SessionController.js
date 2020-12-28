/*
    Dados do server
   * Nome : CotaboxTesteServer
   * Objetivo: Fornecer e receber dados para o frontend
   * Desenvolvedor: Hernani Almeida
   * data criacao: 22/12/2020 - 27/12/2020
   
*/

import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import Admin from '../models/Admin';
import alert from 'alert'


class SessionController {
  async store(req, res) {
     /*valida dados recebidos*/
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao Falhou' });
    }

    const { email, password } = req.body;
     /*verifica se ha admin com o email digitado pelo usuario*/
    const admin = await Admin.findOne({
      where: { email },
      
    });
     /*retorna erro se nao achar email cadastrado*/
    if (!admin) {
      alert('admin nao encontrado')
      return res.status(401).json({ error: 'admin nao encontrado' });
    }
     /*retorna erro se password for invalido*/
    if (!(await admin.checkPassword(password))) {
      alert('Senha nao encontrada')
      return res.status(401).json({ error: 'Password nao encontrado' });
    }

    const { id, name} = admin;

    return res.json({
      admin: {
        id,
        name,
        email,
      },
       /*admin fazendo login define token que permite acesso as rotas privadas do frontend*/
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();