'use client'
import React, { useState } from 'react';
import OptionCard from '../components/ui/Cards/OptionCard';
import ProfileForm from '../components/ui/Cards/ProfileForm';
import { motion } from 'framer-motion'; // Import Framer Motion

interface Step {
  title: string;
  description: string;
  details: string;
  content: React.ReactNode;
}

const steps: Step[] = [
  {
    title: "Business",
    description: "Step 1. Business type",
    details: "Our architecture is ready for any type of business, just let us know who we are talking to.",
    content: (
      <>
        <OptionCard
          title="Software as a service"
          description="Software as a service (SaaS) is a software licensing and delivery model in which software is licensed on a subscription basis and is centrally hosted."
          value="saas"
        />
        <OptionCard
          title="Infrastructure as a Service"
          description="Infrastructure as a service (IaaS) is a form of cloud computing that provides virtualized computing resources over the internet."
          value="iaas"
        />
        <OptionCard
          title="Platform as a service"
          description="Platform as a service (PaaS) is a deployment environment in the cloud, with resources that enable you to deliver cloud-based apps or even enterprise apps."
          value="paas"
        />
      </>
    ),
  },
  {
    title: "Profile",
    description: "Step 2. Profile details",
    details: "Please provide your profile information.",
    content: (
      <ProfileForm />
    ),
  },
  {
    title: "Business",
    description: "Step 3. Business",
    details: "Provide detailed business information.",
    content: <div>Business details form will go here.</div>,
  },
  {
    title: "Confirmation",
    description: "Step 4. Confirmation",
    details: "Review and confirm your information.",
    content: <div>Confirmation details will go here.</div>,
  }
];

const OnboardingProcess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white ">
         <h2 className="text-3xl font-bold mb-6 text-center">Welcome to Addvantage</h2>
      <div className="max-w-7xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg dark:bg-gray-800">
       

        <div className="flex flex-wrap justify-between mb-6 sm:mb-8 md:mb-10 lg:mb-12 ">
          {steps.map((step, index) => (
            <div key={index} className={`flex-1 text-center ${currentStep === index + 1 ? 'text-green-500' : 'text-gray-400'}`}>
              <div className={`flex items-center justify-center w-10 h-10 ${currentStep === index + 1 ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-900'} rounded-full mx-auto`}>
                {index + 1}
              </div>
              <div className="mt-2">{step.title}</div>
            </div>
          ))}
        </div>
        
        <motion.div 
        initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}className="mb-6 sm:pl-4 md:pl-8 lg:pl-80 ">
          
          <h3 className="text-2xl font-bold mb-4 max-w-2xl ">{steps[currentStep - 1].description}</h3>
          <p className="text-gray-300">{steps[currentStep - 1].details}</p>
        </motion.div>

        <div className="mb-6 sm:pl-4 md:pl-8 lg:pl-80 max-w-4xl">
          {steps[currentStep - 1].content}
        </div>

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button onClick={prevStep} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">
              Back
            </button>
          )}
          {currentStep < steps.length && (
            <button onClick={nextStep} className="px-4 py-2 bg-green-500 text-white rounded">
              Next Step
            </button>
          )}
        </div>
          </div>
      </div>
    
  );
};

 export default OnboardingProcess;
