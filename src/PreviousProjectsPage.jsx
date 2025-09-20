import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Code, Github, ExternalLink, Plus, Edit, Trash2, Eye, Calendar, User, Folder } from 'lucide-react'

const PreviousProjectsPage = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user data from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    // Load projects from localStorage
    const loadProjects = async () => {
      try {
        // Load from localStorage
        const savedProjects = localStorage.getItem('userProjects')
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects))
        } else {
          // If no saved projects, try to load from portfolio data
          const portfolioData = localStorage.getItem('portfolioData')
          if (portfolioData) {
            const data = JSON.parse(portfolioData)
            if (data.projects && data.projects.length > 0) {
              setProjects(data.projects)
              // Also save projects separately for easier access
              localStorage.setItem('userProjects', JSON.stringify(data.projects))
            }
          }
        }
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleCreateNew = () => {
    navigate('/user-details')
  }

  const handleEditProject = (projectId) => {
    // Navigate to edit mode or open edit modal
    console.log('Edit project:', projectId)
  }

  const handleDeleteProject = (projectId) => {
    const updatedProjects = projects.filter((project, index) => index !== projectId)
    setProjects(updatedProjects)
    localStorage.setItem('userProjects', JSON.stringify(updatedProjects))
    
    // Also update the main portfolio data
    const portfolioData = localStorage.getItem('portfolioData')
    if (portfolioData) {
      try {
        const data = JSON.parse(portfolioData)
        data.projects = updatedProjects
        localStorage.setItem('portfolioData', JSON.stringify(data))
      } catch (error) {
        console.error('Error updating portfolio data:', error)
      }
    }
  }

  const handleViewProject = (project) => {
    // Open project in new tab or navigate to project view
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your projects...</p>
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
                My Projects
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </button>
              <button 
                onClick={handleCreateNew}
                className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <User className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-gray-600">
                Manage and view all your portfolio projects
              </p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <Folder className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                        <p className="text-sm text-gray-500">Project #{index + 1}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProject(index)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Edit Project"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(index)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete Project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description || 'No description available'}
                  </p>

                  {/* Technologies */}
                  {project.technologies && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.split(',').map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project Links */}
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <button
                        onClick={() => handleViewProject(project)}
                        className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Demo
                      </button>
                    )}
                    <button
                      onClick={() => handleViewProject(project)}
                      className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 text-sm"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Folder className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Projects Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't created any projects yet. Start building your portfolio by adding your first project.
              </p>
              <button
                onClick={handleCreateNew}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Project
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {projects.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{projects.length}</div>
                <div className="text-gray-600">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {projects.filter(p => p.liveUrl).length}
                </div>
                <div className="text-gray-600">Live Demos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {projects.filter(p => p.githubUrl).length}
                </div>
                <div className="text-gray-600">GitHub Repos</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreviousProjectsPage
