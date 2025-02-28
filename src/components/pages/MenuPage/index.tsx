import { useEffect, useState } from "react";

import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Cart from '../../molecules/Cart';
import { fetchMenuDetails } from "../../../services/api";
import CustomizedDialog from "../../molecules/CustomizedDialog";
import { ItemProps, MenuProps } from "../../../interfaces/types.interface";
import SearchField from "../../atoms/SearchField";
import MenuBarButton from "../../atoms/MenuBarButton";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const MenuPage = () => {
  const { currency } = useSelector((state: RootState) => state.settings.settings);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [session, setSession] = useState(242403);
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [modalContent, setModalContent] = useState<ItemProps | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (id: number) => {
    setSession(id);
    const element = document.getElementById(id.toString());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
  };

  function handleOpen(content: ItemProps): void {
    setOpen(true);
    setModalContent(content);
  };

  const filteredMenus = menus.map(menu => ({
    ...menu,
    items: menu.items?.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={12} sx={{ marginTop: 2 }}>
            <SearchField handleSearch={handleSearch} />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                {isLoading ?
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                    <CircularProgress />
                  </Box>
                  :
                  <>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      {menus.map(({ id, name, images }, index) => (
                        <MenuBarButton id={id} key={index} isActive={session === id} name={name} image={images?.[0]?.image} handleChange={handleChange} />
                      ))}
                    </Box>
                    <Box>
                      {filteredMenus.map(({ id, name, items }, index) => (
                        <Accordion id={id.toString()} key={index} defaultExpanded disableGutters>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <Typography variant="h5" component="h5">{name}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {items?.map((item, index) => (
                              <Grid container spacing={2} mt={4} key={index} sx={{ cursor: 'pointer' }} onClick={() => handleOpen(item)}>
                                <Grid size={8}>
                                  <Typography variant="body2" fontWeight="bold">{item.name}</Typography>
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                                  <Typography variant="body2" fontWeight="bold">{currency}{item.price.toFixed(2)}</Typography>
                                </Grid>
                                <Grid size={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                  {item.images?.[0]?.image && <Avatar src={item.images?.[0]?.image} variant="rounded" alt={item.name} sx={{ width: 128, height: 85 }} />}
                                </Grid>
                              </Grid>
                            ))}
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Box>
                  </>}
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
}

export default MenuPage;