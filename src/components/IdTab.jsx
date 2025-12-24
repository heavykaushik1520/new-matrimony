import React, { useState } from "react"; // Ensure useState is imported
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Import the necessary icons from lucide-react (assuming you have this setup)
import { Eye, EyeOff } from "lucide-react"; 

// Define the validation regex
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const IdTab = ({ formData, updateField, fieldErrors = {} }) => {
  // Local state to manage the password validation error message
  const [passwordError, setPasswordError] = useState("");
  // NEW STATE: State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false); 

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    updateField("password", newPassword);
    
    // 1. Check if the password is NOT empty
    if (newPassword.length > 0) {
      // 2. Test the password against the regex
      if (!PASSWORD_REGEX.test(newPassword)) {
        setPasswordError(
          "Password must contain: Min 8 chars, 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Character (@$!%*?&)."
        );
      } else {
        setPasswordError(""); // Clear error if validation passes
      }
    } else {
      setPasswordError(""); // Clear error if the field is empty
    }
  };

  // NEW FUNCTION: Toggles the showPassword state
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
          <Label htmlFor="idProof">Id Proof File <span className="text-red-500">*</span></Label>
          {/* ... Id Proof Input ... */}
          <Input
            type="file"
            id="idProof"
            accept="image/*,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                updateField("idProof", file);
                updateField("idProofFileName", file.name);
              } else {
                updateField("idProof", null);
                updateField("idProofFileName", "");
              }
            }}
          />
          {formData.idProofFileName && (
            <p className="text-xs text-gray-500 mt-1">
              {formData.idProofFileName}
            </p>
          )}
        </div>
        
        {/* Password Input Field with Validation and Toggle */}
        <div>
          <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
          <div className="relative"> {/* Use a relative container for positioning */}
            <Input
              // DYNAMIC TYPE: Set input type based on showPassword state
              type={showPassword ? "text" : "password"} 
              id="password"
              value={formData.password || ""}
              onChange={handlePasswordChange} 
              placeholder="Enter Password"
              className={passwordError || fieldErrors.password ? "border-red-500 focus:border-red-500 pr-10" : "pr-10"} 
            />
            
            {/* TOGGLE ICON */}
            <button
              type="button" // Important: use type="button" to prevent form submission
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {/* DYNAMIC ICON: Show EyeOff if visible, Eye if hidden */}
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Display the error message if it exists */}
          {(passwordError || fieldErrors.password) && (
            <p className="text-sm text-red-500 mt-1">{passwordError || fieldErrors.password}</p>
          )}
        </div>

        {/* ... Terms Accepted checkbox ... */}
        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="termsAccepted"
              className={`mr-2 ${fieldErrors.termsAccepted ? "border-red-500" : ""}`}
              checked={formData.termsAccepted || false}
              onChange={(e) => updateField("termsAccepted", e.target.checked)}
              required
            />
            <Label htmlFor="termsAccepted">Accept Terms And Conditions <span className="text-red-500">*</span></Label>
          </div>
          {fieldErrors.termsAccepted && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.termsAccepted}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdTab;