import { PageHeader, StatCard, Card, Badge } from "../../components/UI";
import { hospitalRequests, timeAgo } from "../../data/mockData";

export default function HospitalOverview() {
  const active = hospitalRequests.filter((r) => r.status !== "Fulfilled");

  return (
    <div>
      <PageHeader title="Yashoda Hospital, Somajiguda" subtitle="Request dashboard" />

      <div className="stat-grid">
        <StatCard label="Active requests" value={active.length} />
        <StatCard label="Critical right now" value={active.filter((r) => r.urgency === "Critical").length} tone="critical" />
        <StatCard label="Fulfilled this month" value={hospitalRequests.filter((r) => r.status === "Fulfilled").length} tone="success" />
      </div>

      <Card title="Recent requests">
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Blood group</th>
              <th>Units</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Raised</th>
            </tr>
          </thead>
          <tbody>
            {hospitalRequests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.units}</td>
                <td><Badge>{r.urgency}</Badge></td>
                <td><Badge>{r.status}</Badge></td>
                <td>{timeAgo(r.raisedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
