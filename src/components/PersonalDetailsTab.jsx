import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const PersonalDetailsTab = ({ formData, updateField, fieldErrors = {}, setFieldErrors }) => {
  const handleDateOfBirthChange = (e) => {
    const selectedDate = e.target.value;
    updateField("dateOfBirth", selectedDate);
    
    // Clear error when user starts typing
    if (fieldErrors.dateOfBirth && setFieldErrors) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.dateOfBirth;
        return newErrors;
      });
    }
    
    // Validate age if date is selected
    if (selectedDate) {
      const today = new Date();
      const birthDate = new Date(selectedDate);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      
      // Calculate exact age
      let exactAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        exactAge--;
      }
      
      // Check if person is at least 18 years old
      if (exactAge < 18) {
        if (setFieldErrors) {
          setFieldErrors((prev) => ({
            ...prev,
            dateOfBirth: "You must be at least 18 years old to register.",
          }));
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></Label>
          <input
            type="date"
            id="dateOfBirth"
            value={formData.dateOfBirth || ""}
            onChange={handleDateOfBirthChange}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            className={`border rounded px-3 py-2 w-full ${
              fieldErrors.dateOfBirth ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
          />
          {fieldErrors.dateOfBirth && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.dateOfBirth}</p>
          )}
        </div>

        {/* we are calculating age on the basis of date of birth */}

        <div>
          <Label htmlFor="timeOfBirth">Time of Birth</Label>
          <input
            type="time"
            id="timeOfBirth"
            value={formData.timeOfBirth}
            onChange={(e) => updateField("timeOfBirth", e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <Label htmlFor="birthLocation">Place of Birth</Label>
          <Input
            id="birthLocation"
            value={formData.birthLocation || ""}
            onChange={(e) => updateField("birthLocation", e.target.value)}
            placeholder="e.g. Mumbai, Pune"
          />
        </div>
      </div>

      {/* We are taking height in cm need to convert it into feet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="height">Height <span className="text-red-500">*</span></Label>
          <Input
            id="height"
            type="number"
            min="0"
            value={formData.height || ""}
            onChange={(e) => updateField("height", e.target.value)}
            placeholder="e.g., 160"
            className={fieldErrors.height ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.height && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.height}</p>
          )}
        </div>

        <div>
          <Label htmlFor="weight">Weight <span className="text-red-500">*</span></Label>
          <Input
            id="weight"
            type="number"
            min="0"
            value={formData.weight || ""}
            onChange={(e) => updateField("weight", e.target.value)}
            placeholder="e.g., 65"
            className={fieldErrors.weight ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.weight && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.weight}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bodyType">Body Type <span className="text-red-500">*</span></Label>
          <Select
            value={formData.bodyType}
            onValueChange={(value) => updateField("bodyType", value)}
          >
            <SelectTrigger className={fieldErrors.bodyType ? "border-red-500 focus-visible:ring-red-500" : ""}>
              <SelectValue placeholder="Select body type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Slim">Slim</SelectItem>
              <SelectItem value="Athletic">Athletic</SelectItem>
              <SelectItem value="Average">Average</SelectItem>
              <SelectItem value="Heavy">Heavy</SelectItem>
            </SelectContent>
          </Select>
          {fieldErrors.bodyType && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.bodyType}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bloodGroup">Blood Type</Label>
          <Select
            value={formData.bloodGroup}
            onValueChange={(value) => updateField("bloodGroup", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="skinTone">Skin Tone</Label>
          <Select
            value={formData.skinTone}
            onValueChange={(value) => updateField("skinTone", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Skin Tone type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Olive">Olive</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="maritalStatus">Marital Status <span className="text-red-500">*</span></Label>
          <Select
            value={formData.maritalStatus}
            onValueChange={(value) => updateField("maritalStatus", value)}
          >
            <SelectTrigger className={fieldErrors.maritalStatus ? "border-red-500 focus-visible:ring-red-500" : ""}>
              <SelectValue placeholder="Select Marital Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Never Married">Never Married</SelectItem>
              <SelectItem value="Widower">Widower</SelectItem>
              <SelectItem value="Awaiting Divorce">Awaiting Divorce</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
              <SelectItem value="Widow">Widow</SelectItem>
            </SelectContent>
          </Select>
          {fieldErrors.maritalStatus && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.maritalStatus}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="physicalDisability">Physical Disability <span className="text-red-500">*</span></Label>
          <Select
            value={formData.physicalDisability}
            onValueChange={(value) => updateField("physicalDisability", value)}
          >
            <SelectTrigger className={fieldErrors.physicalDisability ? "border-red-500 focus-visible:ring-red-500" : ""}>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
          {fieldErrors.physicalDisability && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.physicalDisability}</p>
          )}
        </div>

        <div>
          <Label htmlFor="drinkingHabits">Drinking Habits <span className="text-red-500">*</span></Label>
          <Select
            value={formData.drinkingHabits}
            onValueChange={(value) => updateField("drinkingHabits", value)}
          >
            <SelectTrigger className={fieldErrors.drinkingHabits ? "border-red-500 focus-visible:ring-red-500" : ""}>
              <SelectValue placeholder="Select Drinking Habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Occassionally">Occassionally</SelectItem>
              <SelectItem value="Yes">Yes</SelectItem>
            </SelectContent>
          </Select>
          {fieldErrors.drinkingHabits && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.drinkingHabits}</p>
          )}
        </div>

        <div>
          <Label htmlFor="smokingHabits">Smoking Habits <span className="text-red-500">*</span></Label>
          <Select
            value={formData.smokingHabits}
            onValueChange={(value) => updateField("smokingHabits", value)}
          >
            <SelectTrigger className={fieldErrors.smokingHabits ? "border-red-500 focus-visible:ring-red-500" : ""}>
              <SelectValue placeholder="Select Smoking Habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Occassionally">Occassionally</SelectItem>
              <SelectItem value="Yes">Yes</SelectItem>
            </SelectContent>
          </Select>
          {fieldErrors.smokingHabits && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.smokingHabits}</p>
          )}
        </div>

        <div>
          <Label htmlFor="hobbies">Hobbies</Label>
          <Input
            id="hobbies"
            value={formData.hobbies || ""}
            onChange={(e) => updateField("hobbies", e.target.value)}
            placeholder="e.g., Reading , Drawing , Singning"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsTab;
