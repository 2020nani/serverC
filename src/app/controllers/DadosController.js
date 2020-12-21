import Dados from '../models/Dados';
import alert from 'alert'
class DadosController {

  async store(req, res) {
    let total = 0;
    const dados = await Dados.findAll({
      attributes: ['participation'],
    })
    dados.map(a => {
      total = total + a.dataValues.participation
    })

    const {
      firstname,
      lastname,
      participation,
     
    } = req.body
    total = total + participation
    console.log(total)
    if (total <= 100) {
      await Dados.create(req.body)
      return res.json(
        firstname,
        lastname,
        participation,
      );
    } else {
      alert( `Porcentagem deve ser dividida sem ultrapassar 100 porcento, Sua porcentagem passou ${total - 100}%`)
      return  res.json(
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
    const dados = await Dados.findOne({
      where: { id: req.params.id }
    })
    const { firstname, lastname, participation } = await dados.update(req.body);
    return res.json({
      firstname,
      lastname,
      participation
    })
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
