export const validation = {
  required: (value: string | number | undefined | null): string | null => {
    if (value === undefined || value === null || String(value).trim() === '') {
      return 'This field is required.';
    }
    return null;
  },

  maxLength: (value: string, max: number): string | null => {
    if (value.length > max) {
      return `Maximum ${max} characters allowed.`;
    }
    return null;
  },

  isNumber: (value: string | number): string | null => {
    if (isNaN(Number(value)) || String(value).trim() === '') {
      return 'Must be a valid number.';
    }
    return null;
  },

  positiveNumber: (value: string | number): string | null => {
    if (Number(value) <= 0) {
      return 'Must be a positive number.';
    }
    return null;
  },

  email: (value: string): string | null => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
      return 'Invalid email address.';
    }
    return null;
  },
};
