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

// רשימת המדינות - קבועה מחוץ לקומפוננטה
const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
] as const;

interface Step3Props {
  formData: {
    driver_license_number: string;
    driver_license_state: string;
    state: string;
    [key: string]: any;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string | undefined>;
}

export default function Step3Identity({ formData, setFormData, errors }: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Identity Verification
        </h2>
        <p className="text-slate-600">Verify your identity to proceed</p>
      </div>

      {/* מספר רישיון נהיגה */}
      <div className="space-y-2">
        <Label htmlFor="driver_license_number" className="text-slate-700 font-medium">
          Driver's License Number *
        </Label>
        <Input
          id="driver_license_number"
          type="text"
          placeholder="D1234567"
          value={formData.driver_license_number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setFormData({ ...formData, driver_license_number: e.target.value.toUpperCase() })
          }
          className="h-12 text-lg border-slate-300"
        />
        {errors.driver_license_number && (
          <p className="text-sm text-red-600">{errors.driver_license_number}</p>
        )}
      </div>

      {/* מדינת רישיון */}
      <div className="space-y-2">
        <Label htmlFor="driver_license_state" className="text-slate-700 font-medium">
          Driver's License State *
        </Label>
        <Select
          value={formData.driver_license_state}
          onValueChange={(value: string) => 
            setFormData({ ...formData, driver_license_state: value, state: value })
          }
        >
          <SelectTrigger className="h-12 border-slate-300">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {US_STATES.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.driver_license_state && (
          <p className="text-sm text-red-600">{errors.driver_license_state}</p>
        )}
      </div>

      {/* תיבת מידע כחולה */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start">
          <svg 
            className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
              clipRule="evenodd" 
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-900">Why we need this</p>
            <p className="text-sm text-blue-700 mt-1">
              Lenders require identity verification to comply with federal lending regulations and prevent fraud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}