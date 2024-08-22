import React, { useEffect, useMemo, useState } from "react";
import {
  name,
  repository,
  version,
  description,
  dependencies,
} from "../../../package.json";

type GitHubDeployment = {
  ref: string;
  environment: string;
  original_environment: string;
  production_environment: string;
  transient_environment: string;
  created_at: string;
  updated_at: string;
};

const Version: React.FC = () => {
  const [hasDetails, setDetails] = useState<boolean>();
  const [deployment, setDeployment] = useState<string>();
  const toggleDetails = () => setDetails(!hasDetails);

  const fetchDeploymentDate = async () => {
    try {
      const response = await fetch(repository.api);
      const data = await response.json();
      const latest = data[0] as GitHubDeployment;
      const deployment =
        `date: ${latest.created_at}\n` +
        `environment: ${latest.environment} (${[
          latest.original_environment && "original",
          latest.transient_environment && "transient",
          latest.production_environment && "production",
        ]
          .filter(Boolean)
          .join(" ")})`;
      setDeployment(deployment);
    } catch (error) {
      console.error("Failed to fetch deployment date: ", error);
    }
  };

  useEffect(() => {
    if (hasDetails && !deployment) {
      fetchDeploymentDate();
    }
  }, [hasDetails, deployment]);

  const dependenciesTree = useMemo(() => {
    return Object.entries(dependencies)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }, []);

  return (
    <span onClick={toggleDetails}>
      <u>{name}</u> <small>v{version}</small>
      <p>{hasDetails ? description : description.slice(0, 111) + ". (…)"}</p>
      {hasDetails && (
        <>
          <u>DEPENDENCIES</u>
          <pre>{dependenciesTree}</pre>
          {deployment && (
            <>
              <u>DEPLOYMENT</u>
              <pre>{deployment}</pre>
            </>
          )}
        </>
      )}
    </span>
  );
};

export default Version;
