import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const passwordRules = [
  {
    label: "At least 6 characters",
    test: (v) => v.length >= 6,
  },
  {
    label: "One uppercase letter (A-Z)",
    test: (v) => /[A-Z]/.test(v),
  },
  {
    label: "One lowercase letter (a-z)",
    test: (v) => /[a-z]/.test(v),
  },
  {
    label: "One number (0-9)",
    test: (v) => /\d/.test(v),
  },
  {
    label: "One special character (@$!%*?&)",
    test: (v) => /[@$!%*?&]/.test(v),
  },
];

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isPasswordValid = passwordRules.every((rule) =>
    rule.test(password)
  );

  const submit = async () => {
    if (!isPasswordValid) {
      setMessage("Please meet all password requirements.");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://artiststation.co.in/hridaysparshi-api/api/user/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Reset failed");
        setLoading(false);
        return;
      }

      setMessage("Password reset successful. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Reset Password
        </h2>

        {/* Password */}
        <div className="relative mb-3">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm */}
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mb-4"
        />

        {/* Password Rules */}
        <div className="mb-4 space-y-1 text-sm">
          {passwordRules.map((rule, index) => {
            const passed = rule.test(password);
            return (
              <p
                key={index}
                className={`flex items-center gap-2 ${
                  passed ? "text-green-600" : "text-red-500"
                }`}
              >
                <AlertCircle size={14} />
                {rule.label}
              </p>
            );
          })}
        </div>

        {/* Button */}
        <Button
          onClick={submit}
          disabled={loading || !isPasswordValid}
          className="w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Resetting...
            </>
          ) : (
            <>
              <LogIn size={18} />
              Reset Password
            </>
          )}
        </Button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
