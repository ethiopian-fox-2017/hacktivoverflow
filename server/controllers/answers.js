const Question = require('../controllers/answers')

module.exports = {
  post : function(req, res){
    Question.findById()
  }
}
