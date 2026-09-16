import { Link } from "react-router-dom";
import { PageHeader, Card, Badge } from "../../components/UI";
import { hospitalRequests, timeAgo } from "../../data/mockData";

export default function AdminRequests() {
  return (
    <div>
      <PageHeader title="Hospital requests" subtitle="Approve, match, or dispatch against current stock." />
      <Card>
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Hospital</th>
              <th>Blood group</th>
              <th>Units</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Raised</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {hospitalRequests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.hospital}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.units}</td>
                <td><Badge>{r.urgency}</Badge></td>
                <td><Badge>{r.status}</Badge></td>
                <td>{timeAgo(r.raisedAt)}</td>
                <td>
                  <Link to="/admin/matching" className="btn btn--ghost" style={{ fontSize: "0.8rem", padding: "0.4rem 0.7rem" }}>
                    Match donors
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
