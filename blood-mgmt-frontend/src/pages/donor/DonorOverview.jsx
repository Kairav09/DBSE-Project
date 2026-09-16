import { PageHeader, StatCard, Card, Badge } from "../../components/UI";
import { currentDonor, matchAlertsForDonor, timeAgo } from "../../data/mockData";

export default function DonorOverview() {
  const isEligible = new Date(currentDonor.eligibleFrom) <= new Date();
  
  const userName = localStorage.getItem("userName") || currentDonor.name;
  const userSub = localStorage.getItem("userSub") || `${currentDonor.bloodGroup} · ${currentDonor.city}`;
  const [bg, city] = userSub.split(" · ");

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${userName.split(" ")[0]}`}
        subtitle={`Donor ID ${currentDonor.id} · ${city || currentDonor.city}`}
      />

      <div className="stat-grid">
        <StatCard label="Blood group" value={bg || currentDonor.bloodGroup} />
        <StatCard label="Total donations" value={currentDonor.totalDonations} />
        <StatCard
          label="Eligibility"
          value={isEligible ? "Eligible now" : `From ${currentDonor.eligibleFrom}`}
          tone={isEligible ? "success" : "warning"}
        />
      </div>

      <Card title="Emergency requests matching your blood group">
        {matchAlertsForDonor.length === 0 ? (
          <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>
            No active requests match your blood group right now.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Hospital</th>
                <th>Blood group</th>
                <th>Units needed</th>
                <th>Distance</th>
                <th>Urgency</th>
                <th>Posted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {matchAlertsForDonor.map((m) => (
                <tr key={m.id}>
                  <td>{m.hospital}</td>
                  <td>{m.bloodGroup}</td>
                  <td>{m.unitsNeeded}</td>
                  <td>{m.distanceKm} km</td>
                  <td><Badge>{m.urgency}</Badge></td>
                  <td>{timeAgo(m.postedAt)}</td>
                  <td><button className="btn">Respond</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
