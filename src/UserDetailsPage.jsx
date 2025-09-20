import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, GraduationCap, Code, ArrowLeft, ArrowRight, Save, Plus, Trash2, ExternalLink, Award } from 'lucide-react'

const UserDetailsPage = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      bio: ''
    },
    education: [
      {
        degree: '',
        institution: '',
        graduationYear: '',
        gpa: '',
        description: ''
      }
    ],
    projects: [
      {
        name: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        imageUrl: ''
      }
    ],
    externalLinks: [
      {
        platform: '',
        url: '',
        description: ''
      }
    ],
    certifications: [
      {
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
        url: ''
      }
    ]
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      // For array sections (education, projects, etc.)
      setFormData(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }))
    } else {
      // For single object sections (personalInfo)
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    }
  }

  const addItem = (section) => {
    const newItem = getDefaultItem(section)
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }))
  }

  const removeItem = (section, index) => {
    if (formData[section].length > 1) {
      setFormData(prev => ({
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index)
      }))
    }
  }

  const getDefaultItem = (section) => {
    switch (section) {
      case 'education':
        return { degree: '', institution: '', graduationYear: '', gpa: '', description: '' }
      case 'projects':
        return { name: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' }
      case 'externalLinks':
        return { platform: '', url: '', description: '' }
      case 'certifications':
        return { name: '', issuer: '', date: '', credentialId: '', url: '' }
      default:
        return {}
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Save portfolio data to localStorage
      localStorage.setItem('portfolioData', JSON.stringify(formData))
      
      // Also save projects separately for the PreviousProjectsPage
      if (formData.projects && formData.projects.length > 0) {
        localStorage.setItem('userProjects', JSON.stringify(formData.projects))
      }
      
      setIsLoading(false)
      console.log('Portfolio data saved to localStorage:', formData)
      
      // Navigate to portfolio builder
      window.location.href = '/portfolio-builder'
    } catch (error) {
      setIsLoading(false)
      console.error('Error saving portfolio data:', error)
      alert('Error saving portfolio data. Please try again.')
    }
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Education', icon: GraduationCap },
    { number: 3, title: 'Projects', icon: Code },
    { number: 4, title: 'External Links', icon: ExternalLink },
    { number: 5, title: 'Certifications', icon: Award }
  ]

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
                Portfolio Generator
              </span>
            </div>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between w-full">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : isCompleted 
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    <StepIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {currentStep === 1 && "Tell us about yourself to get started"}
              {currentStep === 2 && "Add your educational background"}
              {currentStep === 3 && "Showcase your projects and work"}
              {currentStep === 4 && "Add your external profiles and links"}
              {currentStep === 5 && "Include your certifications and achievements"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.fullName}
                      onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.location}
                      onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.title}
                    onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                    placeholder="e.g., Frontend Developer, Full Stack Engineer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      value={formData.personalInfo.bio}
                      onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
                      rows={4}
                      placeholder="Tell us about yourself, your passion, and what drives you..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200"
                      onClick={async () => {
                        // Simple AI summary using OpenAI API (replace with your endpoint)
                        const apiKey = 'YOUR_OPENAI_API_KEY';
                        const bio = formData.personalInfo.bio;
                        if (!bio) return alert('Please enter your bio first.');
                        try {
                          const response = await fetch('https://api.openai.com/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${apiKey}`
                            },
                            body: JSON.stringify({
                              model: 'gpt-3.5-turbo',
                              messages: [{ role: 'user', content: `Summarize this bio: ${bio}` }],
                              max_tokens: 100
                            })
                          });
                          const data = await response.json();
                          const summary = data.choices?.[0]?.message?.content || '';
                          if (summary) {
                            setFormData(prev => ({
                              ...prev,
                              personalInfo: {
                                ...prev.personalInfo,
                                bio: summary
                              }
                            }));
                          } else {
                            alert('AI summary failed.');
                          }
                        } catch (err) {
                          alert('Error with AI summary.');
                        }
                      }}
                    >
                      AI Summarize
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {formData.education.map((edu, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Education {index + 1}
                      </h3>
                      {formData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem('education', index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Degree *
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                          placeholder="e.g., Bachelor of Computer Science"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution *
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                          placeholder="e.g., University of Technology"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Graduation Year
                        </label>
                        <input
                          type="number"
                          value={edu.graduationYear}
                          onChange={(e) => handleInputChange('education', 'graduationYear', e.target.value, index)}
                          placeholder="e.g., 2023"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GPA (Optional)
                        </label>
                        <input
                          type="text"
                          value={edu.gpa}
                          onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
                          placeholder="e.g., 3.8/4.0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        value={edu.description}
                        onChange={(e) => handleInputChange('education', 'description', e.target.value, index)}
                        rows={3}
                        placeholder="Describe your academic achievements, relevant coursework, or honors..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItem('education')}
                  className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Education
                </button>
              </div>
            )}

            {/* Step 3: Projects */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {formData.projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Project {index + 1}
                      </h3>
                      {formData.projects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem('projects', index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Name *
                        </label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
                          placeholder="e.g., E-commerce Website"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                          rows={3}
                          placeholder="Describe what the project does, its features, and your role..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Technologies Used
                        </label>
                        <input
                          type="text"
                          value={project.technologies}
                          onChange={(e) => handleInputChange('projects', 'technologies', e.target.value, index)}
                          placeholder="e.g., React, Node.js, MongoDB, AWS"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            value={project.githubUrl}
                            onChange={(e) => handleInputChange('projects', 'githubUrl', e.target.value, index)}
                            placeholder="https://github.com/username/project"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Live Demo URL
                          </label>
                          <input
                            type="url"
                            value={project.liveUrl}
                            onChange={(e) => handleInputChange('projects', 'liveUrl', e.target.value, index)}
                            placeholder="https://yourproject.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Image URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={project.imageUrl}
                          onChange={(e) => handleInputChange('projects', 'imageUrl', e.target.value, index)}
                          placeholder="https://example.com/project-image.jpg"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItem('projects')}
                  className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Project
                </button>
              </div>
            )}

            {/* Step 4: External Links */}
            {currentStep === 4 && (
              <div className="space-y-6">
                {formData.externalLinks.map((link, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Link {index + 1}
                      </h3>
                      {formData.externalLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem('externalLinks', index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Platform *
                        </label>
                        <input
                          type="text"
                          value={link.platform}
                          onChange={(e) => handleInputChange('externalLinks', 'platform', e.target.value, index)}
                          placeholder="e.g., GitHub, LinkedIn, Twitter, Personal Website"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL *
                        </label>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => handleInputChange('externalLinks', 'url', e.target.value, index)}
                          placeholder="https://example.com/yourprofile"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description (Optional)
                        </label>
                        <input
                          type="text"
                          value={link.description}
                          onChange={(e) => handleInputChange('externalLinks', 'description', e.target.value, index)}
                          placeholder="Brief description of this link"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItem('externalLinks')}
                  className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Link
                </button>
              </div>
            )}

            {/* Step 5: Certifications */}
            {currentStep === 5 && (
              <div className="space-y-6">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Certification {index + 1}
                      </h3>
                      {formData.certifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem('certifications', index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Certification Name *
                        </label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
                          placeholder="e.g., AWS Certified Solutions Architect"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Issuing Organization *
                        </label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => handleInputChange('certifications', 'issuer', e.target.value, index)}
                          placeholder="e.g., Amazon Web Services"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Issue Date
                          </label>
                          <input
                            type="date"
                            value={cert.date}
                            onChange={(e) => handleInputChange('certifications', 'date', e.target.value, index)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Credential ID (Optional)
                          </label>
                          <input
                            type="text"
                            value={cert.credentialId}
                            onChange={(e) => handleInputChange('certifications', 'credentialId', e.target.value, index)}
                            placeholder="e.g., AWS-123456789"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Verification URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={cert.url}
                          onChange={(e) => handleInputChange('certifications', 'url', e.target.value, index)}
                          placeholder="https://credly.com/badges/12345678"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItem('certifications')}
                  className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Certification
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Previous
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  Next
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:from-green-300 disabled:to-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Portfolio...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Create Portfolio
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsPage

