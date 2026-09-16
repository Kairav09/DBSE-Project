import { useState } from "react";
import { PageHeader, Card, Badge } from "../../components/UI";
import { allNearbyRequests, timeAgo } from "../../data/mockData";

export default function DonorNearbyRequests() {
  const [filter, setFilter] = useState("all");
  const [responded, setResponded] = useState([]);

  const filtered = filter === "all"
    ? allNearbyRequests
    : allNearbyRequests.filter((r) => r.urgency === filter);

  const sorted = [...filtered].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div>
      <PageHeader
        title="Nearby blood requests"
        subtitle="All active requests matching your blood group (O+), sorted by distance."
        action={
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 140 }}>
            <option value="all">All urgencies</option>
            <option value="Critical">Critical only</option>
            <option value="Urgent">Urgent only</option>
            <option value="Routine">Routine only</option>
          </select>
        }
      />

      {sorted.length === 0 ? (
        <Card><p style={{ color: "var(--ink-soft)", fontSize: "0.9rem", textAlign: "center", padding: "1rem 0" }}>No matching requests found for this filter.</p></Card>
      ) : (
        sorted.map((r) => (
          <Card key={r.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <Badge>{r.urgency}</Badge>
                  <span style={{ fontWeight: 600 }}>{r.hospital}</span>
                </div>
                <div style={{ fontSize: "0.86rem", color: "var(--ink-soft)", display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
                  <span>🩸 {r.bloodGroup} · {r.unitsNeeded} unit(s)</span>
                  <span>📍 {r.distanceKm} km away</span>
                  <span>🕐 {timeAgo(r.postedAt)}</span>
                </div>
              </div>
              <div>
                {responded.includes(r.id) ? (
                  <span style={{ fontSize: "0.84rem", color: "var(--green)", fontWeight: 600 }}>✓ Responded</span>
                ) : (
                  <button className="btn" onClick={() => setResponded([...responded, r.id])}>
                    Respond
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
