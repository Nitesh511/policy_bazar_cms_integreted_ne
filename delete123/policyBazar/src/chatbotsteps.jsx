import React from 'react';

const ChatbotSteps = [
  {
    id: '0',
    message: 'Namaste and welcome to Policybazaar Nepal! We might lose you in the middle of our conversation. Can I have your details to assist you better?',
    trigger: 'user_details_options',
  },
  {
    id: 'user_details_options',
    options: [
      { value: 'provide_details', label: 'Provide Details', trigger: 'ask_name' },
      { value: 'skip', label: 'Skip & Proceed', trigger: 'welcome_message' },
    ],
  },
  {
    id: 'ask_name',
    message: 'Your Name:',
    trigger: 'name',
  },
  {
    id: 'name',
    user: true,
    trigger: 'ask_email',
    validator: (value) => {
      if (!value.trim()) {
        return 'Please enter a valid name.';
      }
      return true;
    },
  },
  {
    id: 'ask_email',
    message: 'Your Email:',
    trigger: 'email',
  },
  {
    id: 'email',
    user: true,
    trigger: 'ask_contact',
    validator: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address.';
      }
      return true;
    },
  },
  {
    id: 'ask_contact',
    message: 'Your Mobile Number:',
    trigger: 'contact',
  },
  {
    id: 'contact',
    user: true,
    trigger: 'welcome_message',
    validator: (value) => {
      const phoneRegex = /^\d{10}$/; // Adjust regex to match Nepal phone format if needed
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid mobile number.';
      }
      return true;
    },
  },
  {
    id: 'welcome_message',
    message: 'We’re here to help you find the best insurance options. What do you want to know about?',
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
  // Insurance descriptions
  {
    id: 'life_insurance_description',
    message: 'Life insurance helps protect your family financially after you die.',
    trigger: 'options',
  },
  {
    id: 'term_life_insurance_description',
    message: 'Term life insurance provides coverage for a specific period of time.',
    trigger: 'options',
  },
  {
    id: 'vehicle_insurance_description',
    message: 'Vehicle insurance provides financial protection against physical damage or bodily injury resulting from traffic collisions and against liability that could also arise from incidents in a vehicle.',
    trigger: 'options',
  },
  {
    id: 'health_insurance_description',
    message: 'Health insurance covers medical expenses incurred during hospitalization.',
    trigger: 'options',
  },
  {
    id: 'home_insurance_description',
    message: 'Home insurance provides financial protection for your home and its contents against risks.',
    trigger: 'options',
  },
  {
    id: 'travel_insurance_description',
    message: 'Travel insurance covers unexpected events during your travel, such as trip cancellations or medical emergencies.',
    trigger: 'options',
  },
  {
    id: 'other_services_description',
    message: 'Policybazaar Nepal also offers services like mutual funds, investment planning, and retirement planning. How can I assist you further?',
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
  // Other services descriptions
  {
    id: 'mutual_funds_description',
    message: 'Mutual funds pool money from many investors to invest in stocks, bonds, or other assets. It offers diversification and professional management.',
    trigger: 'options',
  },
  {
    id: 'investment_planning_description',
    message: 'Investment planning helps you achieve financial goals by managing investments effectively based on your risk tolerance and financial situation.',
    trigger: 'options',
  },
  {
    id: 'retirement_planning_description',
    message: 'Retirement planning involves setting aside enough money during your working years to provide income during retirement. It considers your retirement goals and financial situation.',
    trigger: 'options',
  },
];

export default ChatbotSteps;
  