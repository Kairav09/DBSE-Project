import { PageHeader, Card, Badge } from "../../components/UI";
import { emergencyAlerts, timeAgo } from "../../data/mockData";

export default function AdminAlerts() {
  return (
    <div>
      <PageHeader title="Emergency alerts" subtitle="Critical stock levels and time-sensitive requests, in one feed." />
      {emergencyAlerts.map((a) => (
        <Card key={a.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <Badge>{a.severity}</Badge>
              <div style={{ fontWeight: 600, marginTop: "0.5rem" }}>{a.type}</div>
              <p style={{ marginTop: "0.3rem", color: "var(--ink-soft)", fontSize: "0.9rem" }}>{a.detail}</p>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--ink-soft)", whiteSpace: "nowrap" }}>{timeAgo(a.raisedAt)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
