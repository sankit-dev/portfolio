import { getContributions, getLastShip, timeAgo, type ContributionDay } from "@/lib/github";

const DAYS_PER_WEEK = 7;

// GitHub's calendar is columns of weeks starting on Sunday; pad the first week so days land on the right row.
const toWeeks = (days: ContributionDay[]) => {
  const firstWeekday = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  const padded: (ContributionDay | null)[] = [...Array(firstWeekday).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += DAYS_PER_WEEK) weeks.push(padded.slice(i, i + DAYS_PER_WEEK));
  return weeks;
};

export const BuildStrip = async ({ user }: { user: string }) => {
  const [contributions, ship] = await Promise.all([getContributions(user), getLastShip(user)]);
  if (!contributions && !ship) return null;

  return (
    <div className="build-strip">
      {contributions && (
        <a className="contrib" href={`https://github.com/${user}`} target="_blank" rel="noreferrer" aria-label={`${contributions.total} GitHub contributions in the last year`}>
          {/* Right-aligned and clipped, so narrow screens show the most recent weeks. */}
          <span className="contrib-grid" aria-hidden="true">
            {toWeeks(contributions.days).map((week, w) => (
              <span key={w} className="contrib-week">
                {week.map((day, d) =>
                  day ? <i key={day.date} data-level={day.level} title={`${day.count} on ${day.date}`} /> : <i key={`pad-${d}`} data-pad="" />,
                )}
              </span>
            ))}
          </span>
          <span className="contrib-foot label">
            <span>{contributions.total} contributions in the last year</span>
            <span className="contrib-scale" aria-hidden="true">
              less {[0, 1, 2, 3, 4].map((l) => <i key={l} data-level={l} />)} more
            </span>
          </span>
        </a>
      )}
      {ship && (
        <a className="last-ship" href={ship.url} target="_blank" rel="noreferrer">
          <span className="label">last shipped</span>
          <span className="last-ship-msg">{ship.message}</span>
          <span className="label">
            {ship.repo} · {timeAgo(ship.at)}
          </span>
          <span className="arrow" aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
};
