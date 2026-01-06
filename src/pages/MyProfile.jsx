import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Save, X, Trash2, Plus, ImageIcon } from "lucide-react";
import { getData, putData, putDataFormData } from "@/store/utils";
import { toast } from "@/components/ui/use-toast";

const MyProfile = () => {
  const {
    myProfile,
    saveMyProfile,
    membershipActive,
    subscriptionActive,
    buyMembership,
    buySubscription,
    user,
  } = useAppContext();
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [photoFiles, setPhotoFiles] = useState([]); // Array of File objects for new uploads
  const [photoPreviews, setPhotoPreviews] = useState([]); // Array of preview URLs (contains existing + new)

  const rawDate = data?.dateOfBirth || myProfile?.dateOfBirth;
  const birthDate = rawDate
    ? new Date(rawDate).toISOString().split("T")[0]
    : " ";

  const existingPhotos = data?.profilePhotos || myProfile?.profilePhotos || [];

  // When editing, photoPreviews contains existing photos + new previews
  // When not editing, show existing photos
  const photos = editing ? photoPreviews : existingPhotos;

  console.log("photoFiles", photoFiles);
  // Initialize form data when data loads
  useEffect(() => {
    if (data && !editing) {
      setFormData({
        firstname: data?.firstname || user?.firstname || "",
        lastname: data?.lastname || user?.lastname || "",
        gender: data?.gender || myProfile?.gender || "",
        religion: data?.religion || myProfile?.religion || "",
        caste: data?.caste || myProfile?.caste || "",
        subCaste: data?.subCaste || myProfile?.subCaste || "",
        community: data?.community || myProfile?.community || "",
        dateOfBirth: birthDate || "",
        timeOfBirth: data?.timeOfBirth || myProfile?.timeOfBirth || "",
        birthLocation: data?.birthLocation || myProfile?.birthLocation || "",
        knownLanguages: data?.knownLanguages || myProfile?.knownLanguages || "",
        diet: data?.diet || myProfile?.diet || "",
        maritalStatus: data?.maritalStatus || myProfile?.maritalStatus || "",
        bloodGroup: data?.bloodGroup || myProfile?.bloodGroup || "",
        height: data?.height || myProfile?.height || "",
        weight: data?.weight || myProfile?.weight || "",
        skinTone: data?.skinTone || myProfile?.skinTone || "",
        physicalDisability:
          data?.physicalDisability || myProfile?.physicalDisability || "",
        hobbies: Array.isArray(data?.hobbies)
          ? data.hobbies.map((h) => h.replace(/[\[\]"]/g, "")).join(", ")
          : data?.hobbies || myProfile?.hobbies || "",
        charan: data?.AstrologyInfo?.charan || user?.charan || "",
        gan: data?.AstrologyInfo?.gan || user?.gan || "",
        gotra: data?.AstrologyInfo?.gotra || user?.gotra || "",
        mangal: data?.AstrologyInfo?.mangal || user?.mangal || "",
        nadis: data?.AstrologyInfo?.nadis || user?.nadis || "",
        nakshatra: data?.AstrologyInfo?.nakshatra || user?.nakshatra || "",
        ras: data?.AstrologyInfo?.ras || user?.ras || "",
        fatherName: data?.FamilyInfo?.fatherName || user?.fatherName || "",
        motherName: data?.FamilyInfo?.motherName || user?.motherName || "",
        brothersCount:
          data?.FamilyInfo?.brothersCount || user?.brothersCount || "",
        sistersCount:
          data?.FamilyInfo?.sistersCount || user?.sistersCount || "",
        liveWithFamily:
          data?.FamilyInfo?.liveWithFamily || user?.liveWithFamily || "",
        relativesSurname: Array.isArray(data?.FamilyInfo?.relativesSurname)
          ? data.FamilyInfo.relativesSurname
              .map((h) => h.replace(/[\[\]"]/g, ""))
              .join(", ")
          : data?.FamilyInfo?.relativesSurname ||
            myProfile?.FamilyInfo?.relativesSurname ||
            "",
        education:
          data?.UserCareerInfo?.education ||
          user?.UserCareerInfo?.education ||
          "",
        jobSector:
          data?.UserCareerInfo?.jobSector ||
          user?.UserCareerInfo?.jobSector ||
          "",
        jobTitle:
          data?.UserCareerInfo?.jobTitle ||
          user?.UserCareerInfo?.jobTitle ||
          "",
        annualSalary:
          data?.UserCareerInfo?.annualSalary ||
          user?.UserCareerInfo?.annualSalary ||
          "",
        jobDescription:
          data?.UserCareerInfo?.jobDescription ||
          user?.UserCareerInfo?.jobDescription ||
          "",
        jobLocation:
          data?.UserCareerInfo?.jobLocation ||
          user?.UserCareerInfo?.jobLocation ||
          "",
      });
    }
  }, [data, editing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const basicRows = useMemo(
    () => [
      {
        label: "First Name",
        key: "firstname",
        value: data?.firstname || user?.firstname,
      },
      {
        label: "Last Name",
        key: "lastname",
        value: data?.lastname || user?.lastname,
      },
      {
        label: "Mobile No.",
        key: "phone",
        value: data?.phone || user?.phone,
        readOnly: true,
      },
      {
        label: "Email",
        key: "email",
        value: data?.email || user?.email,
        readOnly: true,
      },
      {
        label: "Gender",
        key: "gender",
        value: data?.gender || myProfile?.gender,
      },
      {
        label: "Religion",
        key: "religion",
        value: data?.religion || myProfile?.religion,
      },
      { label: "Caste", key: "caste", value: data?.caste || myProfile?.caste },
      {
        label: "Sub-Caste",
        key: "subCaste",
        value: data?.subCaste || myProfile?.subCaste,
      },
      {
        label: "Community",
        key: "community",
        value: data?.community || myProfile?.community,
      },
      {
        label: "Date Of Birth",
        key: "dateOfBirth",
        value: birthDate,
        type: "date",
      },
      {
        label: "Time Of Birth",
        key: "timeOfBirth",
        value: data?.timeOfBirth || myProfile?.timeOfBirth,
        type: "time",
      },
      {
        label: "Birth Location",
        key: "birthLocation",
        value: data?.birthLocation || myProfile?.birthLocation,
      },
      {
        label: "Known Languages",
        key: "knownLanguages",
        value: data?.knownLanguages || myProfile?.knownLanguages,
      },
      { label: "Diet", key: "diet", value: data?.diet || myProfile?.diet },
      {
        label: "Marital Status",
        key: "maritalStatus",
        value: data?.maritalStatus || myProfile?.maritalStatus,
      },
      {
        label: "Blood Group",
        key: "bloodGroup",
        value: data?.bloodGroup || myProfile?.bloodGroup,
      },
      {
        label: "Height",
        key: "height",
        value: data?.height || myProfile?.height || "",
        suffix: " cm",
      },
      {
        label: "Weight",
        key: "weight",
        value: data?.weight || myProfile?.weight || "",
        suffix: " kg",
      },
      {
        label: "Skin Tone",
        key: "skinTone",
        value: data?.skinTone || myProfile?.skinTone,
      },
      {
        label: "Physical Disability",
        key: "physicalDisability",
        value: data?.physicalDisability || myProfile?.physicalDisability,
      },
      {
        label: "Hobbies",
        key: "hobbies",
        value: Array.isArray(data?.hobbies)
          ? data.hobbies.map((h) => h.replace(/[\[\]"]/g, "")).join(", ")
          : data?.hobbies || myProfile?.hobbies,
        type: "textarea",
      },
    ],
    [data, myProfile, user, birthDate]
  );

  const astrologyRow = useMemo(
    () => [
      {
        label: "Charan",
        key: "charan",
        value: data?.AstrologyInfo?.charan || user?.charan,
      },
      {
        label: "Gan",
        key: "gan",
        value: data?.AstrologyInfo?.gan || user?.gan,
      },
      {
        label: "Gotra",
        key: "gotra",
        value: data?.AstrologyInfo?.gotra || user?.gotra,
      },
      {
        label: "Mangal",
        key: "mangal",
        value: data?.AstrologyInfo?.mangal || user?.mangal,
      },
      {
        label: "Nadis",
        key: "nadis",
        value: data?.AstrologyInfo?.nadis || user?.nadis,
      },
      {
        label: "Nakshatra",
        key: "nakshatra",
        value: data?.AstrologyInfo?.nakshatra || user?.nakshatra,
      },
      {
        label: "Raas",
        key: "ras",
        value: data?.AstrologyInfo?.ras || user?.ras,
      },
    ],
    [data, myProfile, user]
  );

  const familyRow = useMemo(
    () => [
      {
        label: "Father Name",
        key: "fatherName",
        value: data?.FamilyInfo?.fatherName || user?.fatherName,
      },
      {
        label: "Mother Name",
        key: "motherName",
        value: data?.FamilyInfo?.motherName || user?.motherName,
      },
      {
        label: "Brothers Count",
        key: "brothersCount",
        value: data?.FamilyInfo?.brothersCount || user?.brothersCount,
        type: "number",
      },
      {
        label: "Sisters Count",
        key: "sistersCount",
        value: data?.FamilyInfo?.sistersCount || user?.sistersCount,
        type: "number",
      },
      {
        label: "Live With Family ?",
        key: "liveWithFamily",
        value: data?.FamilyInfo?.liveWithFamily || user?.liveWithFamily,
      },
      {
        label: "Relative's Surname",
        key: "relativesSurname",
        value: Array.isArray(data?.FamilyInfo?.relativesSurname)
          ? data.FamilyInfo.relativesSurname
              .map((h) => h.replace(/[\[\]"]/g, ""))
              .join(", ")
          : data?.FamilyInfo?.relativesSurname ||
            myProfile?.FamilyInfo?.relativesSurname,
      },
    ],
    [data, myProfile, user]
  );

  const careerRow = useMemo(
    () => [
      {
        label: "Education",
        key: "education",
        value:
          data?.UserCareerInfo?.education || user?.UserCareerInfo?.education,
      },
      {
        label: "Job Sector",
        key: "jobSector",
        value:
          data?.UserCareerInfo?.jobSector || user?.UserCareerInfo?.jobSector,
      },
      {
        label: "Job Title",
        key: "jobTitle",
        value: data?.UserCareerInfo?.jobTitle || user?.UserCareerInfo?.jobTitle,
      },
      {
        label: "Annual Salary",
        key: "annualSalary",
        value:
          data?.UserCareerInfo?.annualSalary ||
          user?.UserCareerInfo?.annualSalary,
      },
      {
        label: "Job Description",
        key: "jobDescription",
        value:
          data?.UserCareerInfo?.jobDescription ||
          user?.UserCareerInfo?.jobDescription,
        type: "textarea",
      },
      {
        label: "Job Location",
        key: "jobLocation",
        value:
          data?.UserCareerInfo?.jobLocation ||
          user?.UserCareerInfo?.jobLocation,
      },
    ],
    [data, myProfile, user]
  );

  useEffect(() => {
    getLoanList();
  }, []);

  const getLoanList = async () => {
    try {
      const response = await getData(`user/auth/me`, null);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = () => {
    // Initialize photo previews with existing photos when entering edit mode
    const currentPhotos = data?.profilePhotos || myProfile?.profilePhotos || [];
    setPhotoPreviews([...currentPhotos]);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset photo states
    setPhotoFiles([]);
    setPhotoPreviews([]);
    // Reset form data to original values
    if (data) {
      setFormData({
        firstname: data?.firstname || user?.firstname || "",
        lastname: data?.lastname || user?.lastname || "",
        gender: data?.gender || myProfile?.gender || "",
        religion: data?.religion || myProfile?.religion || "",
        caste: data?.caste || myProfile?.caste || "",
        subCaste: data?.subCaste || myProfile?.subCaste || "",
        community: data?.community || myProfile?.community || "",
        dateOfBirth: birthDate || "",
        timeOfBirth: data?.timeOfBirth || myProfile?.timeOfBirth || "",
        birthLocation: data?.birthLocation || myProfile?.birthLocation || "",
        knownLanguages: data?.knownLanguages || myProfile?.knownLanguages || "",
        diet: data?.diet || myProfile?.diet || "",
        maritalStatus: data?.maritalStatus || myProfile?.maritalStatus || "",
        bloodGroup: data?.bloodGroup || myProfile?.bloodGroup || "",
        height: data?.height || myProfile?.height || "",
        weight: data?.weight || myProfile?.weight || "",
        skinTone: data?.skinTone || myProfile?.skinTone || "",
        physicalDisability:
          data?.physicalDisability || myProfile?.physicalDisability || "",
        hobbies: Array.isArray(data?.hobbies)
          ? data.hobbies.map((h) => h.replace(/[\[\]"]/g, "")).join(", ")
          : data?.hobbies || myProfile?.hobbies || "",
        charan: data?.AstrologyInfo?.charan || user?.charan || "",
        gan: data?.AstrologyInfo?.gan || user?.gan || "",
        gotra: data?.AstrologyInfo?.gotra || user?.gotra || "",
        mangal: data?.AstrologyInfo?.mangal || user?.mangal || "",
        nadis: data?.AstrologyInfo?.nadis || user?.nadis || "",
        nakshatra: data?.AstrologyInfo?.nakshatra || user?.nakshatra || "",
        ras: data?.AstrologyInfo?.ras || user?.ras || "",
        fatherName: data?.FamilyInfo?.fatherName || user?.fatherName || "",
        motherName: data?.FamilyInfo?.motherName || user?.motherName || "",
        brothersCount:
          data?.FamilyInfo?.brothersCount || user?.brothersCount || "",
        sistersCount:
          data?.FamilyInfo?.sistersCount || user?.sistersCount || "",
        liveWithFamily:
          data?.FamilyInfo?.liveWithFamily || user?.liveWithFamily || "",
        relativesSurname: Array.isArray(data?.FamilyInfo?.relativesSurname)
          ? data.FamilyInfo.relativesSurname
              .map((h) => h.replace(/[\[\]"]/g, ""))
              .join(", ")
          : data?.FamilyInfo?.relativesSurname ||
            myProfile?.FamilyInfo?.relativesSurname ||
            "",
        education:
          data?.UserCareerInfo?.education ||
          user?.UserCareerInfo?.education ||
          "",
        jobSector:
          data?.UserCareerInfo?.jobSector ||
          user?.UserCareerInfo?.jobSector ||
          "",
        jobTitle:
          data?.UserCareerInfo?.jobTitle ||
          user?.UserCareerInfo?.jobTitle ||
          "",
        annualSalary:
          data?.UserCareerInfo?.annualSalary ||
          user?.UserCareerInfo?.annualSalary ||
          "",
        jobDescription:
          data?.UserCareerInfo?.jobDescription ||
          user?.UserCareerInfo?.jobDescription ||
          "",
        jobLocation:
          data?.UserCareerInfo?.jobLocation ||
          user?.UserCareerInfo?.jobLocation ||
          "",
      });
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles = [...photoFiles, ...files];
    setPhotoFiles(newFiles);

    // Create preview URLs
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPhotoPreviews([...photoPreviews, ...newPreviews]);
  };

  const handlePhotoDelete = (url, index) => {
    const newPreviews = [...photoPreviews];
    newPreviews.splice(index, 1);
    setPhotoPreviews(newPreviews);

    // If it's a newly uploaded photo → also remove file
    if (url.startsWith("blob:")) {
      const blobIndex = photoFiles.findIndex(
        (file) => URL.createObjectURL(file) === url
      );
      if (blobIndex !== -1) {
        const newFiles = [...photoFiles];
        newFiles.splice(blobIndex, 1);
        setPhotoFiles(newFiles);
      }
      URL.revokeObjectURL(url);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      // Always use FormData to handle photos and profile data
      const fd = new FormData();

      // Add text fields
      if (formData.firstname) fd.append("firstname", formData.firstname);
      if (formData.lastname) fd.append("lastname", formData.lastname);
      if (formData.gender) fd.append("gender", formData.gender);
      if (formData.religion) fd.append("religion", formData.religion);
      if (formData.caste) fd.append("caste", formData.caste);
      if (formData.subCaste) fd.append("subCaste", formData.subCaste);
      if (formData.community) fd.append("community", formData.community);
      if (formData.dateOfBirth) fd.append("dateOfBirth", formData.dateOfBirth);
      if (formData.timeOfBirth) fd.append("timeOfBirth", formData.timeOfBirth);
      if (formData.birthLocation)
        fd.append("birthLocation", formData.birthLocation);
      if (formData.knownLanguages)
        fd.append("knownLanguages", formData.knownLanguages);
      if (formData.diet) fd.append("diet", formData.diet);
      if (formData.maritalStatus)
        fd.append("maritalStatus", formData.maritalStatus);
      if (formData.bloodGroup) fd.append("bloodGroup", formData.bloodGroup);
      if (formData.height) fd.append("height", parseInt(formData.height));
      if (formData.weight) fd.append("weight", parseInt(formData.weight));
      if (formData.skinTone) fd.append("skinTone", formData.skinTone);
      if (formData.physicalDisability)
        fd.append("physicalDisability", formData.physicalDisability);
      if (formData.hobbies) {
        const hobbiesArray = Array.isArray(formData.hobbies)
          ? formData.hobbies
          : formData.hobbies
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
        fd.append("hobbies", JSON.stringify(hobbiesArray));
      }

      // Add nested objects as JSON strings
      fd.append(
        "AstrologyInfo",
        JSON.stringify({
          charan: formData.charan || "",
          gan: formData.gan || "",
          gotra: formData.gotra || "",
          mangal: formData.mangal || "",
          nadis: formData.nadis || "",
          nakshatra: formData.nakshatra || "",
          ras: formData.ras || "",
        })
      );

      fd.append(
        "FamilyInfo",
        JSON.stringify({
          fatherName: formData.fatherName || "",
          motherName: formData.motherName || "",
          brothersCount: formData.brothersCount
            ? parseInt(formData.brothersCount)
            : 0,
          sistersCount: formData.sistersCount
            ? parseInt(formData.sistersCount)
            : 0,
          liveWithFamily: formData.liveWithFamily || "",
          relativesSurname: Array.isArray(formData.relativesSurname)
            ? formData.relativesSurname
            : (formData.relativesSurname || "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        })
      );

      fd.append(
        "UserCareerInfo",
        JSON.stringify({
          education: formData.education || "",
          jobSector: formData.jobSector || "",
          jobTitle: formData.jobTitle || "",
          annualSalary: formData.annualSalary || "",
          jobDescription: formData.jobDescription || "",
          jobLocation: formData.jobLocation || "",
        })
      );

      // Separate existing photos (URLs) from new photos (blob URLs)
      const existingPhotoUrls = photoPreviews.filter(
        (url) => !url.startsWith("blob:")
      );

      // Add existing photo URLs as JSON array
      fd.append(
        "existingProfilePhotos",
        JSON.stringify(existingPhotoUrls || [])
      );

      // Add new photo files
      photoFiles.forEach((file) => {
        fd.append("profilePhotos", file, file.name);
      });

      const response = await putDataFormData(`user/auth/update`, fd);

      if (response?.statusCode === 200 || response?.statusCode === 201) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        setEditing(false);
        setPhotoFiles([]);
        setPhotoPreviews([]);
        // Clean up object URLs (only blob URLs)
        photoPreviews.forEach((url) => {
          if (url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
        });
        await getLoanList(); // Refresh data
      } else {
        toast({
          title: "Update Failed",
          description:
            response?.message || "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (row) => {
    if (editing && !row.readOnly) {
      const fieldValue = formData[row.key] || "";

      if (row.type === "textarea") {
        return (
          <Textarea
            value={fieldValue}
            onChange={(e) => updateField(row.key, e.target.value)}
            className="mt-1"
            rows={3}
          />
        );
      } else if (row.type === "date") {
        return (
          <Input
            type="date"
            value={fieldValue}
            onChange={(e) => updateField(row.key, e.target.value)}
            className="mt-1"
          />
        );
      } else if (row.type === "time") {
        return (
          <Input
            type="time"
            value={fieldValue}
            onChange={(e) => updateField(row.key, e.target.value)}
            className="mt-1"
          />
        );
      } else if (row.type === "number") {
        return (
          <Input
            type="number"
            value={fieldValue}
            onChange={(e) => updateField(row.key, e.target.value)}
            className="mt-1"
          />
        );
      } else {
        // Text input with suffix handling
        return (
          <div className="flex items-center gap-1 mt-1">
            <Input
              type="text"
              value={fieldValue || ""}
              onChange={(e) => updateField(row.key, e.target.value)}
              className="flex-1"
            />
            {row.suffix && <span className="text-gray-500">{row.suffix}</span>}
          </div>
        );
      }
    } else {
      // Read-only display
      let displayValue = row.value || "—";
      if (row.value && row.suffix) {
        displayValue = `${row.value}${row.suffix}`;
      }
      return (
        <div className="text-gray-900 mt-1">
          {row.readOnly && (
            <span className="text-gray-400 text-xs">(Read-only)</span>
          )}
          <div className={row.readOnly ? "mt-1" : ""}>{displayValue}</div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-base font-semibold text-gray-800 mb-3">
            Your Photos
          </div>
          {photos.length > 0 || editing ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((url, index) => {
                // Only show delete button for newly uploaded photos (previews), not existing photos
                const isNewPhoto = index >= existingPhotos.length;
                return (
                  <div
                    key={index}
                    className="relative w-full h-48 overflow-hidden rounded-lg border group"
                  >
                    <img
                      src={url}
                      alt={`Profile ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {editing && isNewPhoto && (
                      <button
                        onClick={() => handlePhotoDelete(url, index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}

              {editing && (
                <label className="relative w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <div className="text-center">
                    <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Add Photos</span>
                  </div>
                </label>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No photos uploaded yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {data?.firstname || user?.firstname || "Your Name"}{" "}
                {data?.lastname || user?.lastname || "Your Name"} {"  "}
                <span>
                  {data?.maritalStatus && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-500"
                    >
                      {data.maritalStatus}
                    </Badge>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span className="inline-flex items-center">
                  {data?.age || "—"}, {data?.UserCareerInfo?.jobTitle || "—"},{" "}
                  {data?.UserCareerInfo?.jobLocation || "—"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-base font-semibold text-gray-800">
              Basic Information
            </div>
            {!editing && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}
            {editing && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="w-4 h-4" />
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {basicRows.map((row, i) => (
              <div key={i} className="rounded-lg border p-3 bg-white">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {row.label}
                </div>
                {renderField(row)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-base font-semibold text-gray-800 mb-3">
            Astrology Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {astrologyRow.map((row, i) => (
              <div key={i} className="rounded-lg border p-3 bg-white">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {row.label}
                </div>
                {renderField(row)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-base font-semibold text-gray-800 mb-3">
            Career Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {careerRow.map((row, i) => (
              <div key={i} className="rounded-lg border p-3 bg-white">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {row.label}
                </div>
                {renderField(row)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-base font-semibold text-gray-800 mb-3">
            Family Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {familyRow.map((row, i) => (
              <div key={i} className="rounded-lg border p-3 bg-white">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {row.label}
                </div>
                {renderField(row)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfile;
