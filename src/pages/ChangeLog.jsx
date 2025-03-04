import React, { useState } from 'react';
import { Box, Typography, Fab } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

const changelogEntries = [
  { version: "1.0.0", date: "2023-01-01", description: "Initial release of the Metro Map component.", status: "done" },
  { version: "1.0.1", date: "2023-01-15", description: "Minor bug fixes and performance improvements.", status: "done" },
  { version: "1.1.0", date: "2023-02-15", description: "Added interactive nodes with custom handles.", status: "done" },
  { version: "1.1.1", date: "2023-02-25", description: "Fixed layout issues on smaller screens.", status: "done" },
  { version: "1.2.0", date: "2023-03-10", description: "Integrated React Flow for dynamic node and edge management.", status: "in progress" },
  { version: "1.3.0", date: "2023-04-05", description: "Included header SVG and detailed description section.", status: "in progress" },
  { version: "1.3.1", date: "2023-04-20", description: "Updated theme colors and typography.", status: "failed" },
  { version: "1.4.0", date: "2023-05-20", description: "Improved styling and layout for responsive design.", status: "done" },
  { version: "1.5.0", date: "2024-06-10", description: "Added dark mode support.", status: "done" },
  { version: "1.6.0", date: "2025-07-15", description: "Optimized component performance and loading times.", status: "done" }
];

const getStatusIcon = (status) => {
  switch (status) {
    case "done":
      return <CheckCircleIcon sx={{ color: 'green' }} />;
    case "in progress":
      return <HourglassEmptyIcon sx={{ color: 'orange' }} />;
    case "failed":
      return <CancelIcon sx={{ color: 'red' }} />;
    default:
      return null;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "done":
      return 'green';
    case "in progress":
      return 'orange';
    case "failed":
      return 'red';
    default:
      return 'grey.300';
  }
};

const Changelog = () => {
  // Only show the most recent three entries initially.
  const [visibleCount, setVisibleCount] = useState(3);
  const totalEntries = changelogEntries.length;
  
  // Get visible entries (newest at the top, oldest at the bottom)
  const visibleEntries = changelogEntries
    .slice(totalEntries - visibleCount, totalEntries)
    .reverse();

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, totalEntries));
  };

  return (
    <Box sx={{ mt: 4, maxWidth: 800, mx: 'auto', pt: '40px' }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'left' }}>
        Changelog
      </Typography>
      <Timeline position="alternate">
        {/* Latest node */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: 'transparent', border: '1px solid lightgray' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle2" color="text.secondary">
              Latest
            </Typography>
          </TimelineContent>
        </TimelineItem>
        {/* Changelog entries */}
        {visibleEntries.map((entry, index) => {
          // If all logs are loaded, the last visible item should have a connector to the "Oldest" node.
          const isLastVisible = index === visibleEntries.length - 1;
          const showConnector = visibleCount === totalEntries ? true : !isLastVisible;
          return (
            <TimelineItem key={totalEntries - visibleCount + index}>
              <TimelineSeparator>
                <TimelineDot sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                  {getStatusIcon(entry.status)}
                </TimelineDot>
                {showConnector && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    border: `1px solid ${getStatusColor(entry.status)}`,
                    borderRadius: '8px',
                    p: 1,
                    display: 'inline-block',
                    maxWidth: '80%',
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Version {entry.version} - {entry.date}
                  </Typography>
                  <Typography variant="body1">
                    {entry.description}
                  </Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          );
        })}
        {/* Oldest node (only show when all logs are loaded) */}
        {visibleCount === totalEntries && (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot sx={{ backgroundColor: 'transparent', border: '1px solid lightgray' }} />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" color="text.secondary">
                Oldest
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}
      </Timeline>
      {/* Load older logs button and caption */}
      {visibleCount < totalEntries && (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
          <Fab color="primary" size="small" onClick={handleLoadMore}>
            <AddIcon />
          </Fab>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            Load older logs
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Changelog;
