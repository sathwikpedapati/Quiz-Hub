import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import { Form, Input, Button, Typography, Card } from 'antd'

const { Title, Text } = Typography

const Login = () => {
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    const copyLoginInfo = { ...LoginInfo }
    copyLoginInfo[name] = value
    setLoginInfo(copyLoginInfo)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = LoginInfo
    if (!email || !password) {
      return handleError('All fields are required ')
    }
    try {
      const url = 'http://localhost:8080/auth/login'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(LoginInfo),
      })
      const result = await response.json()
      const { success, message, error, jwtToken, name } = result
      if (success) {
        handleSuccess(message)
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('loggedInUser', name)
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      } else if (error) {
        const details = error.details[0].message
        handleError(details)
      } else if (!success) {
        handleError(message)
      }
    } catch (error) {
      handleError(error)
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
  minHeight: 320, // smaller minimum height if needed
  }}
>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
        Sign In
        </Title>
        <Form layout="vertical" onSubmitCapture={handleLogin}>
          <Form.Item
            label={<Text strong>Email</Text>}
            required
            tooltip="your.email@example.com"
          >
            <Input
              type="email"
              name="email"
              placeholder="Let’s stay in touch"
              value={LoginInfo.email}
              onChange={handleChange}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<Text strong>Password</Text>}
            required
            tooltip="Enter your password"
          >
            <Input.Password
              name="password"
              placeholder="Shhh... it’s a secret"
              value={LoginInfo.password}
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
              Login
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Text>
              Create an Account? <Link to="/signup">SignUp</Link>
            </Text>
          </Form.Item>
        </Form>
      </Card>
      <ToastContainer />
    </>
  )
}

export default Login
