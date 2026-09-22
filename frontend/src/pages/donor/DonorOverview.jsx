import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Droplets, HeartHandshake, CalendarClock, Clock, CheckCircle2,
  MapPin, Target, ArrowRight, Building2,
} from "lucide-react";
import { PageHeader, StatCard, Card, Badge } from "../../components/UI";
import { currentDonor, donationHistory, matchAlertsForDonor, timeAgo } from "../../data/mockData";
import "./Donor.css";

const DONATION_GAP_DAYS = 90;
const LIVES_PER_DONATION = 3;
const NEXT_MILESTONE = 10;

const dayMs = 86400000;
const daysBetween = (a, b) => Math.round((b - a) / dayMs);
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function DonorOverview() {
  const [responded, setResponded] = useState([]);
  const userName = localStorage.getItem("userName") || currentDonor.name;
  const firstName = userName.split(" ")[0];

  // ── Eligibility math ──
  const lastDonation = new Date(currentDonor.lastDonation);
  const nextEligible = new Date(lastDonation.getTime() + DONATION_GAP_DAYS * dayMs);
  const today = new Date();
  const daysLeft = daysBetween(today, nextEligible);
  const isEligible = daysLeft <= 0;
  const cycleDone = Math.min(DONATION_GAP_DAYS, Math.max(0, DONATION_GAP_DAYS - Math.max(0, daysLeft)));
  const cyclePct = Math.round((cycleDone / DONATION_GAP_DAYS) * 100);
  const daysSinceDonation = daysBetween(lastDonation, today);

  // ── Impact math ──
  const livesTouched = currentDonor.totalDonations * LIVES_PER_DONATION;
  const milestonePct = Math.min(100, Math.round((currentDonor.totalDonations / NEXT_MILESTONE) * 100));

  // ── Rhythm math ──
  const sorted = [...donationHistory].map((d) => new Date(d.date)).sort((a, b) => a - b);
  const gaps = sorted.slice(1).map((d, i) => daysBetween(sorted[i], d));
  const avgGap = gaps.length ? Math.round(gaps.reduce((s, g) => s + g, 0) / gaps.length) : null;

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        subtitle={`Donor ID ${currentDonor.id} · ${currentDonor.city}`}
      />

      {/* ── Impact banner ── */}
      <section className="donor-impact">
        <div className="donor-impact__main">
          <span className="donor-impact__label">Your impact so far</span>
          <div className="donor-impact__number">{livesTouched}</div>
          <p className="donor-impact__sub">
            lives potentially saved across {currentDonor.totalDonations} donations
          </p>
          <div className="donor-impact__milestone">
            <div className="donor-impact__milestone-top">
              <span className="meta"><Target size={14} /> Next milestone: {NEXT_MILESTONE} donations</span>
              <span>{currentDonor.totalDonations}/{NEXT_MILESTONE}</span>
            </div>
            <div className="donor-impact__track">
              <div className="donor-impact__fill" style={{ width: `${milestonePct}%` }} />
            </div>
          </div>
          <Link to="/donor/camps" className="btn btn--light">
            Find donation camps<ArrowRight size={16} strokeWidth={2.4} />
          </Link>
        </div>
        <Droplets className="donor-impact__watermark" strokeWidth={1.2} />
      </section>

      {/* ── Stat cards ── */}
      <div className="stat-grid">
        <StatCard label="Blood group" value={currentDonor.bloodGroup} icon={Droplets} tone="critical" />
        <StatCard label="Total donations" value={currentDonor.totalDonations} icon={HeartHandshake} />
        <StatCard
          label="Avg. gap between donations"
          value={avgGap ? `${avgGap} days` : "—"}
          icon={CalendarClock}
          tone="info"
        />
      </div>

      <div className="donor-cols">
        {/* ── Eligibility tracker ── */}
        <Card title="Eligibility tracker">
          {isEligible ? (
            <div className="elig elig--ok">
              <span className="elig__icon"><CheckCircle2 size={22} strokeWidth={2.2} /></span>
              <div>
                <div className="elig__title">You're eligible to donate</div>
                <p className="elig__sub">
                  Last donation {fmtDate(currentDonor.lastDonation)} · {daysSinceDonation} days ago
                </p>
              </div>
            </div>
          ) : (
            <div className="elig elig--wait">
              <span className="elig__icon"><Clock size={22} strokeWidth={2.2} /></span>
              <div>
                <div className="elig__title">{daysLeft} day{daysLeft === 1 ? "" : "s"} until you're eligible</div>
                <p className="elig__sub">Whole-blood donors wait {DONATION_GAP_DAYS} days between donations</p>
              </div>
            </div>
          )}
          <div className="elig__bar">
            <div className="elig__bar-top">
              <span>{fmtDate(currentDonor.lastDonation)}</span>
              <span>{isEligible ? "Eligible now" : fmtDate(nextEligible.toISOString())}</span>
            </div>
            <div className="elig__track">
              <div className={"elig__fill" + (isEligible ? " elig__fill--full" : "")} style={{ width: `${cyclePct}%` }} />
            </div>
            <div className="elig__bar-bottom">{cycleDone} of {DONATION_GAP_DAYS} days complete</div>
          </div>
          {isEligible && (
            <Link to="/donor/requests" className="btn" style={{ marginTop: "1rem" }}>
              Respond to urgent requests<ArrowRight size={15} strokeWidth={2.4} />
            </Link>
          )}
        </Card>

        {/* ── Matching requests ── */}
        <Card
          title={`Requests matching ${currentDonor.bloodGroup}`}
          action={<Link to="/donor/requests" className="card__link">View all<ArrowRight size={14} /></Link>}
        >
          {matchAlertsForDonor.length === 0 ? (
            <div className="empty-state">No active requests match your blood group right now.</div>
          ) : (
            <div className="req-list">
              {matchAlertsForDonor.map((m) => (
                <div key={m.id} className="req-row">
                  <div className="req-row__main">
                    <div className="req-row__top">
                      <Badge>{m.urgency}</Badge>
                      <span className="req-row__hospital">{m.hospital}</span>
                    </div>
                    <div className="req-row__meta">
                      <span className="meta"><Droplets size={13} />{m.bloodGroup} · {m.unitsNeeded} units</span>
                      <span className="meta"><MapPin size={13} />{m.distanceKm} km</span>
                      <span className="meta"><Building2 size={13} />{timeAgo(m.postedAt)}</span>
                    </div>
                  </div>
                  {responded.includes(m.id) ? (
                    <span className="meta req-row__done"><CheckCircle2 size={15} strokeWidth={2.4} /> Responded</span>
                  ) : (
                    <button className="btn" onClick={() => setResponded([...responded, m.id])}>
                      Respond
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
