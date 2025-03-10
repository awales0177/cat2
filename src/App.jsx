import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import {
  FaPlus,
  FaMinus,
  FaRocket,
  FaStar,
  FaSyncAlt,
  FaArchive,
  FaInfoCircle,
} from "react-icons/fa";

/* ---------------------------------- */
/*        THEME CONTEXT & PROVIDER    */
/* ---------------------------------- */
const themes = {
  light: {
    background: "#f7f7f7",
    text: "#333",
    cardBackground: "#fff",
    border: "#ddd",
    headerBackground: "#fff",
  },
  dark: {
    background: "#1e1e1e",
    text: "#f7f7f7",
    cardBackground: "#2e2e2e",
    border: "#555",
    headerBackground: "#2e2e2e",
  },
};

const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const toggleTheme = () =>
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  const value = useMemo(
    () => ({ theme: themes[currentTheme], toggleTheme }),
    [currentTheme]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useTheme = () => useContext(ThemeContext);

/* ---------------------------------- */
/*             APP HEADER             */
/* ---------------------------------- */
const AppHeader = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      style={{
        backgroundColor: theme.headerBackground,
        color: theme.text,
        padding: "1rem",
        textAlign: "center",
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <h1>Data Contract & Changelog</h1>
      <button
        onClick={toggleTheme}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Toggle {theme === themes.light ? "Dark" : "Light"} Mode
      </button>
    </header>
  );
};

/* ---------------------------------- */
/*         DATA CONTRACT PAGE         */
/* (Display‑only Component)           */
/* ---------------------------------- */
const DataContractPage = () => {
  const { theme } = useTheme();
  // Data contract details (could be fetched from an API)
  const dataContract = {
    currentVersion: "1.0.0",
    dataProducer: "Example Producer Inc.",
    dataConsumer: "Example Consumer LLC",
    dataValidator: "Data Validator Group",
    dataFrequency: "Daily",
  };

  const styles = {
    container: {
      backgroundColor: theme.cardBackground,
      border: `1px solid ${theme.border}`,
      borderRadius: "8px",
      padding: "1rem",
      transition: "all 0.3s ease",
      color: theme.text,
    },
    header: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      borderBottom: `2px solid ${theme.border}`,
      paddingBottom: "0.5rem",
    },
    row: {
      display: "flex",
      marginBottom: "0.75rem",
    },
    label: {
      fontWeight: "bold",
      marginRight: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Data Contract Details</div>
      <div style={styles.row}>
        <span style={styles.label}>Current Version:</span>
        <span>{dataContract.currentVersion}</span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Data Producer:</span>
        <span>{dataContract.dataProducer}</span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Data Consumer:</span>
        <span>{dataContract.dataConsumer}</span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Data Validator:</span>
        <span>{dataContract.dataValidator}</span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Data Frequency:</span>
        <span>{dataContract.dataFrequency}</span>
      </div>
    </div>
  );
};

/* ---------------------------------- */
/*           CHANGELOG COMPONENT      */
/* ---------------------------------- */
// Icon mapping for changelog entries.
const iconMapping = [
  {
    keyword: "data contract initialized",
    icon: <FaRocket style={{ color: "#4caf50" }} />,
  },
  { keyword: "feature", icon: <FaStar style={{ color: "#2196f3" }} /> },
  {
    keyword: "data frequency",
    icon: <FaSyncAlt style={{ color: "#ff9800" }} />,
  },
  { keyword: "decom", icon: <FaArchive style={{ color: "#9c27b0" }} /> },
  {
    keyword: "information",
    icon: <FaInfoCircle style={{ color: "#555" }} />,
  },
];
const defaultIcon = <FaInfoCircle style={{ color: "#555" }} />;
const getChangeIcon = (title) => {
  const lowerTitle = title.toLowerCase();
  for (const mapping of iconMapping) {
    if (lowerTitle.includes(mapping.keyword)) return mapping.icon;
  }
  return defaultIcon;
};

const ChangelogItem = React.memo(({ item, isExpanded, toggleItem }) => {
  const { theme } = useTheme();
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  // Update height dynamically for smooth transitions.
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isExpanded, item]);

  // Keyboard handling for accessibility.
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleItem(item.version);
    }
  };

  const contentId = `changelog-content-${item.version.replace(/\s+/g, "-")}`;

  const styles = {
    item: {
      backgroundColor: theme.cardBackground,
      border: `1px solid ${theme.border}`,
      borderRadius: "8px",
      marginBottom: "1.5rem",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      transition: "all 0.3s ease",
    },
    header: {
      backgroundColor: theme.headerBackground,
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "background-color 0.3s ease",
      cursor: "pointer",
    },
    title: {
      display: "flex",
      alignItems: "center",
    },
    version: {
      margin: "0",
      fontSize: "1.3rem",
      fontWeight: "bold",
      color: theme.text,
    },
    date: {
      color: theme.text,
      opacity: 0.7,
      fontSize: "0.9rem",
      marginLeft: "1rem",
    },
    toggleButton: {
      background: "none",
      border: "none",
      fontSize: "1.2rem",
      cursor: "pointer",
      outline: "none",
      display: "flex",
      alignItems: "center",
    },
    listContainer: {
      transition: "max-height 0.3s ease, opacity 0.3s ease",
      overflow: "hidden",
    },
    list: {
      listStyle: "none",
      padding: "1rem",
      margin: "0",
      borderTop: `1px solid ${theme.border}`,
    },
    listItem: {
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      color: theme.text,
    },
    changeText: {
      marginLeft: "0.5rem",
    },
  };

  return (
    <div style={styles.item}>
      <div
        style={styles.header}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = theme.background)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = theme.headerBackground)
        }
        onClick={() => toggleItem(item.version)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        aria-label={`Toggle changelog details for version ${item.version}`}
      >
        <div style={styles.title}>
          <h3
            id={`changelog-header-${item.version.replace(/\s+/g, "-")}`}
            style={styles.version}
          >
            {item.version}
          </h3>
          <span style={styles.date}>{item.date}</span>
        </div>
        <button style={styles.toggleButton} aria-hidden="true" tabIndex={-1}>
          {isExpanded ? <FaMinus /> : <FaPlus />}
        </button>
      </div>
      <div
        id={contentId}
        ref={contentRef}
        style={{ ...styles.listContainer, maxHeight, opacity: isExpanded ? 1 : 0 }}
        role="region"
        aria-labelledby={`changelog-header-${item.version.replace(/\s+/g, "-")}`}
      >
        {item.changes && item.changes.length > 0 ? (
          <ul style={styles.list}>
            {item.changes.map((change, index) => (
              <li key={index} style={styles.listItem}>
                {getChangeIcon(change.title)}
                <span style={styles.changeText}>
                  <strong>{change.title}:</strong> {change.description}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div
            style={{
              padding: "1rem",
              fontStyle: "italic",
              color: theme.text,
              opacity: 0.7,
            }}
          >
            No changes available.
          </div>
        )}
      </div>
    </div>
  );
});

ChangelogItem.propTypes = {
  item: PropTypes.shape({
    version: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    changes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  toggleItem: PropTypes.func.isRequired,
};

// Main Changelog component
const Changelog = ({ items }) => {
  const [expandedVersion, setExpandedVersion] = useState(null);
  const toggleItem = useCallback(
    (version) => setExpandedVersion((prev) => (prev === version ? null : version)),
    []
  );

  // Separate items into regular and "To‑Do" sections.
  const regularItems = items.filter(
    (item) => item.version.toLowerCase() !== "todo:"
  );
  const todoItems = items.filter(
    (item) => item.version.toLowerCase() === "todo:"
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2>Changelog</h2>
        {regularItems.map((item) => (
          <ChangelogItem
            key={item.version}
            item={item}
            isExpanded={expandedVersion === item.version}
            toggleItem={toggleItem}
          />
        ))}
      </div>
      {todoItems.length > 0 && (
        <div>
          <h2>To‑Do</h2>
          {todoItems.map((item) => (
            <ChangelogItem
              key={item.version}
              item={item}
              isExpanded={expandedVersion === item.version}
              toggleItem={toggleItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Changelog.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      version: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      changes: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

/* ---------------------------------- */
/*             APP LAYOUT             */
/* ---------------------------------- */
const AppLayout = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

/* ---------------------------------- */
/*             MAIN APP               */
/* ---------------------------------- */
const App = () => {
  const changelogData = [
    {
      version: "TODO:",
      date: "2025-06-01",
      changes: [
        {
          title: "Feature",
          description:
            "Introduced real-time data streaming for faster insights and improved performance.",
        },
        {
          title: "Data Frequency",
          description:
            "Updated data collection frequency to every 15 minutes for more granular analytics.",
        },
      ],
    },
    {
      version: "v3.5.0",
      date: "2025-05-15",
      changes: [
        {
          title: "Decom",
          description:
            "Started decommission planning for legacy API endpoints to streamline data ingestion.",
        },
        {
          title: "Information",
          description:
            "Published detailed documentation regarding the decommission timeline and procedures.",
        },
      ],
    },
    {
      version: "v3.2.0",
      date: "2025-05-01",
      changes: [
        {
          title: "Feature",
          description:
            "Enhanced validation rules for incoming data to improve overall quality.",
        },
        {
          title: "Information",
          description:
            "Updated integration guides with new best practices and examples.",
        },
      ],
    },
    {
      version: "v2.0.0",
      date: "2025-04-05",
      changes: [
        {
          title: "Data Frequency",
          description:
            "Refined scheduling algorithms to adjust refresh rates dynamically based on system load.",
        },
        {
          title: "Information",
          description:
            "Revised technical documentation to reflect the new frequency parameters and their impact.",
        },
      ],
    },
    {
      version: "v1.0.0",
      date: "2025-01-10",
      changes: [
        {
          title: "Data Contract Initialized",
          description:
            "Launched the initial version of the data contract with core specifications and guidelines.",
        },
      ],
    },
  ];

  return (
    <ThemeProvider>
      <AppLayout>
        <AppHeader />
        <main
          style={{
            maxWidth: "1200px",
            margin: "2rem auto",
            padding: "1rem",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
        >
          <section>
            <h2>Data Contract</h2>
            <DataContractPage />
          </section>
          <section>
            <Changelog items={changelogData} />
          </section>
        </main>
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
