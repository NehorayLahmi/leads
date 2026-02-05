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
import { Checkbox } from "../ui/checkbox";

interface Step5Props {
  formData: {
    bank_name: string;
    bank_account_type: string;
    aba_routing_number: string;
    account_number: string;
    [key: string]: any;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string | undefined>;
  tcpaConsent: boolean;
  setTcpaConsent: (checked: boolean) => void;
}

export default function Step5Banking({
  formData,
  setFormData,
  errors,
  tcpaConsent,
  setTcpaConsent
}: Step5Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Banking Information
        </h2>
        <p className="text-slate-600">Almost done! Lenders need this to fund your loan</p>
      </div>

      {/* שם הבנק */}
      <div className="space-y-2">
        <Label htmlFor="bank_name" className="text-slate-700 font-medium">
          Bank Name *
        </Label>
        <Input
          id="bank_name"
          type="text"
          placeholder="Your Bank Name"
          value={formData.bank_name}
          onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
          className="h-12 text-lg border-slate-300"
        />
        {errors.bank_name && <p className="text-sm text-red-600">{errors.bank_name}</p>}
      </div>

      {/* סוג חשבון */}
      <div className="space-y-2">
        <Label htmlFor="bank_account_type" className="text-slate-700 font-medium">
          Account Type *
        </Label>
        <Select
          value={formData.bank_account_type}
          onValueChange={(value) => setFormData({ ...formData, bank_account_type: value })}
        >
          <SelectTrigger className="h-12 border-slate-300">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Checking">Checking</SelectItem>
            <SelectItem value="Savings">Savings</SelectItem>
          </SelectContent>
        </Select>
        {errors.bank_account_type && <p className="text-sm text-red-600">{errors.bank_account_type}</p>}
      </div>

      {/* מספר ניתוב (Routing) */}
      <div className="space-y-2">
        <Label htmlFor="aba_routing_number" className="text-slate-700 font-medium">
          Routing Number (9 digits) *
        </Label>


        [Image of a bank check showing routing and account numbers]

        <Input
          id="aba_routing_number"
          type="text"
          inputMode="numeric"
          placeholder="123456789"
          maxLength={9}
          value={formData.aba_routing_number}
          onChange={(e) => setFormData({ ...formData, aba_routing_number: e.target.value.replace(/\D/g, '') })}
          className="h-12 text-lg border-slate-300 font-mono"
        />
        {errors.aba_routing_number && <p className="text-sm text-red-600">{errors.aba_routing_number}</p>}
      </div>

      {/* מספר חשבון */}
      <div className="space-y-2">
        <Label htmlFor="account_number" className="text-slate-700 font-medium">
          Account Number *
        </Label>
        <Input
          id="account_number"
          type="text"
          inputMode="numeric"
          placeholder="Account number"
          value={formData.account_number}
          onChange={(e) => setFormData({ ...formData, account_number: e.target.value.replace(/\D/g, '') })}
          className="h-12 text-lg border-slate-300 font-mono"
        />
        {errors.account_number && <p className="text-sm text-red-600">{errors.account_number}</p>}
        <p className="text-xs text-slate-500">🔒 Bank details are encrypted and secure</p>
      </div>

      {/* הסכמת TCPA - חשוב מאוד משפטית */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
        <div className="flex items-start">
          <Checkbox
            id="tcpa_consent"
            checked={tcpaConsent}
            onCheckedChange={(checked) => setTcpaConsent(!!checked)}
            className="mt-1"
          />
          <Label htmlFor="tcpa_consent" className="ml-3 text-sm text-slate-700 cursor-pointer leading-relaxed">
            By clicking Submit, I give my written consent to receive SMS messages, calls, and emails from lenders...
            I understand that consent is not a condition of obtaining a loan.
          </Label>
        </div>
        {errors.tcpa_consent && <p className="text-sm text-red-600 mt-2">{errors.tcpa_consent}</p>}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600 leading-relaxed">
        <p className="font-semibold text-slate-700 mb-2">Important Disclosure:</p>
        <p>
          By submitting this form, you authorize us to share your information with lenders in our network.
        </p>
      </div>
    </div>
  );
}