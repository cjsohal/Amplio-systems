// The five market-intelligence questions on the /pageweave/ waiting-list form. One source of
// truth for the form (src/components/pageweave/WaitlistForm.jsx) and the Worker's allow-list
// (worker/index.js), so the answers the Worker accepts can't drift from what the form offers.
// `other: true` lets the visitor add a few words when they pick "Other".

export const SURVEY = [
  {
    key: 'role',
    question: 'What best describes your work?',
    options: ['Marketing agency', 'B2B sales', 'In-house marketing', 'Fundraising', 'Other'],
    other: true,
  },
  {
    key: 'volume',
    question: 'How many prospects do you typically contact in a campaign?',
    options: ['Under 100', '100–500', '500–2,000', 'Over 2,000'],
  },
  {
    key: 'useCase',
    question: 'How would you most likely use personalised landing pages?',
    options: ['Cold outreach', 'Email campaigns', 'Donor engagement', 'Account-based marketing', 'Other'],
    other: true,
  },
  {
    key: 'price',
    question: 'What would you consider a reasonable monthly subscription?',
    options: ['Under £49', '£49–£99', '£100–£249', '£250+', 'Unsure'],
  },
  {
    key: 'testing',
    question: 'Would you be interested in helping test an early version?',
    options: ['Yes', 'Possibly', 'Just keep me updated'],
  },
];
