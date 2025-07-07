import { useState, useCallback } from 'react';
import { useToast } from '../components/ui';

/**
 * A custom hook for handling form state and validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function that returns an errors object
 * @param {Function} onSubmit - Submit handler function
 * @returns {Object} Form utilities including values, errors, handlers, etc.
 */
function useForm(initialValues = {}, validate, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    
    // Handle different input types
    const inputValue = type === 'checkbox' 
      ? checked 
      : type === 'file' 
        ? files[0] 
        : value;
    
    setValues(prevValues => ({
      ...prevValues,
      [name]: inputValue
    }));
    
    // Clear error for the current field if validation passes
    if (errors[name]) {
      if (validate) {
        const newErrors = { ...errors };
        const validationErrors = validate({ ...values, [name]: inputValue });
        if (!validationErrors[name]) {
          delete newErrors[name];
          setErrors(newErrors);
        }
      } else {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
    }
  }, [errors, validate, values]);
  
  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    // Run validation if validate function is provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      // If there are validation errors, don't submit
      if (Object.keys(validationErrors).length > 0) {
        // Scroll to the first error
        const firstError = Object.keys(validationErrors)[0];
        const element = document.querySelector(`[name="${firstError}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus({ preventScroll: true });
        }
        return;
      }
    }
    
    // Call the onSubmit callback if provided
    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error(error.message || 'An error occurred while submitting the form');
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [onSubmit, toast, validate, values]);
  
  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);
  
  // Set field value manually
  const setFieldValue = useCallback((name, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }, []);
  
  // Set field error manually
  const setFieldError = useCallback((name, error) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  }, []);
  
  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;
  
  return {
    values,
    errors,
    isSubmitting,
    isValid,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    setErrors,
    setValues
  };
}

export default useForm;
