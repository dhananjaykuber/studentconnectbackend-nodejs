const strict_output = require('../../../utils/gpt');

const generateQuiz = async (req, res) => {
  //   const { topic, amount, level, type } = req.body;

  const topic = 'DevOps';
  const amount = 5;
  const type = 'mcq';

  if (type === 'mcq') {
    const questions = await strict_output(
      'You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array',
      new Array(amount).fill(
        `You are to generate a random hard mcq question about ${topic}`
      ),
      {
        question: 'question',
        answer: 'answer with max length of 15 words',
        option1: 'option1 with max length of 15 words',
        option2: 'option2 with max length of 15 words',
        option3: 'option3 with max length of 15 words',
      }
    );

    console.log(questions);
  }

  res.send('hello');
};

module.exports = { generateQuiz };
