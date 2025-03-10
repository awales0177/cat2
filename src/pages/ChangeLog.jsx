import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
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

// A mapping array to get the proper icon based on keywords.
const iconMapping = [
  { keyword: "data contract initialized", icon: <FaRocket style={{ color: "#4caf50" }} /> },
  { keyword: "feature", icon: <FaStar style={{ color: "#2196f3" }} /> },
  { keyword: "data frequency", icon: <FaSyncAlt style={{ color: "#ff9800" }} /> },
  { keyword: "decom", icon: <FaArchive style={{ color: "#9c27b0" }} /> },
  { keyword: "information", icon: <FaInfoCircle style={{ color: "#555" }} /> },
];
const defaultIcon = <FaInfoCircle style={{ color: "#555" }} />;

const getChangeIcon = (title) => {
  const lowerTitle = title.toLowerCase();
  for (const mapping of iconMapping) {
    if (lowerTitle.includes(mapping.keyword)) return mapping.icon;
  }
  return defaultIcon;
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    fontFamily: "Arial, sans-serif",
    padding: "0 1rem",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionHeader: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
  },
  item: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#f7f7f7",
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
  },
  date: {
    color: "#666",
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
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
  },
  listItem: {
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
  },
  changeText: {
    marginLeft: "0.5rem",
  },
};

// Error Boundary to catch any errors in the changelog UI
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "1rem", color: "red" }}>
          Something went wrong. Please try again later.
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const ChangelogItem = React.memo(({ item, isExpanded, toggleItem }) => {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  // Update max-height dynamically based on content size.
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isExpanded, item]);

  // Keyboard accessibility for toggling
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleItem(item.version);
    }
  };

  // Compute a unique ID for the collapsible region
  const contentId = useMemo(
    () => `changelog-content-${item.version.replace(/\s+/g, "-")}`,
    [item.version]
  );

  return (
    <div style={styles.item}>
      <div
        style={styles.header}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#eaeaea")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = styles.header.backgroundColor)
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
          <h3 id={`changelog-header-${item.version.replace(/\s+/g, "-")}`} style={styles.version}>
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
        style={{
          ...styles.listContainer,
          maxHeight,
          opacity: isExpanded ? 1 : 0,
        }}
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
          <div style={{ padding: "1rem", fontStyle: "italic", color: "#999" }}>
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

const TodoSection = React.memo(({ items }) => (
  <div style={styles.section}>
    <div style={styles.sectionHeader}>To‑Do</div>
    {items.map((item, idx) => (
      <div key={idx} style={styles.item}>
        <div style={{ ...styles.header, cursor: "default" }}>
          <div style={styles.title}>
            <h3 style={styles.version}>{item.version}</h3>
            <span style={styles.date}>{item.date}</span>
          </div>
        </div>
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
          <div style={{ padding: "1rem", fontStyle: "italic", color: "#999" }}>
            No tasks available.
          </div>
        )}
      </div>
    ))}
  </div>
));

TodoSection.propTypes = {
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

const Changelog = ({ items }) => {
  const [expandedVersion, setExpandedVersion] = useState(null);

  // useCallback to avoid recreating the function on each render.
  const toggleItem = useCallback((version) => {
    setExpandedVersion((prev) => (prev === version ? null : version));
  }, []);

  // Separate items into regular and To‑Do sections.
  const regularItems = useMemo(
    () => items.filter((item) => item.version.toLowerCase() !== "todo:"),
    [items]
  );
  const todoItems = useMemo(
    () => items.filter((item) => item.version.toLowerCase() === "todo:"),
    [items]
  );

  return (
    <ErrorBoundary>
      <div style={styles.container}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>Changelog</div>
          {regularItems.map((item) => (
            <ChangelogItem
              key={item.version}
              item={item}
              isExpanded={expandedVersion === item.version}
              toggleItem={toggleItem}
            />
          ))}
        </div>
        {todoItems.length > 0 && <TodoSection items={todoItems} />}
      </div>
    </ErrorBoundary>
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

export default Changelog;
