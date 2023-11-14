import { Box, Button, FormControlLabel, FormGroup, Typography, Paper, Switch, styled, OutlinedInput, InputLabel } from '@mui/material';
import { Select, MenuItem, FormControl } from '@mui/material';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider';
import { database } from './Database';
import { LocalizationProvider, MobileDateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment/moment';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 52,
    height: 28,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 25,
        height: 25,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Dashboard = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [data, setData] = useState(database);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [roomDetails, setRoomDetails] = useState(null);
    const [guestName, setGuestName] = useState("");

    useEffect(() => {
        if (localStorage.getItem("RoomsData")) {
            setData(JSON.parse(localStorage.getItem("RoomsData")))
        }
    }, [])

    console.log(data)
    const handleRoomChange = (event) => {
        setSelectedRoom(event.target.value);
    };
    console.log(selectedRoom)
    const handleAction = (index) => {
        setRoomDetails(data[index]);
    }


    const handleCheckInTimeChange = (time) => {
        setCheckInTime(time);
    };

    const handleCheckOutTimeChange = (time) => {
        setCheckOutTime(time);
    };

    const handleSave = () => {
        if (selectedRoom && checkInTime && checkOutTime && guestName) {
            console.log('Check-in Time:', checkInTime._d);
            console.log('Check-out Time:', checkOutTime._d);
            data[selectedRoom].available = false;
            data[selectedRoom].checkin = checkInTime._d;
            data[selectedRoom].checkout = checkOutTime._d;
            data[selectedRoom].name = guestName;
            console.log(selectedRoom)
            setData([...data])
            setGuestName("");
            setCheckInTime(null);
            setCheckOutTime(null);
            localStorage.setItem("RoomsData", JSON.stringify(data));
        }
        else {
            alert("Please input all fields")
        }

    };
    return (<>
        <Paper elevation={3} className={darkMode ? 'dark-mode' : 'light-mode'}>
            <Box display={'flex'} justifyContent={'space-between'} paddingInline={1}>

                <h1 style={{ padding: 0, margin: 0 }}>Dashboard</h1>
                <FormGroup
                >
                    <FormControlLabel
                        control={
                            <MaterialUISwitch sx={{ m: 1 }}
                                checked={darkMode}
                                onChange={toggleTheme}
                                inputProps={{ 'aria-label': 'controlled' }} />
                        }
                        label=""

                    />
                </FormGroup>
            </Box>
            {/* <Button onClick={toggleTheme}>
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </Button> */}
        </Paper>
        <Box display={"flex"} justifyContent={"center"} sx={{
            bgcolor: darkMode && "#111", color: darkMode && "#fff",
            transition: "background-color 0.3s, color 0.3s"
        }}>
            <Box className={darkMode ? 'dark-mode' : 'light-mode'} sx={{
                boxShadow: 8, margin: "1rem auto", width: "65%", height: "auto", bgcolor: darkMode && "#222",
            }}>

                <Box sx={{
                    margin: "1rem auto", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly",
                    transition: "background-color 0.3s, color 0.3s"
                }}>
                    {data.map((ele, index) => {
                        return (
                            <Box key={index} onClick={() => handleAction(index)} sx={{ margin: ".5rem", cursor: "pointer" }}>
                                <Box sx={{ width: "50px", height: "50px", bgcolor: ele.available ? "green" : "red" }}>
                                </Box>
                                <p style={{ margin: 0, fontSize: '.7rem' }}>Room:{index + 1}</p>
                            </Box>
                        )
                    })}
                </Box >

            </Box>
            <Box sx={{
                width: "25%", margin: "1rem auto", bgcolor: darkMode && "#222", padding: '.5rem', boxShadow: 8, height: "auto",
                display: "flex", flexDirection: "column", justifyContent: "center",
                transition: "background-color 0.3s, color 0.3s"
            }}>
                {!roomDetails && <>

                    <h4 style={{ margin: ".5rem auto", }}>Book Your Room</h4>
                    <Box sx={{ padding: "8px 16px" }}>

                        <FormControl sx={{ width: '100%', '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { height: ".3rem" } }} >
                            <Typography variant="caption" gutterBottom>
                                Guest Name
                            </Typography>
                            <TextField id="outlined-basic" value={guestName} onChange={(e) => setGuestName(e.target.value)} variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ padding: "8px 16px" }}>

                        <FormControl sx={{ width: '100%' }}>
                            <Typography variant="caption" gutterBottom>
                                Choose a Room
                            </Typography>
                            <Select
                                size='small'
                                labelId="room-select-label"
                                id="room-select"
                                value={selectedRoom}
                                onChange={handleRoomChange}
                                MenuProps={MenuProps}
                            >

                                {data.map((ele, index) => {
                                    if (ele.available) {
                                        return <MenuItem value={index}>Room No:{index + 1}</MenuItem>
                                    }

                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box elevation={3} style={{ padding: '16px' }} sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { height: ".3rem" } }}>
                        <Typography variant="caption" gutterBottom>
                            Check-in Time
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment} >
                            <MobileDateTimePicker defaultValue={moment('2022-04-17')}
                                sx={{ width: '100%' }}
                                value={checkInTime}
                                onChange={handleCheckInTimeChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box elevation={3} style={{ padding: '16px' }} sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { height: ".3rem" } }}>
                        <Typography variant="caption" gutterBottom>
                            Check-out Time
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker defaultValue={moment('2022-04-17')}
                                sx={{ width: '100%' }}
                                value={checkOutTime}
                                onChange={handleCheckOutTimeChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Book
                    </Button>
                </>}
                {roomDetails && <>
                    <Box elevation={3} style={{ padding: '2px 16px' }} sx={{ height: "100%", display: "flex", flexDirection: "column", '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { height: ".3rem" } }}>
                        <Button sx={{ alignSelf: "end" }} onClick={() => setRoomDetails(null)}>close</Button>
                        <Typography variant="caption" gutterBottom>
                            Guest Name:{roomDetails.name}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                            Room no:{roomDetails.roomID}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                            Check-in Time:{roomDetails.checkin == null ? "Not Booked" : JSON.stringify(roomDetails.checkin)}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                            Check-out Time:{roomDetails.checkout == null ? "Not Booked" : JSON.stringify(roomDetails.checkout)}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                            Availibility:{roomDetails.available ? "YES" : "NO"}
                        </Typography>
                    </Box>
                </>}
                {/* <Box>
                    {data.map((ele, index) => {
                        return (<>
                            <Box key={index}>{JSON.stringify(ele.checkout).substring(1, 11)}</Box>
                        </>)
                    })}
                </Box> */}
            </Box>
        </Box>
    </>
    );
}

export default Dashboard