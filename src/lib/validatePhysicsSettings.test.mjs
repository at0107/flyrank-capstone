import {
  validatePhysicsField,
  validatePhysicsSettings,
  hasValidationErrors,
} from "./validatePhysicsSettings.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function testFieldValidation() {
  assert(
    validatePhysicsField("mass", "") === "Mass is required.",
    "Empty mass should be required"
  );
  assert(
    validatePhysicsField("mass", "abc") === "Mass must be a valid number.",
    "Non-numeric mass should fail"
  );
  assert(
    validatePhysicsField("mass", "0") === "Mass must be a positive number.",
    "Zero mass should fail"
  );
  assert(
    validatePhysicsField("mass", "0.05") === "Mass must be at least 0.1.",
    "Mass below 0.1 should fail"
  );
  assert(validatePhysicsField("mass", "0.1") === "", "Mass at minimum should pass");
  assert(validatePhysicsField("mass", "5") === "", "Valid mass should pass");

  assert(
    validatePhysicsField("velocity", "") === "Velocity is required.",
    "Empty velocity should be required"
  );
  assert(
    validatePhysicsField("velocity", "-1") === "Velocity must be zero or greater.",
    "Negative velocity should fail"
  );
  assert(validatePhysicsField("velocity", "0") === "", "Zero velocity should pass");
  assert(validatePhysicsField("velocity", "12.5") === "", "Valid velocity should pass");

  assert(
    validatePhysicsField("angle", "") === "Angle is required.",
    "Empty angle should be required"
  );
  assert(
    validatePhysicsField("angle", "-5") === "Angle must be at least 0.",
    "Angle below 0 should fail"
  );
  assert(
    validatePhysicsField("angle", "91") === "Angle must be at most 90.",
    "Angle above 90 should fail"
  );
  assert(validatePhysicsField("angle", "0") === "", "Angle at 0 should pass");
  assert(validatePhysicsField("angle", "90") === "", "Angle at 90 should pass");
}

function testFormValidation() {
  const invalid = validatePhysicsSettings({
    mass: "",
    velocity: "-2",
    angle: "100",
  });

  assert(invalid.mass, "Form validation should catch empty mass");
  assert(invalid.velocity, "Form validation should catch invalid velocity");
  assert(invalid.angle, "Form validation should catch invalid angle");
  assert(hasValidationErrors(invalid), "Invalid form should report errors");

  const valid = validatePhysicsSettings({
    mass: "2",
    velocity: "10",
    angle: "45",
  });

  assert(!hasValidationErrors(valid), "Valid form should have no errors");
}

testFieldValidation();
testFormValidation();

console.log("All physics validation tests passed.");
