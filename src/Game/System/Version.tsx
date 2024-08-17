import React, { useEffect, useState } from "react";
import { repository, version } from "../../../package.json";

const KEY = "version.date";
const Version: React.FC = () => {
  const [date, setDate] = useState<string | null>(sessionStorage.getItem(KEY));

  const fetchDeployment = async () => {
    try {
      const response = await fetch(repository.api);
      const data = await response.json();
      const deployment = data[0].created_at;
      setDate(deployment);
      sessionStorage.setItem(KEY, deployment);
    } catch (error) {
      console.error("Failed to fetch version: ", error);
    }
  };

  useEffect(() => {
    if (!date) {
      fetchDeployment();
    }
  }, [date]);

  return (
    <small>
      v{version}/{date}
    </small>
  );
};

export default Version;
