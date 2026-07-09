"use client";

import { useState } from "react";
import {
  validatePhysicsField,
  validatePhysicsSettings,
  hasValidationErrors,
} from "../lib/validatePhysicsSettings";

const initialValues = {
  mass: "",
  velocity: "",
  angle: "",
};

const fields = [
  {
    name: "mass",
    label: "Mass (kg)",
    type: "number",
    min: 0.1,
    step: 0.1,
    placeholder: "e.g. 2.5",
  },
  {
    name: "velocity",
    label: "Velocity (m/s)",
    type: "number",
    min: 0,
    step: 0.1,
    placeholder: "e.g. 10",
  },
  {
    name: "angle",
    label: "Angle (degrees)",
    type: "number",
    min: 0,
    max: 90,
    step: 1,
    placeholder: "0–90",
  },
];

export default function PhysicsSettingsForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({
      ...previous,
      [name]: validatePhysicsField(name, value),
    }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validatePhysicsSettings(values);
    setErrors(nextErrors);
    setTouched({ mass: true, velocity: true, angle: true });

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    const payload = {
      mass: Number(values.mass),
      velocity: Number(values.velocity),
      angle: Number(values.angle),
    };

    console.log(payload);
  }

  return (
    <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Physics Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Enter mass, velocity, and launch angle for the simulation.
        </p>
      </header>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {fields.map((field) => {
          const showError = touched[field.name] && errors[field.name];

          return (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                min={field.min}
                max={field.max}
                step={field.step}
                value={values[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                aria-invalid={showError ? "true" : "false"}
                aria-describedby={showError ? `${field.name}-error` : undefined}
                className={`w-full rounded-lg border px-3 py-2 text-slate-900 outline-none transition focus:ring-2 ${
                  showError
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
              />
              {showError ? (
                <p
                  id={`${field.name}-error`}
                  className="mt-1.5 text-sm text-red-600"
                  role="alert"
                >
                  {errors[field.name]}
                </p>
              ) : null}
            </div>
          );
        })}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Run simulation
        </button>
      </form>
    </section>
  );
}
