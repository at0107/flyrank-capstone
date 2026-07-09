# Workflow Analysis: PhysicsSettingsForm Implementation

## Overview
The goal of this assignment was to compare the efficacy of vague versus precise AI prompting in frontend development using a simple "Physics Settings Form".

## Round 1: Vague Prompt ("Build a settings form for my project")
In the `feature-vague` branch, I provided a single, non-descriptive prompt.
- **Correctness:** The AI generated a generic HTML form. It lacked any logic for state management or data handling.
- **Accessibility:** Ignored. Inputs were not labeled, and no ARIA attributes were used.
- **Edge Cases:** Entirely ignored. No validation was present.
- **Review Effort:** High. I would have had to rewrite the entire component to make it usable.

## Round 2: Precise Prompt
In the `feature-precise` branch, I provided a constraint-based prompt defining mass, velocity, angle ranges, and validation logic.
- **Correctness:** The code was production-ready. State management was handled via React `useState`, and the logic accurately captured the numeric input requirements.
- **Accessibility:** The AI added appropriate `label` tags and placeholder attributes, making it much more accessible.
- **Edge Cases:** Handled via validation. Negative numbers for mass were blocked, and the angle input was restricted to the 0-90 degree range.
- **Review Effort:** Minimal. I only had to verify that the logic matched my physics simulation requirements.

## Comparison & Conclusion
The experiment highlights that AI is not a "magic" solver but a force multiplier that depends entirely on the specificity of the input. Vague prompts lead to generic, bloated, or non-functional code (as seen in Round 1). Precise prompts, which include constraints and validation requirements, force the AI to act as a junior developer who follows technical specifications. Moving forward, I will prioritize defining state constraints and validation rules before asking for any UI generation.