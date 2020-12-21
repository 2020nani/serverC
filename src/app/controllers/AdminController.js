import * as Yup from 'yup';
import Admin from '../models/Admin';


class AdminController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao Falhou' });
    }

    const adminExists = await Admin.findOne({ where: { email: req.body.email } });

    if (adminExists) {
      return res.status(400).json({ error: 'Este email ja esta cadastrado' });
    }
    const { id, name, email } = await Admin.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao falhou' });
    }

    const { email, oldPassword } = req.body;
    const admin = await Admin.findByPk(req.adminId);

    if (email !== admin.email) {
      const adminExists = await Admin.findOne({
        where: { email },
      });

      if (adminExists) {
        return res.status(400).json({ error: 'admin ja existe' });
      }
    }

    if (oldPassword && !(await admin.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await admin.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new AdminController();