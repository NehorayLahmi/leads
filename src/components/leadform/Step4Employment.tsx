"use client"

import React from 'react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Step4Props {
  formData: {
    employment_type: string;
    employer_name: string;
    monthly_income: number;
    monthly_income_display?: string;
    pay_frequency: string;
    direct_deposit: boolean | null;
    [key: string]: any;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string | undefined>;
}

export default function Step4Employment({ formData, setFormData, errors }: Step4Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Employment & Income
        </h2>
        <p className="text-slate-600">Tell us about your income</p>
      </div>

      {/* מצב תעסוקתי */}
      <div className="space-y-2">
        <Label htmlFor="employment_type" className="text-slate-700 font-medium">
          Employment Status *
        </Label>
        <Select
          value={formData.employment_type}
          onValueChange={(value: string) => setFormData({ ...formData, employment_type: value })}
        >
          <SelectTrigger className="h-12 border-slate-300">
            <SelectValue placeholder="Select employment status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Employed">Employed</SelectItem>
            <SelectItem value="SelfEmployed">Self-Employed</SelectItem>
            <SelectItem value="Military">Military</SelectItem>
            <SelectItem value="Retired">Retired</SelectItem>
            <SelectItem value="Disabled">Receiving Disability Benefits</SelectItem>
            <SelectItem value="Unemployed">Unemployed</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.employment_type && <p className="text-sm text-red-600">{errors.employment_type}</p>}
      </div>

      {/* שם המעסיק - מותנה בבחירה */}
      {['Employed', 'SelfEmployed'].includes(formData.employment_type) && (
        <div className="space-y-2">
          <Label htmlFor="employer_name" className="text-slate-700 font-medium">
            Employer Name *
          </Label>
          <Input
            id="employer_name"
            type="text"
            placeholder="ABC Company"
            value={formData.employer_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setFormData({ ...formData, employer_name: e.target.value })
            }
            className="h-12 text-lg border-slate-300"
          />
          {errors.employer_name && <p className="text-sm text-red-600">{errors.employer_name}</p>}
        </div>
      )}

      {/* הכנסה חודשית עם פירמוט מספרים */}
      <div className="space-y-2">
        <Label htmlFor="monthly_income" className="text-slate-700 font-medium">
          Monthly Income (Before Taxes) *
        </Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-600">$</span>
          <Input
            id="monthly_income"
            type="text"
            inputMode="numeric"
            placeholder="3,000"
            value={formData.monthly_income_display || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const cleaned = e.target.value.replace(/\D/g, '');
              const formatted = cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              setFormData({ 
                ...formData, 
                monthly_income: parseInt(cleaned) || 0,
                monthly_income_display: formatted
              });
            }}
            className="h-12 text-lg border-slate-300 pl-8"
          />
        </div>
        {errors.monthly_income && <p className="text-sm text-red-600">{errors.monthly_income}</p>}
      </div>

      {/* תדירות תשלום */}
      <div className="space-y-2">
        <Label htmlFor="pay_frequency" className="text-slate-700 font-medium">
          How often are you paid? *
        </Label>
        <Select
          value={formData.pay_frequency}
          onValueChange={(value: string) => setFormData({ ...formData, pay_frequency: value })}
        >
          <SelectTrigger className="h-12 border-slate-300">
            <SelectValue placeholder="Select pay frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="BiWeekly">Bi-Weekly (Every two weeks)</SelectItem>
            <SelectItem value="EveryTwoWeeks">Every Two Weeks</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
        {errors.pay_frequency && <p className="text-sm text-red-600">{errors.pay_frequency}</p>}
      </div>

      {/* הפקדה ישירה - Radio Group */}
      <div className="space-y-3">
        <Label className="text-slate-700 font-medium">
          Do you have direct deposit? *
        </Label>
        <RadioGroup
          value={formData.direct_deposit === null ? undefined : formData.direct_deposit.toString()}
          onValueChange={(value: string) => setFormData({ ...formData, direct_deposit: value === 'true' })}
        >
          <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <RadioGroupItem value="true" id="direct_yes" />
            <Label htmlFor="direct_yes" className="cursor-pointer flex-1 font-normal">
              Yes, I have direct deposit
            </Label>
          </div>
          <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <RadioGroupItem value="false" id="direct_no" />
            <Label htmlFor="direct_no" className="cursor-pointer flex-1 font-normal">
              No, I don't have direct deposit
            </Label>
          </div>
        </RadioGroup>
        {errors.direct_deposit && <p className="text-sm text-red-600">{errors.direct_deposit}</p>}
      </div>
    </div>
  );
}