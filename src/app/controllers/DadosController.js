/*
    Dados do server
   * Nome : CotaboxTesteServer
   * Objetivo: Fornecer e receber dados para o frontend
   * Desenvolvedor: Hernani Almeida
   * data criacao: 22/12/2020 - 27/12/2020
   
*/

import * as Yup from 'yup';
import Dados from '../models/Dados';
import alert from 'alert'
class DadosController {

  async store(req, res) {
   /*valida os dados recebidos */ 
    const schema = Yup.object().shape({
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      participation: Yup.number().required().min(0.1).max(100),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao Falhou' });
    }
   /*define totalPorcentagem como 0*/
    let totalPorcentagem = 0
    /*define totalPorcentagem somando os dados particpation cadastrado no server*/
    const dados = await Dados.findAll({
      attributes: ['participation'],
    })
    dados.map(a => {
      totalPorcentagem = totalPorcentagem + parseInt(a.dataValues.participation)
    })
    /*pega o dado digitado pelo usuario no campo participation */
    const { participation } = req.body
    /*soma totalPorcentagem com o dado requerido pelo usuario para validar se nao passa de 100*/
    totalPorcentagem = totalPorcentagem + parseInt(participation)

    if (totalPorcentagem <= 100) {
      const { id } = await Dados.create(req.body)
      return res.json(
        id,
        
      );
    } else {
      alert(`Porcentagem deve ser dividida sem ultrapassar 100 porcento, Sua porcentagem passou ${totalPorcentagem - 100}%`)
      return res.json(
        `Porcentagem nao pode ultrapassar 100 porcento.`
      )

    }
  }
  async index(req, res) {
    const dados = await Dados.findAll({
      attributes: ['id', 'firstname', 'lastname', 'participation'],

    })
    return res.json(dados)
  }
 

  async update(req, res) {
     /*valida dados recebidos */
    const schema = Yup.object().shape({
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      participation: Yup.number().required().min(0.1).max(100),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao Falhou' });
    }
     /*define totalPorcentagem como 0*/
    let totalPorcentagem = 0

    /*define totalPorcentagem somando os dados particpation cadastrado no server*/
    const dados = await Dados.findAll({
      attributes: ['participation'],
    })
    dados.map(a => {
      totalPorcentagem = totalPorcentagem + parseInt(a.dataValues.participation)
    })

    const dadosPessoa = await Dados.findOne({
      where: { id: req.params.id }
    })
  /*soma totalPorcentagem com o dado participation ja definido para a pessoa */
    totalPorcentagem = totalPorcentagem - parseInt(dadosPessoa.dataValues.participation)


    const { 
      firstname, 
      lastname, 
      participation 
    } = req.body;
     /*soma totalPorcentagem com o dado requerido pelo usuario para validar se nao passa de 100*/
    totalPorcentagem = totalPorcentagem + parseInt(participation)
   
    if (totalPorcentagem <= 100) {
      await dadosPessoa.update(req.body);
      return res.json({
        firstname,
        lastname,
        participation
      })
    } else {
      alert(`Porcentagem deve ser dividida sem ultrapassar 100 porcento, Sua porcentagem passou ${totalPorcentagem - 100}%`)
      return res.json(
        `Porcentagem nao pode ultrapassar 100 porcento.`
      )

    }
  }

  async delete(req, res) {
    const dados = await Dados.findOne({
      where: { id: req.params.id }
    })
    await dados.destroy(req.body);
    res.json({})
  }
}

export default new DadosController();
