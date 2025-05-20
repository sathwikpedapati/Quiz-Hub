import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Typography, List, Row, Col } from 'antd';

const { Title, Text } = Typography;

const Home = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim().toLowerCase() === 'begin') {
      navigate('/quiz');
    }
  };

  const instructions = [
    'Hello User This platform enhance your knowledge ',
    'You will be given 10 questions to answer.',
    'Once the exam starts, it cannot be paused.',
    'Type begin below and press to start.',
  ];

  return (
    <Row
      justify="center"
      style={{ width: '100%', padding: '4rem 1rem', minHeight: '100vh' }}
    >
      <Col xs={24} sm={22} md={20} lg={18} xl={16}>
        <Card
          variant="borderless"
          style={{
            borderRadius: 16,
            padding: '2rem',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            maxWidth: '900px',
            margin: '0 auto',
          }}
          styles={{ body: { padding: '0' } }}
        >
          <div style={{ padding: '0 1rem' }}>
            <Title
              level={2}
              style={{
                textAlign: 'center',
                marginBottom: 32,
                fontWeight: 700,
                color: '#4f46e5',
                letterSpacing: '0.04em',
              }}
            >
              Welcome!
            </Title>

            <Card
              type="inner"
              title={
                <Text strong style={{ fontSize: 20, color: '#3730a3' }}>
                  Quiz Instructions
                </Text>
              }
              style={{
                marginBottom: 32,
                borderRadius: 12,
                backgroundColor: 'transparent',
                borderColor: '#a5b4fc',
              }}
              styles={{
                header: {
                  backgroundColor: 'transparent',
                  borderBottom: '1px solid #a5b4fc',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                },
                body: {
                  backgroundColor: 'transparent',
                  padding: '16px 28px',
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                },
              }}
            >
              <List
                dataSource={instructions}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      paddingLeft: 0,
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: '#1e293b',
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 700,
                        color: '#4338ca',
                      }}
                    ></Text>
                    {item}
                  </List.Item>
                )}
              />
            </Card>

            <Input
              size="large"
              placeholder="Type 'begin' to start"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              style={{
                borderRadius: 10,
                fontSize: 18,
                fontWeight: 600,
                padding: '14px 20px',
                borderColor: '#4f46e5',
                boxShadow: 'none',
                transition: 'border-color 0.3s ease',
                color: '#1e293b',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#3730a3')}
              onBlur={(e) => (e.target.style.borderColor = '#4f46e5')}
              autoComplete="off"
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Home;