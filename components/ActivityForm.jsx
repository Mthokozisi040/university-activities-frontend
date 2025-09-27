// components/ActivityForm.jsx
'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function ActivityForm({ activity, category }) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    activity.requirements?.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name].toString().trim() === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          activityId: activity.id,
          formData
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const commonClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
    const errorClasses = errors[field.name] ? "border-red-500 focus:ring-red-500" : "";

    switch (field.type) {
      case 'select':
        return (
          <select
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${commonClasses} ${errorClasses}`}
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            rows={4}
            className={`${commonClasses} ${errorClasses}`}
            required={field.required}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            min={field.min}
            max={field.max}
            className={`${commonClasses} ${errorClasses}`}
            required={field.required}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${commonClasses} ${errorClasses}`}
            required={field.required}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder || 'Enter your email'}
            className={`${commonClasses} ${errorClasses}`}
            required={field.required}
          />
        );

      case 'tel':
        return (
          <input
            type="tel"
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder || 'Enter your phone number'}
            className={`${commonClasses} ${errorClasses}`}
            required={field.required}
          />
        );

      default:
        return (
          <input
            type="text"
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            className={`${commonClasses} ${errorClasses}`}
            required={field.required}
          />
        );
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-green-800 mb-2">Application Submitted!</h3>
        <p className="text-green-700 mb-6">
          Thank you for your interest in {activity.name}. We'll review your application and get back to you soon.
        </p>
        <button
          onClick={() => setSubmitStatus(null)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Join {activity.name}</h2>
      
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
          <span className="text-red-700">There was an error submitting your application. Please try again.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {activity.requirements?.map((field, index) => (
          <div key={field.name || index}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}