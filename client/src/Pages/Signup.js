import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import { Form, Input, Button, Typography, Card } from 'antd'

const { Title, Text } = Typography

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupInfo({ ...signupInfo, [name]: value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const { name, email, password } = signupInfo
    if (!name || !email || !password) {
      return handleError('All fields are required')
    }
    try {
      const url = 'https://quiz-hub-1zsr.onrender.com/auth/signup'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      })
      const result = await response.json()
      const { success, message, error, jwtToken, name: userName } = result

      if (success) {
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('loggedInUser', userName || name) // Fallback to form value
        handleSuccess(message)
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      } else if (error) {
        const details = error.details?.[0]?.message || 'Signup error'
        handleError(details)
      } else {
        handleError(message)
      }
    } catch (error) {
      handleError('Network error. Please try again.')
    }
  }

  return (
    <>
      <Card
        style={{
          maxWidth: 380,
          margin: '1rem auto',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          padding: '1rem 1.5rem',
          minHeight: 320,
        }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          Join the Quiz
        </Title>
        <Form layout="vertical" onSubmitCapture={handleSignup}>
          <Form.Item
            label={<Text strong>Name</Text>}
            required
            tooltip="Your name here"
          >
            <Input
              name="name"
              placeholder="Let’s get to know you"
              value={signupInfo.name}
              onChange={handleChange}
              autoFocus
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<Text strong>Email</Text>}
            required
            tooltip="Enter a valid email address"
          >
            <Input
              type="email"
              name="email"
              placeholder="Let’s stay in touch"
              value={signupInfo.email}
              onChange={handleChange}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<Text strong>Password</Text>}
            required
            tooltip="Make it hard to guess"
          >
            <Input.Password
              name="password"
              placeholder="Shhh... it’s a secret"
              value={signupInfo.password}
              onChange={handleChange}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{ fontWeight: '600' }}
            >
              Signup
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Text>
              Already have an account? <Link to="/login">Login</Link>
            </Text>
          </Form.Item>
        </Form>
      </Card>
      <ToastContainer />
    </>
  )
}

export default Signup;
