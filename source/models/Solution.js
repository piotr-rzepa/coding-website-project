const mongoose = require('mongoose');

//Schemat rozwiązania problemu w bazie danych
const solutionSchema = mongoose.Schema(
  {
    title: { type: String },
    language: { type: String },
    body: [{ line: { type: String } }],
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    tags: [],
  },
  { timestamps: true }
);

//Pozbywamy się niepotrzebnych własności obiektu
solutionSchema.methods.toJSON = function () {
  const solutionOBJ = this.toObject();
  delete solutionOBJ.__v;
  delete solutionOBJ.updatedAt;
  return solutionOBJ;
};

//Model rozwiązania algorytmu
const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;
