import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Sidebar = ({ schema }) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 250, boxSizing: "border-box" },
      }}
    >
      <div style={{ padding: "16px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Data Schema
        </Typography>
      </div>
      <List>
        {schema.map((model) => (
          <div key={model.id}>
            <ListItemButton onClick={() => toggleSection(model.title)}>
              <ListItemText primary={model.title} />
              {openSections[model.title] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSections[model.title]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {model.fields.map((field, index) => (
                  <ListItemButton key={index} sx={{ pl: 4 }}>
                    <ListItemText primary={field} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
