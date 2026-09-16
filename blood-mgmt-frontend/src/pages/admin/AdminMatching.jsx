import { PageHeader, Card, Badge } from "../../components/UI";
import { donorMatchesForRequest } from "../../data/mockData";

export default function AdminMatching() {
  return (
    <div>
      <PageHeader
        title="Donor matching"
        subtitle="For REQ-7731 · Yashoda Hospital · O+ needed · 3 units · Critical"
      />
      <Card title="Ranked by proximity and eligibility">
        <table>
          <thead>
            <tr>
              <th>Donor</th>
              <th>Blood group</th>
              <th>Distance</th>
              <th>Last donation</th>
              <th>Eligibility</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {donorMatchesForRequest.map((d) => (
              <tr key={d.donorId}>
                <td>{d.name}</td>
                <td>{d.bloodGroup}</td>
                <td>{d.distanceKm} km</td>
                <td>{d.lastDonation}</td>
                <td>
                  <Badge>{d.eligible ? "Fulfilled" : "Warning"}</Badge>
                </td>
                <td>
                  <button className="btn" disabled={!d.eligible} style={{ opacity: d.eligible ? 1 : 0.4 }}>
                    Notify donor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
