export const PHYSICS_FIELD_LIMITS = {
  mass: { min: 0.1, max: Infinity, label: "Mass" },
  velocity: { min: 0, max: Infinity, label: "Velocity" },
  angle: { min: 0, max: 90, label: "Angle" },
};

function parseNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function validatePhysicsField(fieldName, rawValue) {
  const limits = PHYSICS_FIELD_LIMITS[fieldName];

  if (!limits) {
    return "";
  }

  if (rawValue === "" || rawValue === null || rawValue === undefined) {
    return `${limits.label} is required.`;
  }

  const value = parseNumber(rawValue);

  if (Number.isNaN(value)) {
    return `${limits.label} must be a valid number.`;
  }

  if (fieldName === "mass" && value <= 0) {
    return "Mass must be a positive number.";
  }

  if (fieldName === "velocity" && value < 0) {
    return "Velocity must be zero or greater.";
  }

  if (value < limits.min) {
    return `${limits.label} must be at least ${limits.min}.`;
  }

  if (value > limits.max) {
    return `${limits.label} must be at most ${limits.max}.`;
  }

  return "";
}

export function validatePhysicsSettings(values) {
  const errors = {};

  for (const fieldName of Object.keys(PHYSICS_FIELD_LIMITS)) {
    const error = validatePhysicsField(fieldName, values[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  }

  return errors;
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}
