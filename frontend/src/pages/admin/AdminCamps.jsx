import { useState } from "react";
import { PageHeader, Card, Badge } from "../../components/UI";
import { donationCamps } from "../../data/mockData";

export default function AdminCamps() {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const upcoming = donationCamps.filter((c) => c.status === "Upcoming");
  const completed = donationCamps.filter((c) => c.status === "Completed");

  return (
    <div>
      <PageHeader
        title="Camp management"
        subtitle="Schedule and track blood donation camps across the city."
        action={
          <button className="btn" onClick={() => { setShowForm(!showForm); setFormSubmitted(false); }}>
            {showForm ? "Cancel" : "+ Schedule new camp"}
          </button>
        }
      />

      {showForm && (
        <Card title="Schedule a new camp">
          {formSubmitted && (
            <div style={{ background: "var(--green-tint)", color: "var(--green)", padding: "0.7rem 1rem", borderRadius: 6, fontSize: "0.88rem", marginBottom: "1rem" }}>
              Camp scheduled successfully! Donors in the area will be notified.
            </div>
          )}
          <form
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", maxWidth: 600 }}
            onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
          >
            <div>
              <label>Camp name</label>
              <input placeholder="e.g. Rotary Blood Drive" required />
            </div>
            <div>
              <label>Organizer</label>
              <input placeholder="e.g. Rotary Club Hyderabad" required />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label>Location / Venue</label>
              <input placeholder="Full address" required />
            </div>
            <div>
              <label>Date</label>
              <input type="date" required />
            </div>
            <div>
              <label>Time slot</label>
              <input placeholder="e.g. 09:00 – 17:00" required />
            </div>
            <div>
              <label>Expected donors</label>
              <input type="number" min="1" placeholder="e.g. 200" />
            </div>
            <div>
              <label>Contact phone</label>
              <input type="tel" placeholder="+91 98765 43210" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <button className="btn" type="submit" disabled={formSubmitted}>
                {formSubmitted ? "Scheduled!" : "Schedule camp"}
              </button>
            </div>
          </form>
        </Card>
      )}

      <Card title={`Upcoming camps (${upcoming.length})`}>
        {upcoming.length === 0 ? (
          <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>No upcoming camps scheduled.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Camp ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Organizer</th>
                <th>Expected</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600, fontSize: "0.82rem" }}>{c.id}</td>
                  <td>{c.name}</td>
                  <td style={{ fontSize: "0.85rem" }}>{c.location}</td>
                  <td>{c.date}</td>
                  <td style={{ fontSize: "0.84rem", whiteSpace: "nowrap" }}>{c.time}</td>
                  <td style={{ fontSize: "0.85rem" }}>{c.organizer}</td>
                  <td>{c.expectedDonors}</td>
                  <td><Badge>Pending</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card title={`Past camps (${completed.length})`}>
        <table>
          <thead>
            <tr>
              <th>Camp ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Organizer</th>
              <th>Expected</th>
              <th>Collected</th>
              <th>Yield</th>
            </tr>
          </thead>
          <tbody>
            {completed.map((c) => {
              const yieldPct = Math.round((c.unitsCollected / c.expectedDonors) * 100);
              return (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600, fontSize: "0.82rem" }}>{c.id}</td>
                  <td>{c.name}</td>
                  <td style={{ fontSize: "0.85rem" }}>{c.location}</td>
                  <td>{c.date}</td>
                  <td style={{ fontSize: "0.85rem" }}>{c.organizer}</td>
                  <td>{c.expectedDonors}</td>
                  <td style={{ fontWeight: 600 }}>{c.unitsCollected}</td>
                  <td>
                    <Badge>{yieldPct >= 80 ? "Fulfilled" : yieldPct >= 60 ? "Matched" : "Warning"}</Badge>
                    <span style={{ marginLeft: "0.4rem", fontSize: "0.82rem", color: "var(--ink-soft)" }}>{yieldPct}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
