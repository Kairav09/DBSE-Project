import { PageHeader, StatCard, Card, Badge } from "../../components/UI";
import { adminStats, emergencyAlerts, hospitalRequests, timeAgo } from "../../data/mockData";

export default function AdminOverview() {
  return (
    <div>
      <PageHeader title="Blood bank overview" subtitle="City Central Blood Bank" />

      <div className="stat-grid">
        <StatCard label="Registered donors" value={adminStats.totalDonors.toLocaleString()} />
        <StatCard label="Units in stock" value={adminStats.totalUnitsInStock} />
        <StatCard label="Pending requests" value={adminStats.pendingRequests} tone="warning" />
        <StatCard label="Active alerts" value={adminStats.activeAlerts} tone="critical" />
      </div>

      <Card title="Active emergency alerts">
        {emergencyAlerts.map((a) => (
          <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: "1px solid var(--line)" }}>
            <div>
              <Badge>{a.severity}</Badge>
              <span style={{ marginLeft: "0.6rem", fontSize: "0.9rem" }}>{a.detail}</span>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--ink-soft)", whiteSpace: "nowrap", marginLeft: "1rem" }}>{timeAgo(a.raisedAt)}</span>
          </div>
        ))}
      </Card>

      <Card title="Latest hospital requests">
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Hospital</th>
              <th>Blood group</th>
              <th>Urgency</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {hospitalRequests.slice(0, 4).map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.hospital}</td>
                <td>{r.bloodGroup}</td>
                <td><Badge>{r.urgency}</Badge></td>
                <td><Badge>{r.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
