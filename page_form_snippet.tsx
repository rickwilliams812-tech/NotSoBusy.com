// Replace your form block with this handler (UI classes unchanged)
<form
  id="waitlist"
  onSubmit={async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city, zip }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail(""); setCity(""); setZip("");
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || "Submission failed. Try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    }
  }}
  className="mt-6 flex flex-col gap-3 md:grid md:grid-cols-12"
>
  {/* keep your existing inputs/buttons; ensure name attributes if you like */}
</form>
