import { useState } from "react";
import { PageHeader, Card } from "../../components/UI";
import { bloodGroups } from "../../data/mockData";

export default function RaiseRequest() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <PageHeader title="Raise a blood request" subtitle="Mark it Critical if the patient can't wait for routine matching." />
      <Card>
        {submitted && (
          <div style={{ background: "var(--green-tint)", color: "var(--green)", padding: "0.7rem 1rem", borderRadius: 6, fontSize: "0.88rem", marginBottom: "1.1rem" }}>
            Request submitted. If marked Critical, matching donors are notified immediately.
          </div>
        )}
        <form
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", maxWidth: 560 }}
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        >
          <div>
            <label>Blood group needed</label>
            <select defaultValue="">
              <option value="" disabled>Select</option>
              {bloodGroups.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label>Units required</label>
            <input type="number" min="1" defaultValue={1} />
          </div>
          <div>
            <label>Urgency</label>
            <select defaultValue="Routine">
              <option>Routine</option>
              <option>Urgent</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <label>Needed by</label>
            <input type="datetime-local" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Patient / case notes (optional)</label>
            <textarea rows={3} placeholder="e.g. Trauma case, ICU ward 4" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <button className="btn" type="submit">Submit request</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
