/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  signup: async function (inputs, res) {
    if (inputs.session.User === undefined || inputs.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');
    var newEmailAddress = inputs.body.emailAddress.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await Usuario.create(Object.assign({
      ...inputs.body,
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.body.password),
    })).fetch();

    return res.status(200).json(newUserRecord);

  },

  getProfessores: async function (req, res) { // Retorna todos os professores para superadmin e todos os professores do colegio para diretor
    let response;
    if (req.session.User === undefined || req.session.User.role in ['aluno', 'professor'])
      return res.badRequest('ACESSO RESTRITO');
    else if (req.session.User.role === 'superadmin')
      response = await Usuario.find({
        role: 'professor',
      }).populate('escola');
    else if (req.session.User.role === 'diretor')
      response = await Usuario.find({
        role: 'professor',
        escola: req.session.User.escola.id,
      }).populate('escola');

    return res.status(200).json(response);
  },

  getDiretores: async function (req, res) { // Retorna todos os Diretor para superadmin
    let response;
    if (req.session.User === undefined || req.session.User.role in ['aluno', 'professor', 'diretor'])
      return res.badRequest('ACESSO RESTRITO');
    else if (req.session.User.role === 'superadmin')
      response = await Usuario.find({
        role: 'diretor',
      }).populate('escola');
    else if (req.session.User.role === 'diretor')
      response = await Usuario.find({
        role: 'diretor',
        escola: req.session.User.escola.id,
      }).populate('escola');

    return res.status(200).json(response);
  },

  getAlunos: async function (req, res) {
    let response;
    if (req.session.User === undefined)
      return res.badRequest('ACESSO RESTRITO');
    else if (req.session.User.role === 'superadmin')
      response = await Usuario.find({
        role: 'aluno',
      }).populate('escola');
    else
      response = await Usuario.find({
        role: 'aluno',
        escola: req.session.User.escola.id,
      }).populate('escola');

    return res.status(200).json(response);
  },

  getAccount: async function (req, res) {
    let id = req.param('id');
    let response = (id) ? await Usuario.findOne({id: id}).populate('escola') : await Usuario.find().populate('escola');
    return res.status(200).json(response);
  },

  deleteAccount: async function(req, res) {
    if (req.session.User === undefined || req.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');

    let id = req.param('id');
    await Pontuacao.destroy({aluno: id});
    await Usuario.destroy({id: id});
    return res.status(200).json('ok');
  },

  patchAccount: async function (req, res) {
    if (req.session.User === undefined || req.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');

    let id = req.param('id');
    let newOBJ = {...req.body};
    if (req.body.password)
      newOBJ['password'] = await sails.helpers.passwords.hashPassword(req.body.password);
    await Usuario.update({id: id}).set(newOBJ);
    let record = await Usuario.findOne({id: id}).populate('escola');
    return res.status(200).json(record);
  }

};

