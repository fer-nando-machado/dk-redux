import React, { useEffect, useMemo, useState } from "react";
import {
  name,
  repository,
  version,
  description,
  dependencies,
  devDependencies,
} from "../../../package.json";

const KEY = "version.date";
const Version: React.FC = () => {
  const [date, setDate] = useState<string | null>(sessionStorage.getItem(KEY));
  const [full, setFull] = useState<boolean>();
  const toggleView = () => setFull(!full);

  const fetchDeploymentDate = async () => {
    try {
      const response = await fetch(repository.api);
      const data = await response.json();
      const deploymentDate = data[0].created_at;
      setDate(deploymentDate);
      sessionStorage.setItem(KEY, deploymentDate);
    } catch (error) {
      console.error("Failed to fetch deployment date: ", error);
    }
  };

  useEffect(() => {
    if (!date) {
      fetchDeploymentDate();
    }
  }, [date]);

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
    <>
      <u>{name}</u>{" "}
      <small>
        v{version} {date}
      </small>
      <p onClick={toggleView}>
        {full ? description : description.slice(0, 111) + ". (…)"}
      </p>
      {full && (
        <>
          <u>DEPENDENCIES</u>
          <pre onClick={toggleView}>{dependenciesTree}</pre>
          <pre onClick={toggleView}>{devDependenciesTree}</pre>
        </>
      )}
    </>
  );
};

export default Version;
