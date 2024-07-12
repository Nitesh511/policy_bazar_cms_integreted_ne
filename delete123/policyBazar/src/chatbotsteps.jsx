import React from 'react';

const ChatbotSteps = [
  {
    id: '0',
    message: 'Hello! Welcome to Policybazar Nepal. How can I assist you today?',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Please enter your name.',
    trigger: 'name',
  },
  {
    id: 'name',
    user: true,
    trigger: '3',
    validator: (value) => {
      if (!value) {
        return 'Please enter a valid name.';
      }
      return true;
    },
  },
  {
    id: '3',
    message: 'Hello {previousValue}! What do you want to know about?',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'life_insurance', label: 'Life Insurance', trigger: 'life_insurance_description' },
      { value: 'term_life_insurance', label: 'Term Life Insurance', trigger: 'term_life_insurance_description' },
      { value: 'vehicle_insurance', label: 'Vehicle Insurance', trigger: 'vehicle_insurance_description' },
      { value: 'health_insurance', label: 'Health Insurance', trigger: 'health_insurance_description' },
      { value: 'home_insurance', label: 'Home Insurance', trigger: 'home_insurance_description' },
      { value: 'travel_insurance', label: 'Travel Insurance', trigger: 'travel_insurance_description' },
      { value: 'other_services', label: 'Other Services', trigger: 'other_services_description' },
    ],
  },
  {
    id: 'life_insurance_description',
    message: 'Life insurance helps protect your family financially after you die.',
    trigger: 'options', // Back to options to continue the chat
  },
  {
    id: 'term_life_insurance_description',
    message: 'Term life insurance provides coverage for a specific period of time.',
    trigger: 'options', // Back to options to continue the chat
  },
  {
    id: 'vehicle_insurance_description',
    message: 'Vehicle insurance provides financial protection against physical damage or bodily injury resulting from traffic collisions and against liability that could also arise from incidents in a vehicle.',
    trigger: 'options', // Back to options to continue the chat
  },
  {
    id: 'health_insurance_description',
    message: 'Health insurance covers medical expenses incurred during hospitalization.',
    trigger: 'options', // Back to options to continue the chat
  },
  {
    id: 'home_insurance_description',
    message: 'Home insurance provides financial protection for your home and its contents against risks.',
    trigger: 'options', // Back to options to continue the chat
  },
  {
    id: 'travel_insurance_description',
    message: 'Travel insurance covers unexpected events during your travel, such as trip cancellations or medical emergencies.',
    trigger: 'options', // Back to options to continue the chat
  },
  {
    id: 'other_services_description',
    message: 'Policybazar Nepal also offers services like mutual funds, investment planning, and retirement planning. How can I assist you further?',
    trigger: 'other_services_options',
  },
  {
    id: 'other_services_options',
    options: [
      { value: 'mutual_funds', label: 'Mutual Funds', trigger: 'mutual_funds_description' },
      { value: 'investment_planning', label: 'Investment Planning', trigger: 'investment_planning_description' },
      { value: 'retirement_planning', label: 'Retirement Planning', trigger: 'retirement_planning_description' },
    ],
  },
  {
    id: 'mutual_funds_description',
    message: 'Mutual funds pool money from many investors to invest in stocks, bonds, or other assets. It offers diversification and professional management.',
    trigger: 'options', // Back to options to continue the chat
  },
  {
    id: 'investment_planning_description',
    message: 'Investment planning helps you achieve financial goals by managing investments effectively based on your risk tolerance and financial situation.',
    trigger: 'options', // Back to options to continue the chat
  },
  {
    id: 'retirement_planning_description',
    message: 'Retirement planning involves setting aside enough money during your working years to provide income during retirement. It considers your retirement goals and financial situation.',
    trigger: 'options', // Back to options to continue the chat
  },
];

export default ChatbotSteps;
