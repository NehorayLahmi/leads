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
import { Slider } from "../ui/slider";

// הגדרת המבנה של הנתונים כדי למנוע שגיאות any
interface Step1Props {
  formData: {
    requested_amount: number;
    loan_type: string;
    zip_code: string;
    email: string;
    [key: string]: any; // מאפשר שדות נוספים שנמצאים בטופס הגדול
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
}

export default function Step1Loan({ formData, setFormData, errors }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Let's Get Started
        </h2>
        <p className="text-slate-600">Tell us about your loan needs</p>
      </div>

      {/* סוג הלוואה */}
      <div className="space-y-2">
        <Label htmlFor="loan_type" className="text-slate-700 font-medium">
          Type of Loan *
        </Label>
        <Select
          value={formData.loan_type}
          onValueChange={(value) => setFormData({ ...formData, loan_type: value })}
        >
          <SelectTrigger className="h-12 border-slate-300">
            <SelectValue placeholder="Select loan type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Payday">Payday Loan</SelectItem>
            <SelectItem value="Personal">Personal Loan</SelectItem>
          </SelectContent>
        </Select>
        {errors.loan_type && <p className="text-sm text-red-600">{errors.loan_type}</p>}
      </div>

      {/* סכום מבוקש */}
      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">
          How much do you need? *
        </Label>
        <div className="text-center py-4">
          <span className="text-4xl font-bold text-blue-900">
            ${formData.requested_amount || 500}
          </span>
        </div>
        <Slider
          value={[formData.requested_amount || 500]}
          onValueChange={([value]) => setFormData({ ...formData, requested_amount: value })}
          min={100}
          max={5000}
          step={50}
          className="py-4"
        />
        <div className="flex justify-between text-sm text-slate-500">
          <span>$100</span>
          <span>$5,000</span>
        </div>
        {errors.requested_amount && <p className="text-sm text-red-600">{errors.requested_amount}</p>}
      </div>

      {/* מיקוד */}
      <div className="space-y-2">
        <Label htmlFor="zip_code" className="text-slate-700 font-medium">
          ZIP Code *
        </Label>
        <Input
          id="zip_code"
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="12345"
          value={formData.zip_code}
          onChange={(e) => setFormData({ ...formData, zip_code: e.target.value.replace(/\D/g, '') })}
          className="h-12 text-lg border-slate-300"
        />
        {errors.zip_code && <p className="text-sm text-red-600">{errors.zip_code}</p>}
      </div>

      {/* אימייל */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700 font-medium">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="h-12 text-lg border-slate-300"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>
    </div>
  );
}