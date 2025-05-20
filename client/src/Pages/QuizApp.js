import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Radio, Space, Typography, Result, Spin, message } from 'antd';
const { Title, Text } = Typography;

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user || '');
  }, [location]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const data = await response.json();
        const shuffledQuestions = data.map((question) => {
          const options = [...question.incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5);
          return { ...question, options };
        });
        setQuestions(shuffledQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    message.success('User Logged out');
    setLoggedInUser(null);
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    setLoading(true);
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const data = await response.json();
        const shuffledQuestions = data.map((question) => {
          const options = [...question.incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5);
          return { ...question, options };
        });
        setQuestions(shuffledQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };
    fetchQuestions();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    return (
      <Result
        status={percentage >= 60 ? 'success' : 'warning'}
        title={`Quiz Completed! Your Score: ${score}/${questions.length}`}
        subTitle={`You got ${percentage.toFixed(2)}% correct!`}
        extra={[
          <Button type="primary" key="restart" onClick={handleRestart}>Restart Quiz</Button>,
          <Button type="primary" danger key="logout" onClick={handleLogout}>Logout</Button>,
        ]}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          👋 <span style={{ fontSize: '20px' }}>Hello,{loggedInUser||"User"}</span>
        </div>
        <Button type="primary" danger onClick={handleLogout}>Logout</Button>
      </div>

      <Title level={2}>Quiz Application</Title>
      <Text style={{ display: 'block', marginBottom: '10px' }}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>

      <Card title={<div dangerouslySetInnerHTML={{ __html: currentQuestion.question.text }} />}>

        <Radio.Group
          onChange={(e) => handleOptionSelect(e.target.value)}
          value={selectedOption}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%', gap: '12px' }}>
            {currentQuestion.options.map((option, index) => (
              <Radio
                key={index}
                value={option}
                style={{
                  padding: '10px',
                  background: '#f5f5f5',
                  borderRadius: '4px',
                  width: '100%',
                  transition: 'background 0.3s',
                }}
              >
                <Text style={{ fontSize: '16px' }}>{option}</Text>
              </Radio>
            ))}
          </Space>
        </Radio.Group>

        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={selectedOption === null}
          style={{ marginTop: '20px' }}
        >
          {currentQuestionIndex + 1 === questions.length ? 'Finish' : 'Next'}
        </Button>
      </Card>
    </div>
  );
};

export default QuizApp;
