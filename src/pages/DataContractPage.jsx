import React from "react";

const dataContract = {
  currentVersion: "1.0.0",
  dataProducer: "Example Producer Inc.",
  dataConsumer: "Example Consumer LLC",
  dataValidator: "Data Validator Group",
  dataFrequency: "Daily",
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
  },
  section: {
    marginBottom: "1rem",
  },
  row: {
    display: "flex",
    marginBottom: "0.5rem",
  },
  label: {
    fontWeight: "bold",
    marginRight: "0.5rem",
  },
};

const DataContractPage = () => {
  const {
    currentVersion,
    dataProducer,
    dataConsumer,
    dataValidator,
    dataFrequency,
  } = dataContract;

  return (
    <div style={styles.container}>
      <div style={styles.header}>Data Contract Details</div>
      <div style={styles.section}>
        <div style={styles.row}>
          <span style={styles.label}>Current Version:</span>
          <span>{currentVersion}</span>
        </div>
      </div>
      <div style={styles.section}>
        <div style={styles.row}>
          <span style={styles.label}>Data Producer:</span>
          <span>{dataProducer}</span>
        </div>
      </div>
      <div style={styles.section}>
        <div style={styles.row}>
          <span style={styles.label}>Data Consumer:</span>
          <span>{dataConsumer}</span>
        </div>
      </div>
      <div style={styles.section}>
        <div style={styles.row}>
          <span style={styles.label}>Data Validator:</span>
          <span>{dataValidator}</span>
        </div>
      </div>
      <div style={styles.section}>
        <div style={styles.row}>
          <span style={styles.label}>Data Frequency:</span>
          <span>{dataFrequency}</span>
        </div>
      </div>
    </div>
  );
};

export default DataContractPage;
