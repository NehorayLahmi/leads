"use client"

import React from 'react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// הגדרת המבנה של נתוני הטופס הספציפיים לשלב זה
interface Step2FormData {
  first_name: string;
  last_name: string;
  dob: string;
  primary_phone: string;
  mobile_phone: string;
  primary_phone_display?: string; // שדה עזר לתצוגה
  ssn: string;
  ssn_display?: string; // שדה עזר לתצוגה
  [key: string]: any;   // מאפשר שדות נוספים מהטופס הכללי
}

interface Step2Props {
  formData: Step2FormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
}

// פונקציות עזר עם הגדרת טיפוסים
const formatSSN = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 5) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`;
};

const formatPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
};

export default function Step2Personal({ formData, setFormData, errors }: Step2Props) {
  
  // חישוב תאריך מינימלי (גיל 18) עבור ה-Date Picker
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Personal Information
        </h2>
        <p className="text-slate-600">Help us connect you with the right lender</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name" className="text-slate-700 font-medium">
            First Name *
          </Label>
          <Input
            id="first_name"
            type="text"
            placeholder="John"
            value={formData.first_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, first_name: e.target.value })
            }
            className={`h-12 text-lg border-slate-300 ${errors.first_name ? 'border-red-500' : ''}`}
          />
          {errors.first_name && <p className="text-sm text-red-600">{errors.first_name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name" className="text-slate-700 font-medium">
            Last Name *
          </Label>
          <Input
            id="last_name"
            type="text"
            placeholder="Smith"
            value={formData.last_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, last_name: e.target.value })
            }
            className={`h-12 text-lg border-slate-300 ${errors.last_name ? 'border-red-500' : ''}`}
          />
          {errors.last_name && <p className="text-sm text-red-600">{errors.last_name}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dob" className="text-slate-700 font-medium">
          Date of Birth *
        </Label>
        <Input
          id="dob"
          type="date"
          value={formData.dob}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setFormData({ ...formData, dob: e.target.value })
          }
          className={`h-12 text-lg border-slate-300 ${errors.dob ? 'border-red-500' : ''}`}
          max={maxDateString}
        />
        {errors.dob && <p className="text-sm text-red-600">{errors.dob}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="primary_phone" className="text-slate-700 font-medium">
          Phone Number *
        </Label>
        <Input
          id="primary_phone"
          type="tel"
          inputMode="numeric"
          placeholder="(555) 123-4567"
          value={formData.primary_phone_display || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const cleaned = e.target.value.replace(/\D/g, '');
            setFormData({ 
              ...formData, 
              primary_phone: cleaned,
              mobile_phone: cleaned,
              primary_phone_display: formatPhone(cleaned)
            });
          }}
          className={`h-12 text-lg border-slate-300 ${errors.primary_phone ? 'border-red-500' : ''}`}
          maxLength={14}
        />
        {errors.primary_phone && <p className="text-sm text-red-600">{errors.primary_phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="ssn" className="text-slate-700 font-medium">
          Social Security Number *
        </Label>
        <Input
          id="ssn"
          type="text"
          inputMode="numeric"
          placeholder="123-45-6789"
          value={formData.ssn_display || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const cleaned = e.target.value.replace(/\D/g, '');
            setFormData({ 
              ...formData, 
              ssn: cleaned,
              ssn_display: formatSSN(cleaned)
            });
          }}
          className={`h-12 text-lg border-slate-300 ${errors.ssn ? 'border-red-500' : ''}`}
          maxLength={11}
        />
        {errors.ssn && <p className="text-sm text-red-600">{errors.ssn}</p>}
        <p className="text-xs text-slate-500">🔒 Your information is secure and encrypted</p>
      </div>
    </div>
  );
}