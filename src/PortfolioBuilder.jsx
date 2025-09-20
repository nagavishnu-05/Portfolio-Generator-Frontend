import React, { useState, useEffect } from 'react'
import { ArrowLeft, Download, Share2, Eye, Code, User, Mail, Phone, MapPin, GraduationCap, Award, ExternalLink, Github, Linkedin, Twitter, Globe, ChevronLeft, ChevronRight, Palette, Layout, Save, FileText, Folder, Sparkles, Brain, Zap, Target, TrendingUp, Lightbulb, Wand2 } from 'lucide-react'

const PortfolioBuilder = () => {
  const [userData, setUserData] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [selectedTheme, setSelectedTheme] = useState('default')
  const [selectedLayout, setSelectedLayout] = useState('grid')
  const [currentSection, setCurrentSection] = useState('preview')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showLivePreview, setShowLivePreview] = useState(true)
  
  // AI Features
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [isAiGenerating, setIsAiGenerating] = useState(false)

  const templates = [
    { id: 'modern', name: 'Modern', preview: '/api/placeholder/300/200' },
    { id: 'classic', name: 'Classic', preview: '/api/placeholder/300/200' },
    { id: 'creative', name: 'Creative', preview: '/api/placeholder/300/200' },
    { id: 'minimal', name: 'Minimal', preview: '/api/placeholder/300/200' }
  ]

  const themes = [
    { id: 'default', name: 'Default', color: '#667eea', description: 'Professional blue gradient' },
    { id: 'dark', name: 'Dark', color: '#2d3748', description: 'Modern dark theme' },
    { id: 'green', name: 'Nature', color: '#38a169', description: 'Fresh green theme' },
    { id: 'purple', name: 'Royal', color: '#805ad5', description: 'Elegant purple theme' },
    { id: 'orange', name: 'Sunset', color: '#ed8936', description: 'Warm orange theme' },
    { id: 'pink', name: 'Rose', color: '#e53e3e', description: 'Vibrant pink theme' }
  ]

  const layouts = [
    { id: 'grid', name: 'Grid Layout', description: 'Card-based grid design' },
    { id: 'timeline', name: 'Timeline', description: 'Chronological timeline view' },
    { id: 'sidebar', name: 'Sidebar', description: 'Sidebar navigation layout' },
    { id: 'fullwidth', name: 'Full Width', description: 'Full-width single column' }
  ]

  const sections = [
    { id: 'preview', name: 'Preview', icon: Eye },
    { id: 'customize', name: 'Customize', icon: Palette },
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'ai', name: 'AI Assistant', icon: Brain } // AI Assistant is ONLY for the builder interface, NOT included in final HTML
  ]

  // AI-Powered Functions
  // TODO: Integrate with real AI APIs like OpenAI GPT-4, Claude, or Gemini
  // Example: const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ model: 'gpt-4', messages: [{ role: 'user', content: prompt }] })
  // })
  const generateAIContent = async (type) => {
    setIsAiGenerating(true)
    
    try {
      // Simulate AI API call - Replace with real AI integration
      const suggestions = await simulateAIGeneration(type)
      setAiSuggestions(suggestions)
    } catch (error) {
      console.error('AI generation failed:', error)
    } finally {
      setIsAiGenerating(false)
    }
  }

  const simulateAIGeneration = async (type) => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const suggestions = {
      bio: [
        "Passionate developer with 3+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies.",
        "Innovative software engineer with a strong background in machine learning and data science, committed to solving complex problems.",
        "Creative frontend developer with expertise in modern JavaScript frameworks and user experience design."
      ],
      projects: [
        {
          name: "E-commerce Platform",
          description: "Full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database. Features include user authentication, payment processing, and admin dashboard.",
          technologies: "React, Node.js, MongoDB, Stripe API"
        },
        {
          name: "Task Management App",
          description: "Collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.",
          technologies: "Vue.js, Express.js, Socket.io, PostgreSQL"
        }
      ],
      skills: [
        "JavaScript, TypeScript, Python, Java",
        "React, Vue.js, Angular, Node.js",
        "AWS, Docker, Kubernetes, CI/CD",
        "Machine Learning, Data Analysis, SQL"
      ]
    }
    
    return suggestions[type] || []
  }

  const getAIOptimizations = () => {
    const optimizations = []
    
    if (userData) {
      // Check for missing sections
      if (!userData.personalInfo?.bio || userData.personalInfo.bio.length < 50) {
        optimizations.push({
          type: 'warning',
          title: 'Enhance Bio Section',
          description: 'Your bio is too short. Add more details about your experience and skills.',
          action: 'Generate AI Bio'
        })
      }
      
      if (!userData.projects || userData.projects.length === 0) {
        optimizations.push({
          type: 'error',
          title: 'Add Projects',
          description: 'No projects found. Add at least 2-3 projects to showcase your work.',
          action: 'Generate Project Ideas'
        })
      }
      
      if (!userData.education || userData.education.length === 0) {
        optimizations.push({
          type: 'info',
          title: 'Add Education',
          description: 'Consider adding your educational background to build credibility.',
          action: 'Add Education'
        })
      }
      
      // Theme recommendations based on profession
      const profession = userData.personalInfo?.title?.toLowerCase() || ''
      if (profession.includes('designer') || profession.includes('creative')) {
        optimizations.push({
          type: 'suggestion',
          title: 'Theme Recommendation',
          description: 'Creative professionals often benefit from vibrant themes like Rose or Sunset.',
          action: 'Apply Creative Theme'
        })
      } else if (profession.includes('developer') || profession.includes('engineer')) {
        optimizations.push({
          type: 'suggestion',
          title: 'Theme Recommendation',
          description: 'Tech professionals typically prefer clean themes like Default or Dark.',
          action: 'Apply Tech Theme'
        })
      }
    }
    
    return optimizations
  }

  const applyAISuggestion = async (suggestion) => {
    if (suggestion.action === 'Generate AI Bio') {
      await generateAIContent('bio', userData.personalInfo)
      // Apply the first bio suggestion directly to the form
      if (aiSuggestions.bio && aiSuggestions.bio.length > 0) {
        setUserData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            bio: aiSuggestions.bio[0]
          }
        }))
      }
    } else if (suggestion.action === 'Generate Project Ideas') {
      await generateAIContent('projects', userData)
      // Apply the first project suggestion directly to the form
      if (aiSuggestions.projects && aiSuggestions.projects.length > 0) {
        const newProject = aiSuggestions.projects[0]
        setUserData(prev => ({
          ...prev,
          projects: [...(prev.projects || []), newProject]
        }))
      }
    } else if (suggestion.action === 'Apply Creative Theme') {
      setSelectedTheme('pink')
    } else if (suggestion.action === 'Apply Tech Theme') {
      setSelectedTheme('dark')
    } else if (suggestion.action === 'Add Education') {
      // Add a sample education entry
      const sampleEducation = {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        graduationYear: '2023',
        gpa: '3.8'
      }
      setUserData(prev => ({
        ...prev,
        education: [...(prev.education || []), sampleEducation]
      }))
    }
  }

  // Function to apply AI-generated content directly to form
  const applyAIContent = (type, content) => {
    let updatedData
    if (type === 'bio') {
      updatedData = {
        ...userData,
        personalInfo: {
          ...userData.personalInfo,
          bio: content
        }
      }
    } else if (type === 'project') {
      updatedData = {
        ...userData,
        projects: [...(userData.projects || []), content]
      }
    } else if (type === 'skill') {
      updatedData = {
        ...userData,
        skills: [...(userData.skills || []), content]
      }
    }
    
    if (updatedData) {
      setUserData(updatedData)
      // Save to localStorage
      localStorage.setItem('portfolioData', JSON.stringify(updatedData))
    }
  }

  useEffect(() => {
    // Load user data from localStorage
    const savedData = localStorage.getItem('portfolioData')
    if (savedData) {
      try {
        setUserData(JSON.parse(savedData))
      } catch (error) {
        console.error('Error loading portfolio data:', error)
      }
    }
  }, [])

  const handleGeneratePortfolio = async () => {
    setIsGenerating(true)
    
    // Simulate portfolio generation
    setTimeout(() => {
      setIsGenerating(false)
      // Here you would typically call your backend API to generate the portfolio
      console.log('Portfolio generated with template:', selectedTemplate)
    }, 3000)
  }

  // Helper function to adjust color brightness
  const adjustColor = (color, amount) => {
    const usePound = color[0] === '#'
    const col = usePound ? color.slice(1) : color
    const num = parseInt(col, 16)
    let r = (num >> 16) + amount
    let g = (num >> 8 & 0x00FF) + amount
    let b = (num & 0x0000FF) + amount
    r = r > 255 ? 255 : r < 0 ? 0 : r
    g = g > 255 ? 255 : g < 0 ? 0 : g
    b = b > 255 ? 255 : b < 0 ? 0 : b
    return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0')
  }

  // Layout generation functions
  const generateGridLayout = (name, title, location, bio, email, phone) => {
    return `
    <div class="container-fluid py-4">
        <!-- Header Section -->
        <div class="row justify-content-center mb-5">
            <div class="col-lg-8">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-body text-center py-5">
                        <div class="mb-4">
                            <div class="bg-primary-custom rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 120px; height: 120px;">
                                <i class="fas fa-user text-white" style="font-size: 3rem;"></i>
                            </div>
                        </div>
                        <h1 class="display-4 fw-bold text-primary-custom mb-3">${name}</h1>
                        <h2 class="h4 text-muted mb-3">${title}</h2>
                        <p class="text-muted mb-4"><i class="fas fa-map-marker-alt me-2"></i>${location}</p>
                        <div class="d-flex justify-content-center gap-3">
                            ${email ? `<a href="mailto:${email}" class="btn btn-outline-primary-custom rounded-pill"><i class="fas fa-envelope me-2"></i>Email</a>` : ''}
                            ${phone ? `<a href="tel:${phone}" class="btn btn-outline-primary-custom rounded-pill"><i class="fas fa-phone me-2"></i>Call</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- About Section -->
        <div class="row justify-content-center mb-5">
            <div class="col-lg-8">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-body p-5">
                        <h3 class="h2 fw-bold text-primary-custom mb-4"><i class="fas fa-user me-3"></i>About Me</h3>
                        <p class="lead">${bio}</p>
                    </div>
                </div>
            </div>
        </div>

        ${userData.education && userData.education.length > 0 ? `
        <!-- Education Section -->
        <div class="row justify-content-center mb-5">
            <div class="col-lg-8">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-body p-5">
                        <h3 class="h2 fw-bold text-primary-custom mb-4"><i class="fas fa-graduation-cap me-3"></i>Education</h3>
                        <div class="row g-4">
                            ${userData.education.map(edu => `
                                <div class="col-md-6">
                                    <div class="card h-100 border-0 shadow-sm">
                                        <div class="card-body">
                                            <h5 class="card-title fw-bold">${edu.degree}</h5>
                                            <h6 class="card-subtitle text-muted mb-2">${edu.institution}</h6>
                                            ${edu.graduationYear ? `<small class="text-muted">${edu.graduationYear}</small>` : ''}
                                            ${edu.gpa ? `<div class="mt-2"><span class="badge bg-primary-custom">GPA: ${edu.gpa}</span></div>` : ''}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        ${userData.projects && userData.projects.length > 0 ? `
        <!-- Projects Section -->
        <div class="row justify-content-center mb-5">
            <div class="col-lg-10">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-body p-5">
                        <h3 class="h2 fw-bold text-primary-custom mb-4"><i class="fas fa-code me-3"></i>Projects</h3>
                        <div class="row g-4">
                            ${userData.projects.map(project => `
                                <div class="col-lg-6">
                                    <div class="card h-100 border-0 shadow-sm">
                                        <div class="card-body">
                                            <h5 class="card-title fw-bold">${project.name}</h5>
                                            <p class="card-text">${project.description}</p>
                                            ${project.technologies ? `
                                                <div class="mb-3">
                                                    ${project.technologies.split(',').map(tech => `<span class="badge bg-primary-custom me-1">${tech.trim()}</span>`).join('')}
                                                </div>
                                            ` : ''}
                                            <div class="d-flex gap-2">
                                                ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline-primary-custom btn-sm"><i class="fab fa-github me-1"></i>GitHub</a>` : ''}
                                                ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary-custom btn-sm"><i class="fas fa-external-link-alt me-1"></i>Live Demo</a>` : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        ${userData.certifications && userData.certifications.length > 0 ? `
        <!-- Certifications Section -->
        <div class="row justify-content-center mb-5">
            <div class="col-lg-8">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-body p-5">
                        <h3 class="h2 fw-bold text-primary-custom mb-4"><i class="fas fa-certificate me-3"></i>Certifications</h3>
                        <div class="row g-3">
                            ${userData.certifications.map(cert => `
                                <div class="col-md-6">
                                    <div class="card border-0 shadow-sm">
                                        <div class="card-body">
                                            <h6 class="card-title fw-bold">${cert.name}</h6>
                                            <p class="card-text text-muted">${cert.issuer}</p>
                                            ${cert.date ? `<small class="text-muted">${cert.date}</small>` : ''}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}
    </div>
    `
  }

  const generateTimelineLayout = (name, title, location, bio, email, phone) => {
    return `
    <div class="container py-5">
        <!-- Header -->
        <div class="row justify-content-center mb-5">
            <div class="col-lg-8 text-center">
                <div class="bg-primary-custom rounded-4 p-5 text-white">
                    <div class="mb-4">
                        <div class="bg-white bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 120px; height: 120px;">
                            <i class="fas fa-user text-white" style="font-size: 3rem;"></i>
                        </div>
                    </div>
                    <h1 class="display-4 fw-bold mb-3">${name}</h1>
                    <h2 class="h4 mb-3">${title}</h2>
                    <p class="mb-4"><i class="fas fa-map-marker-alt me-2"></i>${location}</p>
                    <div class="d-flex justify-content-center gap-3">
                        ${email ? `<a href="mailto:${email}" class="btn btn-light btn-sm rounded-pill"><i class="fas fa-envelope me-2"></i>Email</a>` : ''}
                        ${phone ? `<a href="tel:${phone}" class="btn btn-light btn-sm rounded-pill"><i class="fas fa-phone me-2"></i>Call</a>` : ''}
                    </div>
                </div>
            </div>
        </div>

        <!-- Timeline -->
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="timeline">
                    <!-- About -->
                    <div class="timeline-item">
                        <div class="timeline-marker bg-primary-custom"></div>
                        <div class="timeline-content">
                            <div class="card shadow-lg border-0">
                                <div class="card-body p-4">
                                    <h4 class="fw-bold text-primary-custom"><i class="fas fa-user me-2"></i>About Me</h4>
                                    <p class="mb-0">${bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    ${userData.education && userData.education.length > 0 ? userData.education.map(edu => `
                        <div class="timeline-item">
                            <div class="timeline-marker bg-primary-custom"></div>
                            <div class="timeline-content">
                                <div class="card shadow-lg border-0">
                                    <div class="card-body p-4">
                                        <h5 class="fw-bold text-primary-custom"><i class="fas fa-graduation-cap me-2"></i>${edu.degree}</h5>
                                        <h6 class="text-muted">${edu.institution}</h6>
                                        ${edu.graduationYear ? `<small class="text-muted">${edu.graduationYear}</small>` : ''}
                                        ${edu.gpa ? `<div class="mt-2"><span class="badge bg-primary-custom">GPA: ${edu.gpa}</span></div>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('') : ''}

                    ${userData.projects && userData.projects.length > 0 ? userData.projects.map(project => `
                        <div class="timeline-item">
                            <div class="timeline-marker bg-primary-custom"></div>
                            <div class="timeline-content">
                                <div class="card shadow-lg border-0">
                                    <div class="card-body p-4">
                                        <h5 class="fw-bold text-primary-custom"><i class="fas fa-code me-2"></i>${project.name}</h5>
                                        <p class="mb-3">${project.description}</p>
                                        ${project.technologies ? `
                                            <div class="mb-3">
                                                ${project.technologies.split(',').map(tech => `<span class="badge bg-primary-custom me-1">${tech.trim()}</span>`).join('')}
                                            </div>
                                        ` : ''}
                                        <div class="d-flex gap-2">
                                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline-primary-custom btn-sm"><i class="fab fa-github me-1"></i>GitHub</a>` : ''}
                                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary-custom btn-sm"><i class="fas fa-external-link-alt me-1"></i>Live Demo</a>` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('') : ''}
                </div>
            </div>
        </div>
    </div>
    `
  }

  const generateSidebarLayout = (name, title, location, bio, email, phone) => {
    return `
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-lg-4 bg-primary-custom text-white p-5" style="min-height: 100vh;">
                <div class="text-center mb-5">
                    <div class="bg-white bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style="width: 120px; height: 120px;">
                        <i class="fas fa-user text-white" style="font-size: 3rem;"></i>
                    </div>
                    <h1 class="h2 fw-bold mb-2">${name}</h1>
                    <h2 class="h5 mb-3">${title}</h2>
                    <p class="mb-4"><i class="fas fa-map-marker-alt me-2"></i>${location}</p>
                </div>
                
                <div class="mb-4">
                    <h4 class="fw-bold mb-3"><i class="fas fa-user me-2"></i>About</h4>
                    <p>${bio}</p>
                </div>

                <div class="mb-4">
                    <h4 class="fw-bold mb-3"><i class="fas fa-envelope me-2"></i>Contact</h4>
                    <div class="d-flex flex-column gap-2">
                        ${email ? `<a href="mailto:${email}" class="btn btn-light btn-sm"><i class="fas fa-envelope me-2"></i>${email}</a>` : ''}
                        ${phone ? `<a href="tel:${phone}" class="btn btn-light btn-sm"><i class="fas fa-phone me-2"></i>${phone}</a>` : ''}
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="col-lg-8 p-5">
                ${userData.education && userData.education.length > 0 ? `
                <div class="mb-5">
                    <h3 class="h2 fw-bold text-primary-custom mb-4"><i class="fas fa-graduation-cap me-3"></i>Education</h3>
                    <div class="row g-4">
                        ${userData.education.map(edu => `
                            <div class="col-md-6">
                                <div class="card shadow-lg border-0">
                                    <div class="card-body">
                                        <h5 class="card-title fw-bold">${edu.degree}</h5>
                                        <h6 class="card-subtitle text-muted">${edu.institution}</h6>
                                        ${edu.graduationYear ? `<small class="text-muted">${edu.graduationYear}</small>` : ''}
                                        ${edu.gpa ? `<div class="mt-2"><span class="badge bg-primary-custom">GPA: ${edu.gpa}</span></div>` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${userData.projects && userData.projects.length > 0 ? `
                <div class="mb-5">
                    <h3 class="h2 fw-bold text-primary-custom mb-4"><i class="fas fa-code me-3"></i>Projects</h3>
                    <div class="row g-4">
                        ${userData.projects.map(project => `
                            <div class="col-md-6">
                                <div class="card shadow-lg border-0">
                                    <div class="card-body">
                                        <h5 class="card-title fw-bold">${project.name}</h5>
                                        <p class="card-text">${project.description}</p>
                                        ${project.technologies ? `
                                            <div class="mb-3">
                                                ${project.technologies.split(',').map(tech => `<span class="badge bg-primary-custom me-1">${tech.trim()}</span>`).join('')}
                                            </div>
                                        ` : ''}
                                        <div class="d-flex gap-2">
                                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline-primary-custom btn-sm"><i class="fab fa-github me-1"></i>GitHub</a>` : ''}
                                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary-custom btn-sm"><i class="fas fa-external-link-alt me-1"></i>Live Demo</a>` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    </div>
    `
  }

  const generateFullWidthLayout = (name, title, location, bio, email, phone) => {
    return `
    <div class="container-fluid">
        <!-- Hero Section -->
        <div class="bg-primary-custom text-white py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <h1 class="display-3 fw-bold mb-3">${name}</h1>
                        <h2 class="h3 mb-3">${title}</h2>
                        <p class="lead mb-4"><i class="fas fa-map-marker-alt me-2"></i>${location}</p>
                        <div class="d-flex gap-3">
                            ${email ? `<a href="mailto:${email}" class="btn btn-light btn-lg"><i class="fas fa-envelope me-2"></i>Email</a>` : ''}
                            ${phone ? `<a href="tel:${phone}" class="btn btn-outline-light btn-lg"><i class="fas fa-phone me-2"></i>Call</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- About Section -->
        <div class="py-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <h3 class="h2 fw-bold text-primary-custom mb-4"><i class="fas fa-user me-3"></i>About Me</h3>
                        <p class="lead">${bio}</p>
                    </div>
                </div>
            </div>
        </div>

        ${userData.education && userData.education.length > 0 ? `
        <div class="py-5 bg-light">
            <div class="container">
                <h3 class="h2 fw-bold text-primary-custom mb-5 text-center"><i class="fas fa-graduation-cap me-3"></i>Education</h3>
                <div class="row g-4">
                    ${userData.education.map(edu => `
                        <div class="col-lg-4">
                            <div class="card shadow-lg border-0 h-100">
                                <div class="card-body p-4">
                                    <h5 class="card-title fw-bold">${edu.degree}</h5>
                                    <h6 class="card-subtitle text-muted">${edu.institution}</h6>
                                    ${edu.graduationYear ? `<small class="text-muted">${edu.graduationYear}</small>` : ''}
                                    ${edu.gpa ? `<div class="mt-2"><span class="badge bg-primary-custom">GPA: ${edu.gpa}</span></div>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        ` : ''}

        ${userData.projects && userData.projects.length > 0 ? `
        <div class="py-5">
            <div class="container">
                <h3 class="h2 fw-bold text-primary-custom mb-5 text-center"><i class="fas fa-code me-3"></i>Projects</h3>
                <div class="row g-4">
                    ${userData.projects.map(project => `
                        <div class="col-lg-6">
                            <div class="card shadow-lg border-0 h-100">
                                <div class="card-body p-4">
                                    <h5 class="card-title fw-bold">${project.name}</h5>
                                    <p class="card-text">${project.description}</p>
                                    ${project.technologies ? `
                                        <div class="mb-3">
                                            ${project.technologies.split(',').map(tech => `<span class="badge bg-primary-custom me-1">${tech.trim()}</span>`).join('')}
                                        </div>
                                    ` : ''}
                                    <div class="d-flex gap-2">
                                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline-primary-custom"><i class="fab fa-github me-1"></i>GitHub</a>` : ''}
                                        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary-custom"><i class="fas fa-external-link-alt me-1"></i>Live Demo</a>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        ` : ''}
    </div>
    `
  }

  const generateHTML = () => {
    // NOTE: This generates the final portfolio HTML - AI Assistant is NOT included
    // AI Assistant is only for the builder interface to help users create content
    
    const name = userData.personalInfo?.fullName || 'Your Name'
    const title = userData.personalInfo?.title || 'Your Title'
    const location = userData.personalInfo?.location || 'Your Location'
    const bio = userData.personalInfo?.bio || 'Tell us about yourself, your passion, and what drives you...'
    const email = userData.personalInfo?.email || ''
    const phone = userData.personalInfo?.phone || ''

    // Get theme colors
    const selectedThemeData = themes.find(t => t.id === selectedTheme)
    const primaryColor = selectedThemeData?.color || '#667eea'

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Portfolio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: ${primaryColor};
            --primary-gradient: linear-gradient(135deg, ${primaryColor}, ${adjustColor(primaryColor, -20)});
        }
        body { font-family: 'Inter', sans-serif; }
        .bg-primary-custom { background: var(--primary-gradient) !important; }
        .text-primary-custom { color: var(--primary-color) !important; }
        .border-primary-custom { border-color: var(--primary-color) !important; }
        .btn-primary-custom { 
            background: var(--primary-gradient) !important; 
            border: none !important;
        }
        .btn-primary-custom:hover { 
            background: linear-gradient(135deg, ${adjustColor(primaryColor, -10)}, ${adjustColor(primaryColor, -30)}) !important; 
        }
    </style>
</head>
<body class="bg-light">
    ${selectedLayout === 'sidebar' ? generateSidebarLayout(name, title, location, bio, email, phone) : ''}
    ${selectedLayout === 'timeline' ? generateTimelineLayout(name, title, location, bio, email, phone) : ''}
    ${selectedLayout === 'fullwidth' ? generateFullWidthLayout(name, title, location, bio, email, phone) : ''}
    ${selectedLayout === 'grid' ? generateGridLayout(name, title, location, bio, email, phone) : ''}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>
</html>`
  }

  const generateCSS = () => {
    return `
/* Custom Bootstrap Theme Styles */
:root {
    --primary-color: ${themes.find(t => t.id === selectedTheme)?.color || '#667eea'};
    --primary-gradient: linear-gradient(135deg, var(--primary-color), ${adjustColor(themes.find(t => t.id === selectedTheme)?.color || '#667eea', -20)});
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
}

.bg-primary-custom {
    background: var(--primary-gradient) !important;
}

.text-primary-custom {
    color: var(--primary-color) !important;
}

.border-primary-custom {
    border-color: var(--primary-color) !important;
}

.btn-primary-custom {
    background: var(--primary-gradient) !important;
    border: none !important;
    color: white !important;
}

.btn-primary-custom:hover {
    background: linear-gradient(135deg, ${adjustColor(themes.find(t => t.id === selectedTheme)?.color || '#667eea', -10)}, ${adjustColor(themes.find(t => t.id === selectedTheme)?.color || '#667eea', -30)}) !important;
    color: white !important;
}

.btn-outline-primary-custom {
    border-color: var(--primary-color) !important;
    color: var(--primary-color) !important;
}

.btn-outline-primary-custom:hover {
    background: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

/* Timeline Styles */
.timeline {
    position: relative;
    padding: 2rem 0;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--primary-color);
    transform: translateX(-50%);
}

.timeline-item {
    position: relative;
    margin-bottom: 3rem;
    width: 50%;
}

.timeline-item:nth-child(odd) {
    left: 0;
    padding-right: 2rem;
}

.timeline-item:nth-child(even) {
    left: 50%;
    padding-left: 2rem;
}

.timeline-marker {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 0;
    z-index: 2;
}

.timeline-item:nth-child(odd) .timeline-marker {
    right: -10px;
}

.timeline-item:nth-child(even) .timeline-marker {
    left: -10px;
}

.timeline-content {
    position: relative;
}

/* Card Hover Effects */
.card {
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

/* Badge Styles */
.badge {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
}

/* Button Styles */
.btn {
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
}

/* Responsive Timeline */
@media (max-width: 768px) {
    .timeline::before {
        left: 20px;
    }
    
    .timeline-item {
        width: 100%;
        left: 0 !important;
        padding-left: 3rem !important;
        padding-right: 0 !important;
    }
    
    .timeline-marker {
        left: 10px !important;
        right: auto !important;
    }
}

/* Animation Classes */
.fade-in {
    animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Global Styles for All Sections */
.container, .container-fluid {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.container-fluid {
    max-width: 100%;
}

/* Header Styles */
.header, .bg-primary-custom {
    background: var(--primary-gradient) !important;
    color: white !important;
}

/* Card Styles */
.card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: none;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Button Styles */
.btn {
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
}

/* Badge Styles */
.badge {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    border-radius: 20px;
}

/* Section Spacing */
section, .py-5, .mb-5 {
    margin-bottom: 3rem;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    color: #2d3748;
    font-weight: 600;
}

.display-3, .display-4 {
    font-weight: 700;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container, .container-fluid {
        padding: 15px;
    }
    
    .card {
        margin-bottom: 1rem;
    }
    
    .display-3 {
        font-size: 2.5rem;
    }
    
    .display-4 {
        font-size: 2rem;
    }
}

/* Section-specific Styles */
.about, .education, .projects, .certifications, .contact {
    background: white;
    border-radius: 20px;
    padding: 40px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.about:hover, .education:hover, .projects:hover, .certifications:hover, .contact:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.about h2, .education h2, .projects h2, .certifications h2, .contact h2 {
    font-size: 2rem;
    color: #2d3748;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 600;
}

.about h2 i, .education h2 i, .projects h2 i, .certifications h2 i, .contact h2 i {
    color: var(--primary-color);
    font-size: 1.5rem;
}

.about p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #4a5568;
}

/* Education List Styles */
.education-list, .certifications-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.education-item, .certification-item {
    background: linear-gradient(135deg, #f7fafc, #edf2f7);
    padding: 25px;
    border-radius: 15px;
    border-left: 4px solid var(--primary-color);
    transition: all 0.3s ease;
}

.education-item:hover, .certification-item:hover {
    transform: translateX(5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.education-item h3, .certification-item h3 {
    font-size: 1.3rem;
    color: #2d3748;
    margin-bottom: 8px;
    font-weight: 600;
}

.institution, .issuer {
    color: #4a5568;
    font-size: 1.1rem;
    margin-bottom: 5px;
}

.year, .date {
    color: #718096;
    font-size: 0.9rem;
}

.gpa {
    color: var(--primary-color);
    font-weight: 500;
    font-size: 0.9rem;
}

/* Projects Grid Styles */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
}

.project-card {
    background: linear-gradient(135deg, #f7fafc, #edf2f7);
    padding: 30px;
    border-radius: 15px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--primary-gradient);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.project-card h3 {
    font-size: 1.4rem;
    color: #2d3748;
    margin-bottom: 15px;
    font-weight: 600;
}

.project-description {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 20px;
    font-size: 1rem;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}

.tech-tag {
    background: var(--primary-gradient);
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.project-links {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: var(--primary-gradient);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 500;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.project-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    color: white;
}

/* Contact Links Styles */
.contact-links {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.contact-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 15px 25px;
    background: linear-gradient(135deg, #f7fafc, #edf2f7);
    color: #4a5568;
    text-decoration: none;
    border-radius: 15px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
}

.contact-link:hover {
    background: var(--primary-gradient);
    color: white;
    transform: translateX(5px);
}

.contact-link i {
    font-size: 1.2rem;
    color: var(--primary-color);
}

.contact-link:hover i {
    color: white;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: ${adjustColor(themes.find(t => t.id === selectedTheme)?.color || '#667eea', -20)};
}`
  }

  const generateJS = () => {
    return `// Portfolio Interactive Features with Bootstrap
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to social links
    const socialLinks = document.querySelectorAll('.social-link, .project-link, .contact-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add typing animation to name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const name = nameElement.textContent;
        nameElement.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < name.length) {
                nameElement.textContent += name.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 500);
    }

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add parallax effect to header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
        }
    });

    // Add loading animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = \`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    \`;
    
    const loadingSpinner = document.createElement('div');
    loadingSpinner.style.cssText = \`
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    \`;
    
    const spinKeyframes = \`
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    \`;
    
    const style = document.createElement('style');
    style.textContent = spinKeyframes;
    document.head.appendChild(style);
    
    loadingOverlay.appendChild(loadingSpinner);
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loadingOverlay);
            }, 500);
        }, 1000);
    });
});`
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      // Import JSZip dynamically
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()
      
      // Generate content
      const htmlContent = generateHTML()
      const cssContent = generateCSS()
      const jsContent = generateJS()
      
      // Add files to ZIP
      zip.file('index.html', htmlContent)
      zip.file('styles.css', cssContent)
      zip.file('script.js', jsContent)
      
      // Add a README file
      const readmeContent = `# Portfolio Website

This is your generated portfolio website.

## Files included:
- index.html - Main HTML file
- styles.css - CSS styles
- script.js - JavaScript functionality

## How to use:
1. Extract all files to a folder
2. Open index.html in your web browser
3. Your portfolio is ready to view!

## Features:
- Responsive design
- Interactive animations
- Modern gradient design
- Mobile-friendly
- Professional layout

Generated by Portfolio Generator
`
      zip.file('README.md', readmeContent)
      
      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${userData.personalInfo?.fullName?.replace(/\s+/g, '_') || 'portfolio'}_website.zip`
      a.click()
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    }
    
    setIsDownloading(false)
  }

  const handleShare = () => {
    // Simulate sharing
    console.log('Sharing portfolio...')
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Header */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-lg mr-3">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Portfolio Builder
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Portfolio
                  </>
                )}
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Navigation */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Builder</h3>
                <div className="space-y-2">
                  {sections.map((section) => {
                    const IconComponent = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => setCurrentSection(section.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                          currentSection === section.id
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="h-5 w-5 mr-3" />
                        {section.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Templates */}
              {currentSection === 'customize' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Templates</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedTemplate === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-full h-20 bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <Layout className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">{template.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Themes */}
              {currentSection === 'customize' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Themes</h3>
                  <div className="space-y-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                          selectedTheme === theme.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.color }}
                          ></div>
                          <div>
                            <p className="font-medium text-gray-800">{theme.name}</p>
                            <p className="text-xs text-gray-500">{theme.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Assistant Panel */}
              {currentSection === 'ai' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-500" />
                    AI Assistant
                  </h3>
                  
                  {/* AI Optimizations */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Portfolio Analysis</h4>
                    <div className="space-y-2">
                      {getAIOptimizations().map((optimization, index) => (
                        <div key={index} className={`p-3 rounded-lg border-l-4 ${
                          optimization.type === 'error' ? 'border-red-500 bg-red-50' :
                          optimization.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                          optimization.type === 'info' ? 'border-blue-500 bg-blue-50' :
                          'border-green-500 bg-green-50'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="text-sm font-medium text-gray-800">{optimization.title}</h5>
                              <p className="text-xs text-gray-600 mt-1">{optimization.description}</p>
                            </div>
                            <button
                              onClick={() => applyAISuggestion(optimization)}
                              className="ml-2 text-xs bg-white px-2 py-1 rounded border hover:bg-gray-50 transition-colors"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Content Generation */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">AI Content Generation</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => generateAIContent('bio')}
                        disabled={isAiGenerating}
                        className="w-full flex items-center justify-between p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-sm"
                      >
                        <span className="flex items-center">
                          <Wand2 className="h-4 w-4 mr-2 text-purple-500" />
                          Generate Bio
                        </span>
                        {isAiGenerating && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>}
                      </button>
                      
                      <button
                        onClick={() => generateAIContent('projects')}
                        disabled={isAiGenerating}
                        className="w-full flex items-center justify-between p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-sm"
                      >
                        <span className="flex items-center">
                          <Code className="h-4 w-4 mr-2 text-purple-500" />
                          Generate Projects
                        </span>
                        {isAiGenerating && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>}
                      </button>
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  {aiSuggestions.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">AI Suggestions</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="p-2 bg-gray-50 rounded-lg text-xs">
                            {typeof suggestion === 'string' ? suggestion : suggestion.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGeneratePortfolio}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:from-blue-300 disabled:to-blue-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Generate Portfolio
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentSection === 'preview' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Live Portfolio Preview</h2>
                    <p className="text-gray-600 mt-1">
                      Theme: <span className="font-semibold text-blue-600">{themes.find(t => t.id === selectedTheme)?.name}</span> | 
                      Layout: <span className="font-semibold text-blue-600">{layouts.find(l => l.id === selectedLayout)?.name}</span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowLivePreview(!showLivePreview)}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {showLivePreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-colors duration-200"
                    >
                      {isDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Downloading...
                        </>
                      ) : (
                        <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Portfolio
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {showLivePreview && (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Browser Header */}
                    <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600 ml-4">
                        {userData.personalInfo?.fullName || 'Your Name'} - Portfolio
                      </div>
                    </div>
                    
                    {/* Live Website Preview */}
                    <div className="bg-white">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-white">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="h-12 w-12" />
                          </div>
                          <h1 className="text-3xl font-bold mb-2">{userData.personalInfo?.fullName || 'Your Name'}</h1>
                          <p className="text-blue-100 text-lg">{userData.personalInfo?.title || 'Your Title'}</p>
                          <p className="text-blue-200 mt-2">{userData.personalInfo?.location || 'Your Location'}</p>
                        </div>
                      </div>

                      <div className="p-8">
                        {/* About Section */}
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
                          <p className="text-gray-600 leading-relaxed">
                            {userData.personalInfo?.bio || 'Tell us about yourself, your passion, and what drives you...'}
                          </p>
                        </div>

                        {/* Education Section */}
                        {userData.education && userData.education.length > 0 && (
                          <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                              <GraduationCap className="h-6 w-6 mr-2 text-blue-500" />
                              Education
                            </h2>
                            <div className="space-y-4">
                              {userData.education.map((edu, index) => (
                                <div key={index} className="border-l-4 border-blue-500 pl-4 bg-gray-50 p-4 rounded-r-lg">
                                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                                  <p className="text-gray-600">{edu.institution}</p>
                                  {edu.graduationYear && <p className="text-sm text-gray-500">{edu.graduationYear}</p>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Projects Section */}
                        {userData.projects && userData.projects.length > 0 && (
                          <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                              <Code className="h-6 w-6 mr-2 text-blue-500" />
                              Projects
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                              {userData.projects.map((project, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                                  <h3 className="font-semibold text-gray-800 mb-2">{project.name}</h3>
                                  <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                                  {project.technologies && (
                                    <p className="text-sm text-blue-600 mb-3 font-medium">{project.technologies}</p>
                                  )}
                                  <div className="flex space-x-2">
                                    {project.githubUrl && (
                                      <a href={project.githubUrl} className="text-blue-500 hover:text-blue-700 flex items-center">
                                        <Github className="h-4 w-4 mr-1" />
                                        GitHub
                                      </a>
                                    )}
                                    {project.liveUrl && (
                                      <a href={project.liveUrl} className="text-blue-500 hover:text-blue-700 flex items-center">
                                        <ExternalLink className="h-4 w-4 mr-1" />
                                        Live Demo
                                      </a>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Certifications Section */}
                        {userData.certifications && userData.certifications.length > 0 && (
                          <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                              <Award className="h-6 w-6 mr-2 text-blue-500" />
                              Certifications
                            </h2>
                            <div className="space-y-3">
                              {userData.certifications.map((cert, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                  <div>
                                    <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                                  </div>
                                  {cert.date && (
                                    <span className="text-sm text-gray-500">{cert.date}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contact Section */}
                        <div className="border-t pt-8">
                          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
                          <div className="flex flex-wrap gap-4">
                            {userData.personalInfo?.email && (
                              <a href={`mailto:${userData.personalInfo.email}`} className="flex items-center text-blue-500 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg">
                                <Mail className="h-4 w-4 mr-2" />
                                {userData.personalInfo.email}
                              </a>
                            )}
                            {userData.personalInfo?.phone && (
                              <a href={`tel:${userData.personalInfo.phone}`} className="flex items-center text-blue-500 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg">
                                <Phone className="h-4 w-4 mr-2" />
                                {userData.personalInfo.phone}
                              </a>
                            )}
                            {userData.externalLinks && userData.externalLinks.map((link, index) => (
                              <a key={index} href={link.url} className="flex items-center text-blue-500 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {link.platform}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentSection === 'customize' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Customize Your Portfolio</h2>
                <div className="text-center py-12">
                  <Palette className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Customization Options</h3>
                  <p className="text-gray-500">Choose colors, fonts, and styling options for your portfolio</p>
                </div>
              </div>
            )}

            {currentSection === 'layout' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Layout Options</h2>
                <div className="space-y-6">
                  {layouts.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => setSelectedLayout(layout.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedLayout === layout.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Layout className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{layout.name}</p>
                          <p className="text-sm text-gray-500">{layout.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentSection === 'ai' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl mr-4">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">AI Assistant</h2>
                    <p className="text-gray-600">Let AI help optimize your portfolio</p>
                    <p className="text-sm text-gray-500 mt-1">Note: AI Assistant is only for building - not included in final website</p>
                  </div>
                </div>

                {/* AI Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Content Generation */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Sparkles className="h-6 w-6 text-purple-500 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">Content Generation</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Generate professional content for your portfolio sections</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => generateAIContent('bio')}
                        disabled={isAiGenerating}
                        className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 rounded-lg border transition-colors"
                      >
                        <span className="flex items-center">
                          <Wand2 className="h-4 w-4 mr-2 text-purple-500" />
                          Generate Bio
                        </span>
                        {isAiGenerating && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>}
                      </button>
                      <button
                        onClick={() => generateAIContent('projects')}
                        disabled={isAiGenerating}
                        className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 rounded-lg border transition-colors"
                      >
                        <span className="flex items-center">
                          <Code className="h-4 w-4 mr-2 text-purple-500" />
                          Generate Projects
                        </span>
                        {isAiGenerating && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>}
                      </button>
                    </div>
                  </div>

                  {/* Smart Recommendations */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Target className="h-6 w-6 text-blue-500 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">Smart Recommendations</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Get personalized suggestions based on your profile</p>
                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded-lg border">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">Theme Optimization</p>
                            <p className="text-xs text-gray-500">Based on your profession</p>
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">Layout Suggestions</p>
                            <p className="text-xs text-gray-500">Optimized for your content</p>
                          </div>
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Suggestions Display */}
                {aiSuggestions.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                      AI Generated Content
                    </h3>
                    <div className="space-y-3">
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                          {typeof suggestion === 'string' ? (
                            <div>
                              <p className="text-gray-700 mb-3">{suggestion}</p>
                              <button
                                onClick={() => applyAIContent('bio', suggestion)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                              >
                                Apply This Bio
                              </button>
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">{suggestion.name}</h4>
                              <p className="text-gray-600 text-sm mb-2">{suggestion.description}</p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {suggestion.technologies?.split(',').map((tech, i) => (
                                  <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                                    {tech.trim()}
                                  </span>
                                ))}
                              </div>
                              <button
                                onClick={() => applyAIContent('project', suggestion)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                              >
                                Add This Project
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio Analysis */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Portfolio Analysis</h3>
                  <div className="grid gap-4">
                    {getAIOptimizations().map((optimization, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        optimization.type === 'error' ? 'border-red-500 bg-red-50' :
                        optimization.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                        optimization.type === 'info' ? 'border-blue-500 bg-blue-50' :
                        'border-green-500 bg-green-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 mb-1">{optimization.title}</h4>
                            <p className="text-sm text-gray-600">{optimization.description}</p>
                          </div>
                          <button
                            onClick={() => applyAISuggestion(optimization)}
                            className="ml-4 px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioBuilder
