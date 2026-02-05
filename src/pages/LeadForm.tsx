"use client"

import { useState } from 'react';
import { Button } from "../components/ui/button";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ProgressBar from '../components/leadform/ProgressBar';
import Step1Loan from '../components/leadform/Step1Loan';
import Step2Personal from '../components/leadform/Step2Personal';
import Step3Identity from '../components/leadform/Step3Identity';
import Step4Employment from '../components/leadform/Step4Employment';
import Step5Banking from '../components/leadform/Step5Banking';
import LoadingState from '../components/leadform/LoadingState';
// וודא שהנתיב הזה קיים או שנה אותו ל-client שלך
// import { base44 } from './api/base44Client'; 

// הגדרת סוג הנתונים של הטופס כדי למנוע שגיאות any
interface FormData {
  requested_amount: number;
  loan_type: string;
  zip_code: string;
  email: string;
  first_name: string;
  last_name: string;
  dob: string;
  primary_phone: string;
  mobile_phone: string;
  ssn: string;
  driver_license_number: string;
  driver_license_state: string;
  state: string;
  employment_type: string;
  employer_name: string;
  monthly_income: number;
  pay_frequency: string;
  direct_deposit: boolean | null;
  bank_name: string;
  bank_account_type: string;
  aba_routing_number: string;
  account_number: string;
}

export default function LeadForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tcpaConsent, setTcpaConsent] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<FormData>({
    requested_amount: 500,
    loan_type: '',
    zip_code: '',
    email: '',
    first_name: '',
    last_name: '',
    dob: '',
    primary_phone: '',
    mobile_phone: '',
    ssn: '',
    driver_license_number: '',
    driver_license_state: '',
    state: '',
    employment_type: '',
    employer_name: '',
    monthly_income: 0,
    pay_frequency: '',
    direct_deposit: null,
    bank_name: '',
    bank_account_type: '',
    aba_routing_number: '',
    account_number: ''
  });

  const totalSteps = 5;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.loan_type) newErrors.loan_type = 'Please select a loan type';
      if (!formData.requested_amount || formData.requested_amount < 100) newErrors.requested_amount = 'Please select an amount';
      if (!formData.zip_code || formData.zip_code.length !== 5) newErrors.zip_code = 'Please enter a valid 5-digit ZIP code';
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    }
    
    if (step === 2) {
      if (!formData.first_name) newErrors.first_name = 'First name is required';
      if (!formData.last_name) newErrors.last_name = 'Last name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.primary_phone || formData.primary_phone.length !== 10) newErrors.primary_phone = 'Please enter a valid 10-digit phone number';
      if (!formData.ssn || formData.ssn.length !== 9) newErrors.ssn = 'Please enter a valid 9-digit SSN';
    }
    
    if (step === 3) {
      if (!formData.driver_license_number) newErrors.driver_license_number = 'Driver\'s license number is required';
      if (!formData.driver_license_state) newErrors.driver_license_state = 'Please select your state';
    }
    
    if (step === 4) {
      if (!formData.employment_type) newErrors.employment_type = 'Please select employment status';
      if (['Employed', 'SelfEmployed'].includes(formData.employment_type) && !formData.employer_name) {
        newErrors.employer_name = 'Employer name is required';
      }
      if (!formData.monthly_income || formData.monthly_income < 1) newErrors.monthly_income = 'Monthly income is required';
      if (!formData.pay_frequency) newErrors.pay_frequency = 'Please select pay frequency';
      if (formData.direct_deposit === null) newErrors.direct_deposit = 'Please select an option';
    }
    
    if (step === 5) {
      if (!formData.bank_name) newErrors.bank_name = 'Bank name is required';
      if (!formData.bank_account_type) newErrors.bank_account_type = 'Please select account type';
      if (!formData.aba_routing_number || formData.aba_routing_number.length !== 9) {
        newErrors.aba_routing_number = 'Please enter a valid 9-digit routing number';
      }
      if (!formData.account_number) newErrors.account_number = 'Account number is required';
      if (!tcpaConsent) newErrors.tcpa_consent = 'You must consent to continue';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  
const handleNext = () => {
  if (validateStep(currentStep)) {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, totalSteps);
      console.log("Moving from step", prev, "to step", next); // בדיקה ב-Console
      return next;
    });
    // הכרחי: גלילה לראש הדף כדי לראות את השלב החדש
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    console.error("Validation failed for step", currentStep);
  }
};
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    
    setIsSubmitting(true);
    
    try {
      const leadData = {
        ...formData,
        status: 'submitted',
        tcpa_consent: tcpaConsent,
        tcpa_consent_timestamp: new Date().toISOString(),
        client_ip: 'CLIENT_IP_PLACEHOLDER',
        client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      };
      
      console.log("Submitting data:", leadData);
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Application submitted successfully!');
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">SecureLend Connect</h1>
          <p className="text-slate-600">Connect with trusted lenders</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          
          {currentStep === 1 && <Step1Loan formData={formData} setFormData={setFormData} errors={errors} />}
          {currentStep === 2 && <Step2Personal formData={formData} setFormData={setFormData} errors={errors} />}
          {currentStep === 3 && <Step3Identity formData={formData} setFormData={setFormData} errors={errors} />}
          {currentStep === 4 && <Step4Employment formData={formData} setFormData={setFormData} errors={errors} />}
          {currentStep === 5 && (
            <Step5Banking 
              formData={formData} 
              setFormData={setFormData} 
              errors={errors}
              tcpaConsent={tcpaConsent}
              setTcpaConsent={setTcpaConsent}
            />
          )}

          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </Button>
            )}
            
            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="flex-1">
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                Submit <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}