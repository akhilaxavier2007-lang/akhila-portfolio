/**
 * ==========================================================================
 * AKHILA XAVIER — MY DIGITAL UNIVERSE
 * Configuration File: Personal Contact & Verified Profile Settings
 * ==========================================================================
 * 
 * Verified from Akhila Xavier's CV for the AWS Student Builder Challenge.
 */

const USER_CONFIG = {
  // Identity & Academic Coordinates
  owner: {
    fullName: "Akhila Xavier",
    title: "B.Tech Computer Science and Engineering Student",
    brandStatement: "Exploring technology. Creating possibilities.",
    education: {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Sree Chitra Thirunal College of Engineering (SCTCE)",
      location: "Trivandrum, Kerala, India",
      academicYear: "2025 – 2029",
      cgpa: "9.8 CGPA (First Year Distinction)",
      highSchool: "Stratford Public School, Kollam (CBSE Class 12 Topper in Informatics Practices - Python & DBMS)",
      secondarySchool: "Holy Trinity Anglo Indian School, Kollam (Topper in Java Programming)"
    },
    certifications: [
      "Introduction to Robotics Workshop — MACE",
      "Embedded System Design — GEC Palakkad",
      "Cyber Security Specialization (6-Month Program, In Progress)"
    ],
    languages: ["English", "Malayalam", "Tamil", "Hindi"],
    hobbies: ["Coding", "Problem Solving", "Listening to Music", "Reading Books", "Dancing", "Swimming"]
  },

  // Verified Contact & Social Profiles
  links: {
    email: "akhilaxavier2007@gmail.com",
    phone: "+918714176644",
    linkedin: "https://www.linkedin.com/in/akhila-xavier-68671237b",
    instagram: "https://instagram.com/akhilaxaviier",
    portfolioRepository: "" // Fill with GitHub repo once pushed
  },

  // Faculty References
  references: [
    {
      name: "Dr. Soniya B",
      role: "HOD & Professor, Dept. of CSE",
      institution: "SCTCE, Trivandrum",
      email: "soniya@sctce.ac.in"
    },
    {
      name: "Prof. Binu Rajan",
      role: "Assistant Professor, Dept. of CSE",
      institution: "SCTCE, Trivandrum",
      email: "binurajan@sctce.ac.in"
    }
  ],

  // Interactive Universe Settings
  universe: {
    orbitalSpeedMultiplier: 1.0,
    starfieldDensity: 110,
    enableSoundSFX: false // Can be toggled by user via navbar audio button
  }
};

// Freeze configuration for runtime immutability
Object.freeze(USER_CONFIG);
Object.freeze(USER_CONFIG.owner);
Object.freeze(USER_CONFIG.owner.education);
Object.freeze(USER_CONFIG.links);
Object.freeze(USER_CONFIG.universe);
