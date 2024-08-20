import React, { useEffect, useMemo, useState } from "react";
import {
  name,
  repository,
  version,
  description,
  dependencies,
  devDependencies,
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
        `${latest.ref}: ${latest.created_at} / ${latest.updated_at}\n` +
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

  const devDependenciesTree = useMemo(() => {
    return Object.entries(devDependencies)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }, []);

  return (
    <span onClick={toggleDetails}>
      <span className="Version">
        <u>{name}</u> <small>v{version}</small>
      </span>
      <p>{hasDetails ? description : description.slice(0, 111) + ". (…)"}</p>
      {hasDetails && (
        <>
          <u>DEPENDENCIES</u>
          <pre>{dependenciesTree}</pre>
          <pre>{devDependenciesTree}</pre>
          <u>DEPLOYMENT</u>
          <pre>{deployment ? deployment : "LOADING..."}</pre>
        </>
      )}
    </span>
  );
};

export default Version;
