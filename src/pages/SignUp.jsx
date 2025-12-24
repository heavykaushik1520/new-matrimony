import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { v4 as uuidv4 } from "uuid";
import {
  Menu,
  X,
  User,
  Heart,
  Star,
  Briefcase,
  Users,
  Image as ImageIcon,
  Save,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
// import PersonalDetailsTab from './PersonalDetailsTab';
import AstrologyTab from "../components/AstrologyTab";
import CareerTab from "../components/CareerTab";
import FamilyTab from "../components/FamilyTab";
import PersonalDetailsTab from "../components/PersonalDetailsTab";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import IdTab from "../components/IdTab";
import { postData } from "../store/utils";
import { apiHost } from "@/constant";

// Options: key-value pairs used in selects
const RELIGIONS = [
  { value: "Buddhism", label: "Buddhism" },
  { value: "Christian", label: "Christian" },
  { value: "Hindu", label: "Hindu" },
  { value: "Muslim", label: "Muslim" },
  { value: "Jain", label: "Jain" },
  { value: "Jewish", label: "Jewish" },
  { value: "Parsi", label: "Parsi" },
  { value: "Sikh", label: "Sikh" },
  { value: "Spiritual - not religious", label: "Spiritual - not religious" },
  { value: "No Religion", label: "No Religion" },
];

const CASTES = [
  { value: "Baniya", label: "Baniya" },
  { value: "Banjara", label: "Banjara" },
  { value: "Bari", label: "Bari" },
  { value: "Berad", label: "Berad" },
  { value: "Bhoep", label: "Bhoep" },
  { value: "Brahman", label: "Brahman" },
  { value: "Buddha", label: "Buddha" },
  { value: "Burud", label: "Burud" },
  { value: "Chambhar", label: "Chambhar" },
  { value: "Dhangar", label: "Dhangar" },
  { value: "Dhiwar", label: "Dhiwar" },
  { value: "Dhobi", label: "Dhobi" },
  { value: "Dombari", label: "Dombari" },
  { value: "Gandali", label: "Gandali" },
  { value: "Gavali", label: "Gavali" },
  { value: "Golkar", label: "Golkar" },
  { value: "Gond", label: "Gond" },
  { value: "Govind", label: "Govind" },
  { value: "Gowari", label: "Gowari" },
  { value: "Gurav", label: "Gurav" },
  { value: "Hanber", label: "Hanber" },
  { value: "Holar", label: "Holar" },
  { value: "Holi", label: "Holi" },
  { value: "Jain", label: "Jain" },
  { value: "Kalar", label: "Kalar" },
  { value: "Karvi", label: "Karvi" },
  { value: "Kohali", label: "Kohali" },
  { value: "Kolam", label: "Kolam" },
  { value: "Koli", label: "Koli" },
  { value: "Korku", label: "Korku" },
  { value: "Koshti", label: "Koshti" },
  { value: "Kumbi", label: "Kumbi" },
  { value: "Kumhar", label: "Kumhar" },
  { value: "Kunbi", label: "Kunbi" },
  { value: "Laman", label: "Laman" },
  { value: "Lingayat", label: "Lingayat" },
  { value: "Lodhi", label: "Lodhi" },
  { value: "Lohar", label: "Lohar" },
  { value: "Mahar", label: "Mahar" },
  { value: "Mali", label: "Mali" },
  { value: "Mana", label: "Mana" },
  { value: "Mang", label: "Mang" },
  { value: "Maratha", label: "Maratha" },
  { value: "Marwadi", label: "Marwadi" },
  { value: "Matang", label: "Matang" },
  { value: "Mavi", label: "Mavi" },
  { value: "Muslim", label: "Muslim" },
  { value: "Nathjogi", label: "Nathjogi" },
  { value: "Nhavi", label: "Nhavi" },
  { value: "Panchal", label: "Panchal" },
  { value: "Pardesi", label: "Pardesi" },
  { value: "Pardi", label: "Pardi" },
  { value: "Parit", label: "Parit" },
  { value: "Pathan", label: "Pathan" },
  { value: "Powar", label: "Powar" },
  { value: "Pinjara", label: "Pinjara" },
  { value: "Pradhan", label: "Pradhan" },
  { value: "Rajput", label: "Rajput" },
  { value: "Ramoshi", label: "Ramoshi" },
  { value: "Sayed", label: "Sayed" },
  { value: "Shikaghar", label: "Shikaghar" },
  { value: "Shimpi", label: "Shimpi" },
  { value: "Sonar", label: "Sonar" },
  { value: "Sutar", label: "Sutar" },
  { value: "Teli", label: "Teli" },
  { value: "Wani", label: "Wani" },
  { value: "Wadar", label: "Wadar" },
  { value: "Wadhi", label: "Wadhi" },
  { value: "Wami", label: "Wami" },
  { value: "Wathi", label: "Wathi" },
];

const COMMUNITIES = [
  { value: "Marathi", label: "Marathi" },
  { value: "Tamil", label: "Tamil" },
  { value: "Urdu", label: "Urdu" },
  { value: "Malyalam", label: "Malyalam" },
  { value: "Kannada", label: "Kannada" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Telugu", label: "Telugu" },
  { value: "Hindi", label: "Hindi" },
  { value: "Arabic", label: "Arabic" },
  { value: "Arunachali", label: "Arunachali" },
  { value: "Assamese", label: "Assamese" },
  { value: "Bengali", label: "Bengali" },
  { value: "Bhojpuri", label: "Bhojpuri" },
  { value: "Chattisgarhi", label: "Chattisgarhi" },
  { value: "Chinese", label: "Chinese" },
  { value: "English", label: "English" },
  { value: "French", label: "French" },
  { value: "Gujrati", label: "Gujrati" },
  { value: "Haryanavi", label: "Haryanavi" },
  { value: "Pahari", label: "Pahari" },
  { value: "Manipuri", label: "Manipuri" },
  { value: "Marwari", label: "Marwari" },
  { value: "Mizo", label: "Mizo" },
  { value: "Rajsthani", label: "Rajsthani" },
  { value: "Russian", label: "Russian" },
  { value: "Spanish", label: "Spanish" },
];

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "Male",
    maritalStatus: "",
    glasses: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [draftExists, setDraftExists] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [validatedTabs, setValidatedTabs] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    // console.log("updateField", field, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing/fixing the field
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleTabChange = (value) => {
    // Prevent direct tab navigation - only allow via Next/Back buttons
    // Allow navigation only if it's going to a previously validated tab or the next sequential tab
    const tabOrder = ["basic", "personal", "astro", "career", "family", "id"];
    const currentIndex = tabOrder.indexOf(activeTab);
    const targetIndex = tabOrder.indexOf(value);
    
    // Only allow navigation to next tab if current tab is validated, or going back
    if (targetIndex > currentIndex) {
      // Trying to go forward - validate current tab first
      let isValid = false;
      if (activeTab === "basic") {
        isValid = validateBasicTab();
      } else if (activeTab === "personal") {
        isValid = validatePersonalTab();
      } else if (activeTab === "astro") {
        isValid = validateAstroTab();
      } else if (activeTab === "career") {
        isValid = validateCareerTab();
      } else if (activeTab === "family") {
        isValid = validateFamilyTab();
      } else if (activeTab === "id") {
        isValid = validateIdTab();
      }
      
      if (!isValid) {
        return; // Block navigation
      }
      
      // Mark current tab as validated
      setValidatedTabs((prev) => new Set([...prev, activeTab]));
    }
    
    // Allow navigation if going back or if current tab is validated
    setActiveTab(value);
    setMobileMenuOpen(false);
  };

  const requiredFields = useMemo(
    () => ["firstname", "lastname", "phone", "caste"],
    []
  );

  const isCreateProfileEnabled = useMemo(() => {
    // Basic tab required fields
    const hasPhoto =
      (Array.isArray(formData.profilePhotos) && formData.profilePhotos.length > 0) ||
      (!!formData.photoFile);
    if (!hasPhoto) return false;

    if (!formData.firstname?.trim()) return false;
    if (!formData.lastname?.trim()) return false;
    if (!formData.gender?.trim()) return false;
    if (!formData.religion?.trim()) return false;

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) return false;
    if (
      !formData.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      return false;
    if (!formData.knownLanguages?.trim()) return false;
    if (!formData.diet?.trim()) return false;

    // Personal tab required fields
    if (!formData.dateOfBirth?.trim()) return false;
    if (!formData.height || !formData.height.toString().trim()) return false;
    if (!formData.weight || !formData.weight.toString().trim()) return false;
    if (!formData.bodyType?.trim()) return false;
    if (!formData.maritalStatus?.trim()) return false;
    if (!formData.physicalDisability?.trim()) return false;
    if (!formData.drinkingHabits?.trim()) return false;
    if (!formData.smokingHabits?.trim()) return false;

    // Career tab required fields
    if (!formData.education?.trim()) return false;
    if (!formData.annualSalary?.trim()) return false;

    // Id tab required fields
    if (!formData.termsAccepted) return false;

    // Password is optional, but if present must be valid
    if (formData.password && formData.password.length > 0) {
      const PASSWORD_REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!PASSWORD_REGEX.test(formData.password)) return false;
    }

    return true;
  }, [formData]);
  const completionPercent = useMemo(() => {
    const total = requiredFields.length;
    const done = requiredFields.filter(
      (f) => (formData[f] || "").toString().trim().length > 0
    ).length;
    return Math.round((done / total) * 100);
  }, [formData, requiredFields]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("signupDraft");
      if (raw) setDraftExists(true);
    } catch {}
  }, []);

  const saveDraft = () => {
    try {
      localStorage.setItem("signupDraft", JSON.stringify(formData));
      setDraftExists(true);
      toast({ title: "Draft saved" });
    } catch {}
  };

  const loadDraft = () => {
    try {
      const raw = localStorage.getItem("signupDraft");
      if (raw) {
        setFormData(JSON.parse(raw));
        toast({ title: "Draft loaded" });
      }
    } catch {}
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem("signupDraft");
      setDraftExists(false);
      toast({ title: "Draft cleared" });
    } catch {}
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, "");
    updateField("phone", digitsOnly);

    // Clear field errors for phone when user starts typing
    if (fieldErrors.phone) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }

    if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
      setPhoneError("Mobile Number must contain exactly 10 digits.");
    } else if (digitsOnly.length === 10) {
      setPhoneError("");
    } else {
      setPhoneError("");
    }
  };

  const validateBasicTab = () => {
    const errors = {};

    // Validate photos
    if (!formData.profilePhotos || 
        (Array.isArray(formData.profilePhotos) && formData.profilePhotos.length === 0) ||
        (!Array.isArray(formData.profilePhotos) && !formData.photoFile)) {
      errors.profilePhotos = "At least one photo is required.";
    }

    if (!formData.firstname?.trim()) {
      errors.firstname = "First name is required.";
    }
    if (!formData.lastname?.trim()) {
      errors.lastname = "Last name is required.";
    }
    if (!formData.gender?.trim()) {
      errors.gender = "Gender is required.";
    }
    if (!formData.religion?.trim()) {
      errors.religion = "Religion is required.";
    }
    if (!formData.phone || !formData.phone.trim()) {
      errors.phone = "Mobile Number is required.";
      setPhoneError("Mobile Number is required.");
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Mobile Number must be exactly 10 digits.";
      setPhoneError("Mobile Number must be exactly 10 digits.");
    } else {
      // Clear phone error if valid
      setPhoneError("");
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Valid email is required.";
    }
    if (!formData.knownLanguages?.trim()) {
      errors.knownLanguages = "Known language is required.";
    }
    if (!formData.diet?.trim()) {
      errors.diet = "Diet is required.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Please fill all required fields",
        description: "Fields marked with * are mandatory in Basic Info.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const validatePersonalTab = () => {
    const errors = {};

    if (!formData.dateOfBirth?.trim()) {
      errors.dateOfBirth = "Date of Birth is required.";
    } else {
      // Validate age - must be at least 18 years old
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      
      // Calculate exact age
      let exactAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        exactAge--;
      }
      
      if (exactAge < 18) {
        errors.dateOfBirth = "You must be at least 18 years old to register.";
      }
    }
    if (!formData.height || !formData.height.toString().trim()) {
      errors.height = "Height is required.";
    }
    if (!formData.weight || !formData.weight.toString().trim()) {
      errors.weight = "Weight is required.";
    }
    if (!formData.bodyType?.trim()) {
      errors.bodyType = "Body Type is required.";
    }
    if (!formData.maritalStatus?.trim()) {
      errors.maritalStatus = "Marital Status is required.";
    }
    if (!formData.physicalDisability?.trim()) {
      errors.physicalDisability = "Physical Disability is required.";
    }
    if (!formData.drinkingHabits?.trim()) {
      errors.drinkingHabits = "Drinking Habits is required.";
    }
    if (!formData.smokingHabits?.trim()) {
      errors.smokingHabits = "Smoking Habits is required.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Please fill all required fields",
        description: "Fields marked with * are mandatory in Personal Details.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const validateAstroTab = () => {
    // Astrology tab - all fields are optional, so validation always passes
    // But we can add validation if needed in the future
    return true;
  };

  const validateCareerTab = () => {
    const errors = {};

    if (!formData.education?.trim()) {
      errors.education = "Education is required.";
    }
    if (!formData.annualSalary?.trim()) {
      errors.annualSalary = "Annual Salary is required.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Please fill all required fields",
        description: "Fields marked with * are mandatory in Career tab.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const validateFamilyTab = () => {
    // Family tab - all fields are optional, so validation always passes
    // But we can add validation if needed in the future
    return true;
  };

  const validateIdTab = () => {
    const errors = {};

    // Validate password if provided
    if (formData.password && formData.password.length > 0) {
      const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!PASSWORD_REGEX.test(formData.password)) {
        errors.password = "Password must contain: Min 8 chars, 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Character (@$!%*?&).";
      }
    }

    // Terms acceptance is required
    if (!formData.termsAccepted) {
      errors.termsAccepted = "You must accept the Terms and Conditions.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Please complete all required fields",
        description: "Please check the ID tab fields.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all tabs before submission
    if (!validateBasicTab()) {
      setActiveTab("basic");
      return;
    }
    if (!validatePersonalTab()) {
      setActiveTab("personal");
      return;
    }
    if (!validateCareerTab()) {
      setActiveTab("career");
      return;
    }
    if (!validateIdTab()) {
      setActiveTab("id");
      return;
    }

    // All validations passed, proceed with API call
    setIsSubmitting(true);
    try {
        // Build multipart form-data like provided cURL
        const fd = new FormData();

        // Basic + Personal
        fd.append("firstname", formData.firstname || "");
        fd.append("lastname", formData.lastname || "");
        fd.append("gender", formData.gender || "");
        fd.append("religion", formData.religion || "");
        fd.append("caste", formData.caste || "");
        fd.append("subCaste", formData.subCaste || "");
        fd.append("community", formData.community || "");
        fd.append("dateOfBirth", formData.dateOfBirth || "");
        fd.append("timeOfBirth", formData.timeOfBirth || "");
        fd.append("phone", formData.phone || "");
        fd.append("email", formData.email || "");
        fd.append("knownLanguages", formData.knownLanguages || "");
        fd.append("diet", formData.diet || "");
        fd.append(
          "birthLocation",
          formData.birthLocation || formData.birthPlace || ""
        );
        fd.append("maritalStatus", formData.maritalStatus || "");
        fd.append("height", formData.height || "");
        fd.append("weight", formData.weight || "");
        fd.append("bodyType", formData.bodyType || "");
        fd.append("bloodGroup", formData.bloodGroup || "");
        fd.append("physicalDisability", formData.physicalDisability || "");
        fd.append("skinTone", formData.skinTone || "");
        fd.append("drinkingHabits", formData.drinkingHabits || "");
        fd.append("smokingHabits", formData.smokingHabits || "");

        const hobbiesArray = Array.isArray(formData.hobbies)
          ? formData.hobbies
          : (formData.hobbies || "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
        fd.append("hobbies", JSON.stringify(hobbiesArray));

        // Files
        if (Array.isArray(formData.profilePhotos)) {
          formData.profilePhotos.forEach((f) => {
            if (f) fd.append("profilePhotos", f, f.name);
          });
        } else if (formData.photoFile) {
          fd.append(
            "profilePhotos",
            formData.photoFile,
            formData.photoFile.name
          );
        }
        if (formData.idProof) fd.append("idProof", formData.idProof);

        // Auth/consents
        if (formData.password) fd.append("password", formData.password);
        if (typeof formData.termsAccepted !== "undefined")
          fd.append("termsAccepted", String(!!formData.termsAccepted));

        // Nested sections
        const userCareerInfo = {
          education: formData.education || "",
          jobSector: formData.jobSector || "",
          jobTitle: formData.jobTitle || "",
          jobLocation: formData.jobLocation || "",
          jobDescription: formData.jobDescription || "",
          annualSalary: formData.annualSalary || "",
        };
        fd.append("userCareerInfo", JSON.stringify(userCareerInfo));

        const familyInfo = {
          fatherName: formData.fatherName || "",
          motherName: formData.motherName || "",
          liveWithFamily: formData.liveWithFamily || "",
          brothersCount: Number(formData.brothersCount ?? 0),
          sistersCount: Number(formData.sistersCount ?? 0),
          relativesSurname: Array.isArray(formData.relativesSurname)
            ? formData.relativesSurname
            : (formData.relativesSurname || "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        };
        fd.append("familyInfo", JSON.stringify(familyInfo));

        const astrologyInfo = {
          ras: formData.ras || formData.rashi || "",
          gan: formData.gan || "",
          mangal: formData.mangal || "",
          nadis: formData.nadis || "",
          charan: formData.charan || "",
          nakshatra: formData.nakshatra || "",
          gotra: formData.gotra || "",
        };
        fd.append("astrologyInfo", JSON.stringify(astrologyInfo));

        // const response = await axios.post(
        //   `${apiHost.baseURL}user/auth/signup`,
        //   fd,
        //   {
        //     headers: { "Content-Type": "multipart/form-data" },
        //   }
        // );
        const endpoint = `${apiHost.baseURL.replace(
          /\/$/,
          ""
        )}/user/auth/signup`;

        const response = await axios.post(endpoint, fd);

        // console.log("signup response", response?.data);

        toast({
          title: "Account created",
          description: "Welcome to Hrudaysparsha Vivah Mandal!",
          className: "bg-green-500 text-white border-green-600 [&>button]:text-white",
        });
        navigate("/login");
      } catch (error) {
        console.error("Error saving file upload request:", error);

        // Prefer backend validation errors (e.g. phone must be unique)
        let description = "Failed to create profile. Please try again.";
        const apiError = error?.response?.data;

        if (apiError?.errors && Array.isArray(apiError.errors) && apiError.errors.length > 0) {
          // Join all field error messages
          description = apiError.errors
            .map((err) =>
              err.field ? `${err.message}` : err.message
            )
            .join("\n");
        } else if (apiError?.message) {
          description = apiError.message;
        }

        toast({
          title: "Error",
          description,
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
  };

  const tabItems = [
    { value: "basic", label: "Basic Info", icon: User },
    { value: "personal", label: "Personal", icon: Heart },
    { value: "astro", label: "Astrology", icon: Star },
    { value: "career", label: "Career", icon: Briefcase },
    { value: "family", label: "Family", icon: Users },
    { value: "id", label: "Id", icon: Users },
  ];

  return (
    <Card className="max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 shadow-2xl border-2 border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">
          Create Matrimony Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Progress */}
        {/* <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Completion: {completionPercent}%
          </div>
        </div> */}

        <form onSubmit={handleSubmit}>
          {/* Mobile Navigation */}
          <div className="md:hidden mb-4">
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-3">
              <span className="font-medium text-gray-700">
                {tabItems.find((item) => item.value === activeTab)?.label}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>

            {mobileMenuOpen && (
              <div className="mt-2 bg-white rounded-lg shadow-lg border divide-y">
                {tabItems.map((item) => {
                  const Icon = item.icon;
                  const tabOrder = ["basic", "personal", "astro", "career", "family", "id"];
                  const currentIndex = tabOrder.indexOf(activeTab);
                  const itemIndex = tabOrder.indexOf(item.value);
                  const isDisabled = itemIndex > currentIndex + 1 || (itemIndex > currentIndex && !validatedTabs.has(activeTab));
                  
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        if (isDisabled) {
                          toast({
                            title: "Please complete tabs in order",
                            description: "You must complete each tab sequentially using the Next button.",
                            variant: "destructive",
                          });
                          return;
                        }
                        handleTabChange(item.value);
                      }}
                      disabled={isDisabled}
                      className={`w-full flex items-center space-x-3 p-3 text-left transition-colors ${
                        isDisabled
                          ? "opacity-50 cursor-not-allowed text-gray-400"
                          : activeTab === item.value
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              // Prevent direct tab clicking - only allow sequential navigation via Next/Back
              const tabOrder = ["basic", "personal", "astro", "career", "family", "id"];
              const currentIndex = tabOrder.indexOf(activeTab);
              const targetIndex = tabOrder.indexOf(value);
              
              // Only allow going to next tab if current is validated, or going back
              if (targetIndex > currentIndex + 1) {
                toast({
                  title: "Please complete tabs in order",
                  description: "You must complete each tab sequentially using the Next button.",
                  variant: "destructive",
                });
                return;
              }
              
              // Allow going back or to next sequential tab
              if (targetIndex <= currentIndex || validatedTabs.has(activeTab) || targetIndex === currentIndex + 1) {
                handleTabChange(value);
              } else {
                toast({
                  title: "Please complete current tab",
                  description: "Please complete the current tab before proceeding.",
                  variant: "destructive",
                });
              }
            }}
            className="w-full"
          >
            {/* Desktop Navigation */}
            <TabsList className="hidden md:grid w-full grid-cols-6">
              {tabItems.map((item) => {
                const tabOrder = ["basic", "personal", "astro", "career", "family", "id"];
                const currentIndex = tabOrder.indexOf(activeTab);
                const itemIndex = tabOrder.indexOf(item.value);
                const isDisabled = itemIndex > currentIndex + 1 || (itemIndex > currentIndex && !validatedTabs.has(activeTab));
                
                return (
                  <TabsTrigger 
                    key={item.value} 
                    value={item.value}
                    disabled={isDisabled}
                    className={isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    {item.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="photo">Photo <span className="text-red-500">*</span> <span className="text-red-500 text-sm">(Maximum 5 pics with no makeup)</span></Label>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      {/* show up to 4 thumbnail previews */}
                      {photoPreviews.length ? (
                        photoPreviews.slice(0, 4).map((p, i) => (
                          <div
                            key={i}
                            className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden ring-2 ring-blue-200"
                          >
                            <img
                              src={p}
                              alt={`preview-${i}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <div className={`h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ring-2 ${
                          fieldErrors.profilePhotos ? "ring-red-500" : "ring-blue-200"
                        }`}>
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      multiple
                      className={fieldErrors.profilePhotos ? "border-red-500 focus-visible:ring-red-500" : ""}
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length === 0) return;

                        // store actual File objects for upload
                        updateField("profilePhotos", files);

                        // set preview URLs
                        const urls = files.map((f) => URL.createObjectURL(f));
                        setPhotoPreviews(urls);

                        // optionally store first file separately (if other code expects photoFile)
                        updateField("photoFile", files[0]);
                        updateField("photoName", files[0]?.name || "");

                        // Clear photo error when files are selected
                        if (fieldErrors.profilePhotos) {
                          setFieldErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.profilePhotos;
                            return newErrors;
                          });
                        }
                      }}
                    />
                  </div>
                  {fieldErrors.profilePhotos && (
                    <p className="text-sm text-red-500 mt-1">{fieldErrors.profilePhotos}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstname">First Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="firstname"
                      value={formData.firstname || ""}
                      onChange={(e) => updateField("firstname", e.target.value)}
                      required
                      className={fieldErrors.firstname ? "border-red-500 focus-visible:ring-red-500" : ""}
                      placeholder="Enter your first name"
                    />
                    {fieldErrors.firstname && (
                      <p className="text-sm text-red-500 mt-1">{fieldErrors.firstname}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastname">Last Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="lastname"
                      value={formData.lastname || ""}
                      onChange={(e) => updateField("lastname", e.target.value)}
                      required
                      className={fieldErrors.lastname ? "border-red-500 focus-visible:ring-red-500" : ""}
                      placeholder="Enter your last name"
                    />
                    {fieldErrors.lastname && (
                      <p className="text-sm text-red-500 mt-1">{fieldErrors.lastname}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => updateField("gender", value)}
                  >
                    <SelectTrigger className={fieldErrors.gender ? "border-red-500 focus-visible:ring-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldErrors.gender && (
                    <p className="text-sm text-red-500 mt-1">{fieldErrors.gender}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="religion">Religion <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.religion}
                    onValueChange={(value) => updateField("religion", value)}
                  >
                    <SelectTrigger className={fieldErrors.religion ? "border-red-500 focus-visible:ring-red-500" : ""}>
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      {RELIGIONS.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors.religion && (
                    <p className="text-sm text-red-500 mt-1">{fieldErrors.religion}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="caste">Caste</Label>
                  <Select
                    value={formData.caste}
                    onValueChange={(value) => updateField("caste", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select caste" />
                    </SelectTrigger>
                    <SelectContent>
                      {CASTES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subCaste">Sub-Caste</Label>
                  <Input
                    id="subCaste"
                    value={formData.subCaste || ""}
                    onChange={(e) => updateField("subCaste", e.target.value)}
                    placeholder="Enter your sub-caste"
                  />
                </div>
                <div>
                  <Label htmlFor="community">Community</Label>
                  <Select
                    value={formData.community}
                    onValueChange={(value) => updateField("community", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select community" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMUNITIES.map((cm) => (
                        <SelectItem key={cm.value} value={cm.value}>
                          {cm.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="phone">Mobile Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={handlePhoneChange}
                    required
                    type="tel"
                    maxLength={10} 
                    className={
                      phoneError || fieldErrors.phone
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                    placeholder="Enter your mobile number"
                  />
                  {phoneError && (
                    <p className="text-sm text-red-500 mt-1">{phoneError}</p>
                  )}
                  {!phoneError && fieldErrors.phone && (
                    <p className="text-sm text-red-500 mt-1">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Enter your email"
                    className={`border rounded px-3 py-2 w-full ${
                      fieldErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="knownLanguages">Known Language <span className="text-red-500">*</span></Label>
                  <Input
                    id="knownLanguages"
                    value={formData.knownLanguages || ""}
                    onChange={(e) =>
                      updateField("knownLanguages", e.target.value)
                    }
                    placeholder="Marathi, Hindi"
                    required
                    className={fieldErrors.knownLanguages ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {fieldErrors.knownLanguages && (
                    <p className="text-sm text-red-500 mt-1">{fieldErrors.knownLanguages}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="diet">Diet <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.diet}
                    onValueChange={(value) => updateField("diet", value)}
                  >
                    <SelectTrigger className={fieldErrors.diet ? "border-red-500 focus-visible:ring-red-500" : ""}>
                      <SelectValue placeholder="Select Diet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Non-Vegetarian">
                        Non-Vegetarian
                      </SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                      <SelectItem value="Eggetarian">Eggetarian</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldErrors.diet && (
                    <p className="text-sm text-red-500 mt-1">{fieldErrors.diet}</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="personal">
              <PersonalDetailsTab
                formData={formData}
                updateField={updateField}
                fieldErrors={fieldErrors}
                setFieldErrors={setFieldErrors}
              />
            </TabsContent>

            <TabsContent value="astro">
              <AstrologyTab formData={formData} updateField={updateField} />
            </TabsContent>

            <TabsContent value="career">
              <CareerTab formData={formData} updateField={updateField} fieldErrors={fieldErrors} />
            </TabsContent>

            <TabsContent value="family">
              <FamilyTab formData={formData} updateField={updateField} />
            </TabsContent>

            <TabsContent value="id">
              <IdTab formData={formData} updateField={updateField} fieldErrors={fieldErrors} />
            </TabsContent>
          </Tabs>

          {/* Navigation + Draft actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-6 border-t mt-6">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const order = tabItems.map((t) => t.value);
                  const idx = order.indexOf(activeTab);
                  if (idx > 0) setActiveTab(order[idx - 1]);
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              {activeTab !== "id" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    let isValid = false;
                    
                    if (activeTab === "basic") {
                      isValid = validateBasicTab();
                    } else if (activeTab === "personal") {
                      isValid = validatePersonalTab();
                    } else if (activeTab === "astro") {
                      isValid = validateAstroTab();
                    } else if (activeTab === "career") {
                      isValid = validateCareerTab();
                    } else if (activeTab === "family") {
                      isValid = validateFamilyTab();
                    } else if (activeTab === "id") {
                      isValid = validateIdTab();
                    }
                    
                    if (!isValid) return;
                    
                    // Mark current tab as validated
                    setValidatedTabs((prev) => new Set([...prev, activeTab]));
                    
                    const order = tabItems.map((t) => t.value);
                    const idx = order.indexOf(activeTab);
                    if (idx < order.length - 1) {
                      handleTabChange(order[idx + 1]);
                    }
                  }}
                >
                  Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>

            {/* <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={saveDraft}>
                <Save className="w-4 h-4 mr-1" /> Save draft
              </Button>
              {draftExists && (
                <>
                  <Button type="button" variant="outline" onClick={loadDraft}>
                    <RotateCcw className="w-4 h-4 mr-1" /> Load
                  </Button>
                  <Button type="button" variant="outline" onClick={clearDraft}>
                    Clear
                  </Button>
                </>
              )}
            </div> */}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => navigate("/")}
                variant="outline"
              >
                Cancel
              </Button>
              {activeTab === "id" && (
                <Button
                  type="submit"
                  disabled={!isCreateProfileEnabled || isSubmitting}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Profile...
                    </>
                  ) : (
                    "Create Profile"
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
