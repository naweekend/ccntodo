export const questions = [
  // 1. Fun / Meme
  {
    text: "A friend 'borrows' your pen before every class, whose pen is it actually?",
    options: [
      { text: "Yours still", iqValue: 0 },
      { text: "Theirs now 😭", iqValue: 10 },
      { text: "Shared pen", iqValue: 0 },
    ],
  },
  {
    text: "What does a Pakistani math teacher say before a surprise test?",
    options: [
      { text: "This is very easy", iqValue: 10 },
      { text: "Prepare for tomorrow", iqValue: 0 },
      { text: "Good luck!", iqValue: 0 },
    ],
  },

  // 2. Math / Integrals
  {
    text: "Evaluate ∫ x dx",
    options: [
      { text: "x^2 / 2 + C", iqValue: 10 },
      { text: "x + C", iqValue: 0 },
      { text: "ln(x) + C", iqValue: 0 },
    ],
  },
  {
    text: "Evaluate ∫ e^x dx",
    options: [
      { text: "e^x + C", iqValue: 10 },
      { text: "x * e^x + C", iqValue: 0 },
      { text: "ln(x) + C", iqValue: 0 },
    ],
  },

  // 3. Physics
  {
    text: "Acceleration due to gravity on Earth?",
    options: [
      { text: "9.8 m/s²", iqValue: 10 },
      { text: "10.8 m/s²", iqValue: 0 },
      { text: "8.9 m/s²", iqValue: 0 },
    ],
  },
  {
    text: "Which law states F = ma?",
    options: [
      { text: "Newton's Second Law", iqValue: 10 },
      { text: "Newton's First Law", iqValue: 0 },
      { text: "Hooke's Law", iqValue: 0 },
    ],
  },

  // 4. Chemistry
  {
    text: "What is the chemical formula of water?",
    options: [
      { text: "H2O", iqValue: 10 },
      { text: "CO2", iqValue: 0 },
      { text: "NaCl", iqValue: 0 },
    ],
  },
  {
    text: "Which gas is produced when hydrochloric acid reacts with zinc?",
    options: [
      { text: "Hydrogen", iqValue: 10 },
      { text: "Oxygen", iqValue: 0 },
      { text: "Carbon dioxide", iqValue: 0 },
    ],
  },

  // 5. Biology / Science
  {
    text: "Which organ pumps blood in humans?",
    options: [
      { text: "Heart", iqValue: 10 },
      { text: "Lungs", iqValue: 0 },
      { text: "Kidney", iqValue: 0 },
    ],
  },
  {
    text: "Vitamin produced when exposed to sunlight?",
    options: [
      { text: "Vitamin D", iqValue: 10 },
      { text: "Vitamin C", iqValue: 0 },
      { text: "Vitamin B12", iqValue: 0 },
    ],
  },

  // 6. Geography
  {
    text: "Which is the largest province of Pakistan by area?",
    options: [
      { text: "Balochistan", iqValue: 10 },
      { text: "Punjab", iqValue: 0 },
      { text: "Sindh", iqValue: 0 },
    ],
  },
  {
    text: "The Indus River flows into which body of water?",
    options: [
      { text: "Arabian Sea", iqValue: 10 },
      { text: "Bay of Bengal", iqValue: 0 },
      { text: "Red Sea", iqValue: 0 },
    ],
  },

  // 7. History
  {
    text: "Year Pakistan gained independence?",
    options: [
      { text: "1947", iqValue: 10 },
      { text: "1950", iqValue: 0 },
      { text: "1935", iqValue: 0 },
    ],
  },
  {
    text: "Founder of Pakistan?",
    options: [
      { text: "Muhammad Ali Jinnah", iqValue: 10 },
      { text: "Allama Iqbal", iqValue: 0 },
      { text: "Liaquat Ali Khan", iqValue: 0 },
    ],
  },

  // 8. Coding / Computers
  {
    text: "Language used to style web pages?",
    options: [
      { text: "CSS", iqValue: 10 },
      { text: "HTML", iqValue: 0 },
      { text: "Python", iqValue: 0 },
    ],
  },
  {
    text: "CPU stands for?",
    options: [
      { text: "Central Processing Unit", iqValue: 10 },
      { text: "Computer Power Unit", iqValue: 0 },
      { text: "Central Programming Unit", iqValue: 0 },
    ],
  },

  // 9. Fun / Memes
  {
    text: "During exam week, students sleep for?",
    options: [
      { text: "0 hours", iqValue: 10 },
      { text: "2 hours", iqValue: 0 },
      { text: "What is sleep?", iqValue: 0 },
    ],
  },
  {
    text: "If a Pakistani class has 30 students and only 27 chairs, who sits on the window ledge?",
    options: [
      { text: "Same guy every day 💀", iqValue: 10 },
      { text: "Random student", iqValue: 0 },
      { text: "Teacher decides", iqValue: 0 },
    ],
  },

  // 10. Misc Science / GK
  {
    text: "pH of neutral solution at 25°C?",
    options: [
      { text: "7", iqValue: 10 },
      { text: "0", iqValue: 0 },
      { text: "14", iqValue: 0 },
    ],
  },
  {
    text: "Chemical symbol for gold?",
    options: [
      { text: "Au", iqValue: 10 },
      { text: "Ag", iqValue: 0 },
      { text: "Gd", iqValue: 0 },
    ],
  },

  // 11. Geography / Pakistan
  {
    text: "Capital of Sindh province?",
    options: [
      { text: "Karachi", iqValue: 10 },
      { text: "Lahore", iqValue: 0 },
      { text: "Peshawar", iqValue: 0 },
    ],
  },
  {
    text: "Which mountain range is in northern Pakistan?",
    options: [
      { text: "Himalayas", iqValue: 10 },
      { text: "Andes", iqValue: 0 },
      { text: "Rockies", iqValue: 0 },
    ],
  },

  // 12. Fun / Memes
  {
    text: "First reply in a Pakistani class WhatsApp group after 'Important announcement'?",
    options: [
      { text: "Kya hua?", iqValue: 10 },
      { text: "Notes bhejo?", iqValue: 0 },
      { text: "Okay.", iqValue: 0 },
    ],
  },
  {
    text: "If a project group has 5 members and only 2 work, fraction active?",
    options: [
      { text: "2/5", iqValue: 10 },
      { text: "1/5", iqValue: 0 },
      { text: "3/5", iqValue: 0 },
    ],
  },
];
