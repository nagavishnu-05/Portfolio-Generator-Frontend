const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// Get portfolio by email
router.get('/:email', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userEmail: req.params.email });
    res.json(portfolio || { userEmail: req.params.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update portfolio
router.post('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { personalInfo, education, projects, externalLinks, certifications } = req.body;

    if (!personalInfo || !email) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    let portfolio = await Portfolio.findOne({ userEmail: email });
    if (!portfolio) {
      portfolio = new Portfolio({ userEmail: email });
    }

    portfolio.personalInfo = personalInfo;
    portfolio.education = education || [];
    portfolio.projects = (projects || []).map(p => ({
      ...p,
      technologies: typeof p.technologies === 'string'
        ? p.technologies.split(',').map(t => t.trim())
        : Array.isArray(p.technologies) ? p.technologies : []
    }));
    portfolio.externalLinks = externalLinks || [];
    portfolio.certifications = certifications || [];

    await portfolio.save();
    res.json({ message: 'Portfolio saved successfully', portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
