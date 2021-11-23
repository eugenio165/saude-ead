/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

 'post /signup':'UsuarioController.signup',
 'post /login': 'LoginController.login',

 'get /colegio/:id?': 'ColegioController.getColegio',
 'post /colegio': 'ColegioController.createColegio',
 'delete /colegio/:id': 'ColegioController.deleteColegio',
 'patch /colegio/:id': 'ColegioController.patchColegio',

 'get /account/:id?': 'UsuarioController.getAccount',
 'post /account': 'UsuarioController.signup',
 'delete /account/:id': 'UsuarioController.deleteAccount',
 'patch /account/:id': 'UsuarioController.patchAccount',

 'get /diretores': 'UsuarioController.getDiretores',
 'get /professores': 'UsuarioController.getProfessores',
 'get /alunos': 'UsuarioController.getAlunos',

 'get /tutorial': 'TutorialController.getTutorial',
 'patch /tutorial': 'TutorialController.editTutorial',
 'delete /tutorial': 'TutorialController.deleteTutorial',
};
