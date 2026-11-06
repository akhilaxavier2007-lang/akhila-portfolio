/**
 * ==========================================================================
 * AKHILA XAVIER — MY DIGITAL UNIVERSE
 * Configuration File: Personal Contact & Profile Settings
 * ==========================================================================
 * 
 * Instructions:
 * - Update the values below with your verified email and profile URLs.
 * - If a URL is left empty (""), the website will gracefully display
 *   a status indicator ("Configure in config.js") rather than a broken link.
 * - This protects the integrity of your AWS Challenge submission.
 */

const USER_CONFIG = {
  // Identity & Education Details
  owner: {
    fullName: "Akhila Xavier",
    brandStatement: "Exploring technology. Creating possibilities.",
    education: {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Sree Chitra Thirunal College of Engineering (SCTCE)",
      location: "Thiruvananthapuram, Kerala, India"
    }
  },

  // Social & Professional Profiles
  // Leave empty ("") if you haven't set up the public link yet.
  links: {
    email: "",                // e.g., "akhila.xavier@example.com" (leave empty until ready)
    linkedin: "",             // e.g., "https://www.linkedin.com/in/your-profile"
    github: "",               // e.g., "https://github.com/your-username"
    portfolioRepository: ""   // e.g., "https://github.com/your-username/akhila-portfolio"
  },

  // Interactive Universe Settings
  universe: {
    orbitalSpeedMultiplier: 1.0,
    starfieldDensity: 90,
    enableConstellationTooltips: true
  }
};

// Freeze configuration to prevent unauthorized tampering at runtime
Object.freeze(USER_CONFIG);
Object.freeze(USER_CONFIG.owner);
Object.freeze(USER_CONFIG.owner.education);
Object.freeze(USER_CONFIG.links);
Object.freeze(USER_CONFIG.universe);

