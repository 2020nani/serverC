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
    let totalPorcentagem = 0
    const dados = await Dados.findAll({
      attributes: ['participation'],
    })
    dados.map(a => {
      totalPorcentagem = totalPorcentagem + parseInt(a.dataValues.participation)
    })

    const {
      firstname,
      lastname,
      participation,

    } = req.body
    totalPorcentagem = totalPorcentagem + parseInt(participation)

    if (totalPorcentagem <= 100) {
      await Dados.create(req.body)
      return res.json(
        firstname,
        lastname,
        participation,
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
  async index1(req, res) {
    const dados = await Dados.findOne({
      where: { id: req.params.id }

    })
    return res.json(dados)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      participation: Yup.number().required().min(0.1).max(100),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao Falhou' });
    }
    let totalPorcentagem = 0
    const dados = await Dados.findAll({
      attributes: ['participation'],
    })
    dados.map(a => {
      totalPorcentagem = totalPorcentagem + parseInt(a.dataValues.participation)
    })

    const dadosPessoa = await Dados.findOne({
      where: { id: req.params.id }
    })

    totalPorcentagem = totalPorcentagem - parseInt(dadosPessoa.dataValues.participation)


    const { 
      firstname, 
      lastname, 
      participation 
    } = req.body;
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
    const { firstname, lastname, participation } = await dados.destroy(req.body);
    res.json({})
  }
}

export default new DadosController();
