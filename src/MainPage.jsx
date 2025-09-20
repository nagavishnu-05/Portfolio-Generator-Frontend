import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Code, Award, User, Mail, Lock, Eye, EyeOff, UserPlus, LogIn, X, CheckCircle, AlertCircle, Star, ArrowRight, Play, Zap, Share2, LogOut } from 'lucide-react'

const features = [
  {
    title: 'Instant Portfolio Creation',
    description: 'Generate a professional portfolio in seconds by simply providing your details and project information.',
    icon: Zap,
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Customizable Themes',
    description: 'Choose from beautiful, modern themes to match your style and showcase your work.',
    icon: Award,
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Easy Project Management',
    description: 'Add, edit, and organize your projects with an intuitive dashboard interface.',
    icon: Code,
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Export & Share',
    description: 'Export your portfolio as a website or PDF and share it with recruiters and peers.',
    icon: Share2,
    color: 'from-orange-500 to-orange-600'
  }
]

const MainPage = () => {
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [signupError, setSignupError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if user is logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError('')
    
    // Simulate login API call
    setTimeout(() => {
      if (loginData.email && loginData.password) {
        const userData = {
          name: loginData.email.split('@')[0],
          email: loginData.email
        }
        setUser(userData)
        setIsLoggedIn(true)
        localStorage.setItem('user', JSON.stringify(userData))
        setShowLogin(false)
        setLoginData({ email: '', password: '' })
      } else {
        setLoginError('Please enter valid credentials')
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setSignupError('')
    
    // Simulate signup API call
    setTimeout(() => {
      if (signupData.name && signupData.email && signupData.password) {
        const userData = {
          name: signupData.name,
          email: signupData.email
        }
        setUser(userData)
        setIsLoggedIn(true)
        localStorage.setItem('user', JSON.stringify(userData))
        setShowSignup(false)
        setSignupData({ name: '', email: '', password: '' })
      } else {
        setSignupError('Please fill in all required fields')
      }
      setIsLoading(false)
    }, 2000)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/user-details')
    } else {
      setShowSignup(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900">
      {/* Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-blue-200 shadow-lg' 
          : 'bg-white/90 backdrop-blur-md border-b border-blue-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center group cursor-pointer">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-200">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-200">
              Portfolio Generator
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => navigate('/previous-projects')}
                  className="flex items-center text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:bg-blue-50 group"
                >
                  <User className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="group-hover:text-blue-600 transition-colors duration-200">Welcome, {user?.name}</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-600 font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setShowLogin(true)} 
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Login
                </button>
                <button 
                  onClick={() => setShowSignup(true)} 
                  className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow hover:shadow-lg transform hover:scale-105"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 relative overflow-hidden animate-slideUp">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white relative">
              <button 
                onClick={() => setShowLogin(false)} 
                className="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors duration-200 p-1 rounded-full hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <LogIn className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">Welcome Back!</h2>
              <p className="text-blue-100 text-center mt-2">Sign in to your account</p>
            </div>

            <div className="p-8">
              {loginError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-700 text-sm">{loginError}</span>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <input 
                      type="email" 
                      placeholder="Email address" 
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-400 transition-all duration-200" 
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full pl-12 pr-12 py-3 border border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-400 transition-all duration-200" 
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:from-blue-300 disabled:to-blue-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5 mr-2" />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => {
                      setShowLogin(false)
                      setShowSignup(true)
                    }}
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 relative overflow-hidden animate-slideUp">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white relative">
              <button 
                onClick={() => setShowSignup(false)} 
                className="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors duration-200 p-1 rounded-full hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <UserPlus className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">Create Account</h2>
              <p className="text-blue-100 text-center mt-2">Join us and start building your portfolio</p>
            </div>

            <div className="p-8">
              {signupError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-700 text-sm">{signupError}</span>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSignup}>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <input 
                      type="text" 
                      placeholder="Full name" 
                      value={signupData.name}
                      onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-400 transition-all duration-200" 
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <input 
                      type="email" 
                      placeholder="Email address" 
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-400 transition-all duration-200" 
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <input 
                      type={showSignupPassword ? "text" : "password"} 
                      placeholder="Create password" 
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      className="w-full pl-12 pr-12 py-3 border border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-400 transition-all duration-200" 
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors duration-200"
                    >
                      {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:from-blue-300 disabled:to-blue-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 mr-2" />
                      Create Account
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Hero / Overview */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 bg-clip-text text-transparent animate-slideUp">
              Portfolio Generator
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-300">
              Effortlessly create, customize, and share your developer portfolio. Perfect for students, professionals, and freelancers. Showcase your skills, projects, and achievements with a beautiful, interactive dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn delay-500">
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center group"
              >
                <Zap className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                Get Started
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Why Choose Portfolio Generator?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto"></div>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
              Unlock your professional potential with a portfolio that stands out. Our platform makes it easy to build, manage, and share your story.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon
              return (
                <div 
                  key={idx} 
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
                >
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-700 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}

export default MainPage
