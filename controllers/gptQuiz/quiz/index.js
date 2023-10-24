const strict_output = require('../../../utils/gpt');

const generateQuiz = async (req, res) => {
  const { topic, amount, level, type } = req.query;

  if (type === 'mcq') {
    try {
      questions = await strict_output(
        'You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array',
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}`
        ),
        {
          question: 'question dont include "" here',
          answer: 'answer with max length of 15 words dont include "" here',
          option1: 'option1 with max length of 15 words dont include "" here',
          option2: 'option2 with max length of 15 words dont include "" here',
          option3: 'option3 with max length of 15 words dont include "" here',
        }
      );

      return res.status(200).json(questions);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Server error.' });
    }
  }

  res.status(500).json({ error: 'Server error.' });
};

module.exports = { generateQuiz };
