// models/Portfolio.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  imageUrl: String
});

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  graduationYear: String,
  gpa: String,
  description: String
});

const externalLinkSchema = new mongoose.Schema({
  platform: String,
  url: String,
  description: String
});

const certificationSchema = new mongoose.Schema({
  name: String,
  issuer: String,
  date: Date,
  credentialId: String,
  url: String
});

const portfolioSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    title: String,
    bio: String
  },
  education: [educationSchema],
  projects: [projectSchema],
  externalLinks: [externalLinkSchema],
  certifications: [certificationSchema]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema, 'Portfolio');
