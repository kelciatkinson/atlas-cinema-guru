"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import "@/styles/UserActivityFeed/styles.css";

interface Activity {
  id: string;
  timestamp: string;
  activity: "FAVORITED" | "WATCH_LATER";
  title: string;
}

interface UserActivityFeedProps {
  isExpanded: boolean;
}

export default function UserActivityFeed({
  isExpanded,
}: UserActivityFeedProps) {
  const { data: session } = useSession();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      if (!session?.user?.email) return;

      try {
        const response = await fetch("/api/activities");
        if (response.ok) {
          const data = await response.json();
          setActivities(data.activities || []);
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [session]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getActivityText = (activity: Activity) => {
    if (activity.activity === "FAVORITED") {
      return (
        <>
          Favorited <span className="movie-title-bold">{activity.title}</span>
        </>
      );
    } else {
      return (
        <>
          Added <span className="movie-title-bold">{activity.title}</span> to
          watch later
        </>
      );
    }
  };

  if (!isExpanded) {
    return null;
  }

  return (
    <div className="user-activity-feed">
      <div className="activity-header">
        <span className="activity-title">Latest Activities</span>
      </div>

      <div className="activity-list">
        {loading ? (
          <div className="activity-loading">Loading...</div>
        ) : activities.length > 0 ? (
          activities.slice(0, 8).map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-time">
                {formatTimestamp(activity.timestamp)}
              </div>
              <div className="activity-text">{getActivityText(activity)}</div>
            </div>
          ))
        ) : (
          <div className="no-activity">
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}
