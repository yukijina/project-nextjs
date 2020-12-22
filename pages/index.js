import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';
import EnhanceTable from '../src/ui/EnhanceTable';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  service: {
    fontWeight: 300
  },
  users: {
    marginRight: 0
  },
  button: {
    color: "fff",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.common.light,
    }
  }
}));

function createData(name, date, service, features, complexity, platforms, users, total, search) {
  return { name, date, service ,features, complexity, platforms, users, total, search }
}

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState('');
  const [service, setService] = useState('');
  const [complexity, setComplexity] = useState('');
  const [users, setUsers] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const platformOptions = ["Web", "iOS", "Android"]

  let featureOptions = ["Photos/Videos",  "GPS", "File Transfer", "Users/Authentication", "Biometrics" , "Push Notifications"]

  let websiteOptions = ["Basic", "Interactive", "E-Commerce"]

  const [rows, setRows] = useState([
    createData("Ulon Mask", "11/2/19", "Website", "E-commerce", "N/A", "N/A", "N/A", "$1500", true),
    createData("Gill Gates", "10/17/19", "Costom Software", "GPS, Push Notification, Users/Authentication, Filetransfer", "Medium","Web Application", "0-10", "$1600", true),
    createData("Ateve Jobs", "2/3/19", "Custom Software", "Photo/Video, File Transfer, User/Authentication", "Low", "Web Apprecation", "0-100", "$1500", true),
    createData("Kteve Jobs", "2/3/20", "Custom Software", "Photo/Video, File Transfer, User/Authentication", "Low", "Web Apprecation", "0-100", "$1500", true),
    createData("Jon Beck", "2/3/20", "Custom Software", "Photo/Video, File Transfer, User/Authentication", "Low", "Web Apprecation", "0-100", "$1500", true),
    createData("Elbert Ainshtain", "2/3/20", "Custom Software", "Photo/Video, File Transfer, User/Authentication", "Low", "Web Apprecation", "0-100", "$1500", true),
  ])

  const addProject = () => {
    setRows([
      ...rows, 
      createData(
        name, 
        format(date, "MM/dd/yy"), 
        service, 
        features.join(", "), 
        service === "Website" ? "N/A" : complexity, 
        service === "Website" ? "N/A" : platforms.join(", "), 
        service === "Website" ? "N/A" : users, `$${total}`,
        true
        )])
    setDialogOpen(false);
    setName("");
    setDate(new Date());
    setTotal("");
    setService("");
    setComplexity("");
    setUsers("");
    setPlatforms([]);
    setFeatures([]);
  }
  
  // Find matching table from input value
  const handleSearch = (e) => {
    setSearch(e.target.value)
    const rowData = rows.map(row => Object.values(row).filter(option => option !== true && option !==false));
    
    // get matched data with input value
    const matches = rowData.map(row => row.map(option => option.toLowerCase().includes(e.target.value.toLowerCase())))
    
    const newRows = [...rows];
    matches.map((row, index) => 
      row.includes(true) 
      ? newRows[index].search = true 
      : newRows[index].search = false
    )
    
    setRows[newRows];
    setPage(0)
  }


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid container direction="column" alignItems={matchesSM ? "center": undefined}>
      <Grid item style={{ marginTop: "2em", marginLeft: matchesSM ? 0 : "5em"}}>
        <Typography variant="h1">Projects</Typography>
      </Grid>
      <Grid item>
        <TextField
          placeholder="Search proect details or create a new entry."
          value={search}
          onChange={handleSearch}
          style={{ width: matchesSM ? "25em" : "35em", marginLeft: matchesSM ? 0 : "5em"}} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={() => setDialogOpen(true)} style={{ cursor: "pointer" }}>
                <AddIcon color="primary" style={{ fontSize: 30 }} />
              </InputAdornment>
             )
          }}
        />
      </Grid>
      <Grid item style={{ marginLeft: matchesSM ? 0 : "5em", marginTop: "2em"}}>
        <FormGroup row>
          <Grid container direction={matchesSM ? "column" : "row"} justify={matchesSM ? "center" : undefined }>
            <Grid item>
              <FormControlLabel 
                style={{ marginRight: matchesSM ? 0 : "5em "}}
                control={
                  <Switch
                    checked={websiteChecked}
                    color="primary"
                    onChange={() => setWebsiteChecked(!websiteChecked)}
                  />}
                label="website" 
                labelPlacement={matchesSM ? "end" : "start"}
              />
            </Grid>
            <Grid item>
              <FormControlLabel 
                style={{ marginRight: matchesSM ? 0 : "5em "}}
                control={
                  <Switch
                    checked={iOSChecked}
                    color="primary"
                    onChange={() => setIOSChecked(!iOSChecked)}
                  />}
                label="iOS Apps" 
                labelPlacement={matchesSM ? "end" : "start"}
             />
            </Grid>
            <Grid item>
              <FormControlLabel 
                style={{ marginRight: matchesSM ? 0 : "5em "}}
                control={
                  <Switch
                    checked={androidChecked}
                    color="primary"
                    onChange={() => setAndroidChecked(!androidChecked)}
                  />}
                label="android Apps" 
                labelPlacement={matchesSM ? "end" : "start"}
              />
            </Grid>
            <Grid item>
             {/* Last element, we don't need margin right */}
            <FormControlLabel 
              control={
                <Switch
                  checked={softwareChecked}
                  color="primary"
                  onChange={() => setSoftwareChecked(!softwareChecked)}
                />}
              label="Custom Software" 
              labelPlacement={matchesSM ? "end" : "start"}
            />
            </Grid>
          </Grid>    
         </FormGroup>    
      </Grid>
      <Grid item style={{ marginTop: "5em", maxWidth: "100%", marginBottom: matchesMD ? "40em" : "35em"}}>
        <EnhanceTable 
          rows={rows} 
          page={page} 
          setPage={setPage}
          websiteChecked={websiteChecked}
          iOSChecked={iOSChecked}
          androidChecked={androidChecked}
          softwareChecked={softwareChecked}
          />
        {/* <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  Name
                </TableCell>
                <TableCell align="center">
                  Date
                </TableCell>
                <TableCell align="center">
                  Service
                </TableCell>
                <TableCell align="center">
                  Features
                </TableCell>
                <TableCell align="center">
                  Complexity
                </TableCell>
                <TableCell align="center">
                  Platforms
                </TableCell>
                <TableCell align="center">
                  Users
                </TableCell>
                <TableCell align="center">
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.filter(row => row.search).map((row, index) => 
              <TableRow key={index}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.service}</TableCell>
                <TableCell align="center" style={{ maxWidth: "5em"}}>{row.features}</TableCell>
                <TableCell align="center">{row.complexity}</TableCell>
                <TableCell align="center">{row.platforms}</TableCell>
                <TableCell align="center">{row.users}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
              </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Grid>
      <Dialog fullWidth maxWidth="md" open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Grid container justify="center">
          <Grid item>
            <Typography variant="h1" gutterBottom>
              Add a new project
            </Typography>
          </Grid>
        </Grid>

        <DialogContent>
          <Grid container justify="space-between">
            <Grid item>
              <Grid item container direction="column" sm>
                <Grid item>
                  <TextField fullWidth label="Name" id="name" value={name} onChange={(event) => setName(event.target.value)} />
                </Grid>
                <Grid item container direction="column" style={{ marginTop: "5em" }}>
                  <Grid item>
                    <Typography variant="h4">Service</Typography>
                  </Grid>
                  <Grid item>
                    <RadioGroup 
                      aria-label="service" 
                      name="service" 
                      value={service} 
                      onChange={e => {
                        setService(e.target.value); 
                        setFeatures([])
                      }}
                    >
                      <FormControlLabel 
                        // classes -> overwrite material ui default (not use className)
                        classes={{ label: classes.service }}
                        value="Website"
                        label="Website"
                        control={<Radio />} 
                      />
                      <FormControlLabel 
                        classes={{ label: classes.service }}
                        value="Mobille App"
                        label="Mobille App"
                        control={<Radio />}
                      />
                      <FormControlLabel 
                        classes={{ label: classes.service }}
                        value="Custom Software"
                        label="Custom Software"
                        control={<Radio />} 
                      />
                    </RadioGroup>
                  </Grid>

                  <Grid item style={{ marginTop: "5em"}}>
                    <Select 
                      disabled={service === "Website"}
                      labelId="platforms" 
                      id="platforms" 
                      multiple 
                      displayEmpty
                      style={{ width: "12em"}}
                      renderValue={platforms.length > 0 ? undefined : () => "Platforms"}
                      value={platforms} 
                      onChange={e => setPlatforms(e.target.value) }>
                        {platformOptions.map(option => 
                          <MenuItem
                            key={option}
                            value={option}
                            >
                              {option}
                          </MenuItem>
                          )}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid item container direction="column" alignItems="center" sm style={{ marginTop: 16 }}>
                <Grid item>
                  <KeyboardDatePicker format="MM/dd/yyyy" value={date} onChange={newDate => setDate(newDate)} />
                </Grid>
                <Grid item>
                  <Grid item container direction="column" style={{ marginTop: "5em" }}>
                    <Grid item>
                      <Typography variant="h4">Complexity</Typography>
                    </Grid>
                
                    <Grid item>
                      <RadioGroup 
                        aria-label="complexity" 
                        name="complexity" 
                        value={complexity} 
                        onChange={e => setComplexity(e.target.value)}
                      >
                        <FormControlLabel 
                          // classes -> overwrite material ui default (not use className)
                          disabled={service === "Website"}
                          classes={{ label: classes.service }}
                          value="Low"
                          label="Low"
                          control={<Radio />} 
                        />
                        <FormControlLabel 
                          disabled={service === "Website"}
                          classes={{ label: classes.service }}
                          value="Medium"
                          label="Medium"
                          control={<Radio />}
                        />
                        <FormControlLabel 
                          disabled={service === "Website"}
                          classes={{ label: classes.service }}
                          value="High"
                          label="High"
                          control={<Radio />} 
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> 
            </Grid>

            <Grid item>
              <Grid item container direction="column" sm alignItems="flex-end">
                <Grid item>
                  <TextField 
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                    value={total} 
                    id="total" 
                    label="Total" 
                    onChange={e=> setTotal(e.target.value)} 
                  />
                </Grid>
                <Grid item>
                  <Grid item container direction="column" style={{ marginTop: "5em" }}>
                    <Grid item>
                      <Typography variant="h4">Users</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup 
                        aria-label="users" 
                        name="users" 
                        value={users} 
                        onChange={e => setUsers(e.target.value)}
                      >
                        <FormControlLabel 
                          // classes -> overwrite material ui default (not use className)
                          disabled={service === "Website"}
                          classes={{ label: classes.service, root: classes.users }}
                          value="0-10"
                          label="0-10"
                          control={<Radio />} 
                        />
                        <FormControlLabel 
                          disabled={service === "Website"}
                          classes={{ label: classes.service, root: classes.users }}
                          value="10-100"
                          label="10-100"
                          control={<Radio />}
                        />
                        <FormControlLabel 
                          disabled={service === "Website"}
                          classes={{ label: classes.service, root: classes.users }}
                          value="100+"
                          label="100+"
                          control={<Radio />} 
                        />
                      </RadioGroup>
                    </Grid>

                    <Grid item style={{ marginTop: "5em"}}>
                      <Select 
                        labelId="features" 
                        id="features" 
                        multiple 
                        displayEmpty
                        MenuProps={{ style:{ zIndex: 1302 }}}
                        style={{ width: "12em"}}
                        renderValue={features.length > 0 ? undefined : () => "Features"}
                        value={features} 
                        onChange={e => setFeatures(e.target.value) }>
                          {service === "Website" ? featureOptions = websiteOptions : null}
                          {featureOptions.map(option => 
                            <MenuItem
                              key={option}
                              value={option}
                              >
                                {option}
                            </MenuItem>
                            )}
                      </Select>
                    </Grid>

                  </Grid>
                </Grid>               
              </Grid>        
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: "3em"}}>
            <Grid item>
              <Button onClick={() => setDialogOpen(false)} color="primary" style={{ fontWeght: 300}}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button  
                  onClick={addProject} 
                  variant="contained" 
                  disabled={
                    service === "Website" 
                      ? name.length === 0 || total.length === 0 || features.length === 0 || features.length > 1 
                      : name.length === 0 || total.length === 0 || features.length === 0 || users.length === 0 || complexity.length === 0 || platforms.length === 0 || service.length === 0 
                  } 
                  className={classes.button}>
                    Add Project +
                </Button>
              </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
    </MuiPickersUtilsProvider>
  )

}