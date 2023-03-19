import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Avatar,
  ButtonGroup,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import CustomerForm from './CustomerForm'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/userActions'
import { Button } from '@material-ui/core'
import { Delete, Edit } from '@mui/icons-material'
import { Typography } from '@mui/material'
//
function Customer(props) {
  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {
    props.fetchAllusers()
  }, [props.customerList])

  // delete customer
  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this Customer?')) {
      props.deleteUser(id, () => {
        window.alert('Customer Deleted!')
      })
    }
  }
  return (
    <Paper>
      <Grid container>
        <Grid item xs={6} align="center">
          <Typography gutterBottom variant="h3">
            Create new Customer
          </Typography>
          <CustomerForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6} align="center">
          <Typography gutterBottom variant="h3" align="center">
            All Customer list
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.customerList.map((item, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell> {item.customerID} </TableCell>
                      <TableCell> {item.customerName} </TableCell>
                      <TableCell>
                        <Avatar
                          src={item.customerAvator}
                          alt={item.avatorImgSrc}
                        />
                      </TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <Edit
                              color="primary"
                              onClick={() => setCurrentId(item.customerID)}
                            />
                          </Button>
                          <Button>
                            <Delete
                              color="seconday"
                              onClick={() => onDelete(item.customerID)}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  )
}
const mapStateToProps = (state) => ({
  customerList: state.userReducer.list,
})
const mapActionToProps = {
  fetchAllusers: actions.fetchAllusers,
  deleteUser: actions.deleteUser,
}

export default connect(mapStateToProps, mapActionToProps)(Customer)
