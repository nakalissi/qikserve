import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ItemProps, MenuProps } from "../../../interfaces/types.interface";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from "@mui/material";
import MenuBarButton from "../../atoms/MenuBarButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const MenuContent: React.FC<{
  menus: MenuProps[];
  filteredMenus: MenuProps[];
  handleOpen: (item: ItemProps) => void;
}> = ({ menus, filteredMenus, handleOpen }) => {
  const [session, setSession] = useState(242403);
  const { currency } = useSelector(
    (state: RootState) => state.settings.settings
  );
  const handleChange = (id: number) => {
    setSession(id);
    const element = document.getElementById(id.toString());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {menus &&
          menus?.map(({ id, name, images }, index) => (
            <MenuBarButton
              id={id}
              key={index}
              isActive={session === id}
              name={name}
              image={images?.[0]?.image}
              handleChange={handleChange}
            />
          ))}
      </Box>
      <Box>
        {filteredMenus?.map(({ id, name, items }, index) => (
          <Accordion
            id={id.toString()}
            key={index}
            defaultExpanded
            disableGutters
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5" component="h5">
                {name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {items?.map((item, index) => (
                <Grid
                  container
                  spacing={2}
                  mt={4}
                  key={index}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpen(item)}
                >
                  <Grid size={8}>
                    <Typography variant="body2" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {item.description}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {currency}
                      {item.price.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid
                    size={4}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {item.images?.[0]?.image && (
                      <Avatar
                        src={item.images?.[0]?.image}
                        variant="rounded"
                        alt={item.name}
                        sx={{ width: 128, height: 85 }}
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default MenuContent;
