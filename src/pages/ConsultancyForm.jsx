import { useState } from "react";
import { Button } from "@/components/ui/button";

const ConsultancyForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    if (!name || !email || !phone || !message) {
      setErrorMsg("All fields are required");
      return;
    }

    setLoading(true);

    fetch("https://artiststation.co.in/hridaysparshi-api/api/consultancy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        if (data.success === false) {
          throw new Error(data.msg || "Something went wrong");
        }

        setSuccessMsg("Your request has been submitted");

        // clear form
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          className="border rounded-md p-2"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border rounded-md p-2"
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        className="border rounded-md p-2 w-full"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <textarea
        className="border rounded-md p-2 w-full"
        rows="3"
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  );
};

export default ConsultancyForm;
