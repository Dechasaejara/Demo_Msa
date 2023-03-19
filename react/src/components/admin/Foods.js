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
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/foodActions'
import { Button } from '@material-ui/core'
import { Delete, Edit } from '@mui/icons-material'
import { createAPIEndpoint, ENDPIONTS } from '../../redux/api'
import { Typography } from '@mui/material'
import FoodsForm from './FoodsForm'

//
function Foods(props) {
  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {
    props.fetchAllfoods()
  }, [props.foodList])

  // delete FoodItem
  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this FoodItem?')) {
      props.deleteFood(id, () => {
        window.alert('FoodItem Deleted!')
      })
    }
  }
  return (
    <Paper>
      <Grid container>
        <Grid item xs={6} align="center">
          <Typography gutterBottom variant="h3">
            Create new FoodItem
          </Typography>
          <FoodsForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6} align="center">
          <Typography gutterBottom variant="h3" align="center">
            All FoodItem list
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>FoodItem Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.foodList.map((item, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell> {item.foodItemId} </TableCell>
                      <TableCell> {item.foodItemName} </TableCell>
                      <TableCell> ${item.price} </TableCell>
                      <TableCell>
                        <Avatar
                          src={item.foodMainImgName}
                          alt={item.foodMainImgSrc}
                        />
                      </TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <Edit
                              color="primary"
                              onClick={() => setCurrentId(item.foodItemId)}
                            />
                          </Button>
                          <Button>
                            <Delete
                              color="seconday"
                              onClick={() => onDelete(item.foodItemId)}
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
  foodList: state.foodReducer.list,
})
const mapActionToProps = {
  fetchAllfoods: actions.fetchAllfoods,
  deleteFood: actions.deleteFood,
}

export default connect(mapStateToProps, mapActionToProps)(Foods)
