/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getAll: async function (req, res) {
    let response = await Test.find();
    return res.status(200).json(response);
  },

};

