/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // Set up fake development data (or if we already have some, avast)
  if (await Usuario.count() > 0) {
    return done();
  }

  await Colegio.createEach([
    {
      id: 1,
      nome: 'Colégio Getúlio Vargas',
      endereco: 'rua 1, 123, 312310-232 Belavista, bauru-sp',
    },
    {
      id: 2,
      nome: 'Colégio 2',
      endereco: 'rua 1',
    },
    {
      id: 3,
      nome: 'Colégio 3',
      endereco: 'rua 23',
    },
    {
      id: 4,
      nome: 'Colégio Super Admin',
      endereco: 'rua Super Admin',
    },
  ])

  await Usuario.createEach([
    {
      id: 1,
      emailAddress: 'teste@gmail.com',
      fullName: 'Teste da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 1,
      ano: '5'},
    {
      id: 2,
      emailAddress: 'guilherme@gmail.com',
      fullName: 'Guilherme da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 1,
      ano: '5'},
    {
      id: 3,
      emailAddress: 'gustavo@gmail.com',
      fullName: 'Gustavo da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 2,
      ano: '5'},
    {
      id: 4,
      emailAddress: 'roberto@gmail.com',
      fullName: 'Roberto da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 1,
      ano: '5'},
    {
      id: 5,
      emailAddress: 'silva@gmail.com',
      fullName: 'Silva da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 3,
      ano: '8'},
    {
      id: 6,
      emailAddress: 'silvana@gmail.com',
      fullName: 'Silvana da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 1,
      ano: '9'},
    {
      id: 7,
      emailAddress: 'iodites@gmail.com',
      fullName: 'Iodites da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 1,
      ano: '5'},
    {
      id: 8,
      emailAddress: 'superadmin@gmail.com',
      fullName: 'SUPER ADMIN TEST',
      password: await sails.helpers.passwords.hashPassword('superadmin'),
      escola: 4,
      ano: '3',
      role: 'superadmin',
    },
    {
      id: 9,
      emailAddress: 'professor@gmail.com',
      fullName: 'PROFESSOR TEST',
      password: await sails.helpers.passwords.hashPassword('professor'),
      escola: 1,
      ano: '5',
      role: 'professor',
    },
    {
      id: 10,
      emailAddress: 'diretor@gmail.com',
      fullName: 'DIRETOR TEST',
      password: await sails.helpers.passwords.hashPassword('diretor'),
      escola: 1,
      ano: '3',
      role: 'diretor',
    },
  ]);

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
