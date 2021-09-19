import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FlashCard from './FlashCard';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { styles } from 'Styles/FlashSale/FlashSaleStyles';
import TuneIcon from '@material-ui/icons/Tune';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Advisor from './Adivsor';

const cards = [
   {
      title: 'Dubai',
      desc: 'The Dubai that no one sees',
      service: 'The GOODFLY guide on site will welcome you ...',
      noofJourneys: '2 jours',
      price: '> $200',
      image: 'https://images.unsplash.com/photo-1583499882110-688e720b025e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHViYWl8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
   },
   {
      title: 'Dubai',
      desc: 'The Dubai that no one sees',
      service: 'The GOODFLY guide on site will welcome you ...',
      noofJourneys: '2 jours',
      price: '> $200',
      image: 'https://images.unsplash.com/photo-1610823230542-55da5ce635aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZHViYWl8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
   },

   {
      title: 'Dubai',
      desc: 'The Dubai that no one sees',
      service: 'The GOODFLY guide on site will welcome you ...',
      noofJourneys: '2 jours',
      price: '> $200',
      image: 'https://images.unsplash.com/photo-1589695021834-9f2413573b28?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZHViYWl8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
   },
   {
      title: 'Dubai',
      desc: 'The Dubai that no one sees',
      service: 'The GOODFLY guide on site will welcome you ...',
      noofJourneys: '2 jours',
      price: '> $2000',
      image: 'https://images.unsplash.com/photo-1610823230542-55da5ce635aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZHViYWl8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
   },
];

const options = ['Price', 'Date', 'Duration', 'Best Score'];

export default function Album() {
   const classes = styles();

   //? Filter Menu State
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);

   //? Closing filter menu
   const handleClose = () => {
      setAnchorEl(null);
   };

   // ? Filter Menu open
   const filterMenuOpen = (e) => {
      setAnchorEl(e.currentTarget);
   };

   //? Filter Item selected
   const filterSelected = (e) => {
      //? Got the selected filter value, uncomment below line
      //   const { filter } = e.currentTarget.dataset;
      //   console.log(filter);

      setAnchorEl(null);
   };

   return (
      <React.Fragment>
         <CssBaseline />

         <main className={classes.root}>
            {/* Hero unit */}
            <Container className={classes.cardGrid} maxWidth='lg'>
               <div className={classes.heroContent}>
                  <Container className={classes.mainFeaturedPost}>
                     <section className={classes.title}>
                        <Typography variant='h3'>
                           FLASH SALE
                           <FlashOnIcon sx={{ marginLeft: 2 }} />
                        </Typography>
                     </section>
                     <Advisor />
                  </Container>

                  <section className={classes.filter}>
                     <TuneIcon />
                     <Typography variant='subtitle1'>
                        Select a filter
                     </Typography>
                     <IconButton
                        aria-label='more'
                        aria-controls='long-menu'
                        aria-haspopup='true'
                        onClick={filterMenuOpen}
                     >
                        <ArrowDownIcon />
                     </IconButton>
                     <Menu
                        id='long-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                     >
                        {options.map((option, index) => (
                           <MenuItem
                              key={`${option}_${index}`}
                              data-filter={option}
                              onClick={filterSelected}
                           >
                              {option}
                           </MenuItem>
                        ))}
                     </Menu>
                  </section>
               </div>
               {/* End hero unit */}

               {/* Upper GridView */}
               <Grid container spacing={4}>
                  {cards.map((card) => (
                     <Grid item key={card} xs={12} sm={6} md={4}>
                        <FlashCard {...card} />
                     </Grid>
                  ))}
               </Grid>

               {/* Space Container */}
               <div className={classes.spaceSection}>
                  <Typography variant='h5'>PUB SPACE</Typography>
               </div>

               {/* Lower GridView */}
               <Grid container spacing={4}>
                  {cards.map((card) => (
                     <Grid item key={card} xs={12} sm={6} md={4}>
                        <FlashCard {...card} />
                     </Grid>
                  ))}
               </Grid>
            </Container>
         </main>
      </React.Fragment>
   );
}
