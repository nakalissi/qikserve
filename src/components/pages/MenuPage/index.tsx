import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import SearchField from "../../atoms/SearchField";
import Cart from "../../molecules/Cart";
import CustomizedDialog from "../../molecules/CustomizedDialog";
import MenuContent from "../../molecules/MenuContent";
import { fetchMenuDetails } from "../../../services/api";
import { ItemProps, MenuProps } from "../../../interfaces/types.interface";

const MenuPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [modalContent, setModalContent] = useState<ItemProps | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMenuDetails()
      .then((response) => {
        setMenus(response as MenuProps[]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  function handleSearch(value: string): void {
    setSearchTerm(value);
  }

  function handleClose(): void {
    setOpen(false);
    setModalContent(null);
  }

  function handleOpen(content: ItemProps): void {
    setOpen(true);
    setModalContent(content);
  }

  const filteredMenus = menus.map((menu) => ({
    ...menu,
    items: menu.items?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={12} sx={{ marginTop: 2 }}>
            <SearchField handleSearch={handleSearch} />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 400,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <MenuContent
                    menus={menus}
                    filteredMenus={filteredMenus}
                    handleOpen={handleOpen}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Cart />
          </Grid>
        </Grid>
      </Container>
      <CustomizedDialog
        isOpen={isOpen}
        content={modalContent}
        handleClose={handleClose}
      />
    </>
  );
};

export default MenuPage;
