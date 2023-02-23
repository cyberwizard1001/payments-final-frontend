import React, {useState, Fragment, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../styles/Orders.css";
import axios from "axios";


const rows = [{
    ID: "AB",
    Code: "5686",
    Items: [{
        ItemID: "5",
        ItemName: "Burger",
        Quantity: "3"
    },
        {
            ItemID: "6",
            ItemName: "Pizza",
            Quantity: "2"
        }],
    TotalPrice: "$10.00"
},
    {
        ID: "AB",
        Code: "5686",
        Items: [{
            ItemID: "5",
            ItemName: "Burger",
            Quantity: "3"
        },
            {
                ItemID: "6",
                ItemName: "Pizza",
                Quantity: "2"
            }],
        TotalPrice: "$10.00"
    },
    {
        ID: "AB",
        Code: "5686",
        Items: [{
            ItemID: "5",
            ItemName: "Burger",
            Quantity: "3"
        },
            {
                ItemID: "6",
                ItemName: "Pizza",
                Quantity: "2"
            }],
        TotalPrice: "$10.00"
    },
    {
        ID: "AB",
        Code: "5686",
        Items: [{
            ItemID: "5",
            ItemName: "Burger",
            Quantity: "3"
        },
            {
                ItemID: "6",
                ItemName: "Pizza",
                Quantity: "2"
            }],
        TotalPrice: "$10.00"
    },
    {
        ID: "AB",
        Code: "5686",
        Items: [{
            ItemID: "5",
            ItemName: "Burger",
            Quantity: "3"
        },
            {
                ItemID: "6",
                ItemName: "Pizza",
                Quantity: "2"
            }],
        TotalPrice: "$10.00"
    },
];


export default function BasicTable() {

    const [rows, setRows] = React.useState([]);
    useEffect(() => {
        // Fetch resource when Component mounts
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost:3001/api/order/display");
                const updatedData = result.data.map((item, index) => {
                    return {ID: item.vendorId, Code: item.billerCode, Items: item.items, TotalPrice: item.totalPrice};
                });

                setRows(updatedData);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();

    }, []);

    return (
        <div className="vendors">
            <div className="title">
                <center><h2>Orders</h2></center>
            </div>
            <div className="table">
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>CODE</TableCell>
                                <TableCell>ITEM ID</TableCell>
                                <TableCell>ITEM NAME</TableCell>
                                <TableCell>QUANTITY</TableCell>
                                <TableCell>TOTAL PRICE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.Name} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row">{row.ID}</TableCell>
                                    <TableCell>{row.Code}</TableCell>
                                    <TableCell>{row.Items.map((item, index) => (
                                        <tr key={index}>{item._id}</tr>))}</TableCell>
                                    <TableCell>{row.Items.map((item, index) => (
                                        <tr key={index}>{item.name}</tr>))}</TableCell>
                                    <TableCell>{row.Items.map((item, index) => (
                                        <tr key={index}>{item.quantity}</tr>))}</TableCell>
                                    <TableCell>{row.TotalPrice}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}