import React, { useState, useEffect } from 'react'
import Table from '../../layouts/Table'
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
} from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Delete, Edit } from '@mui/icons-material'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/orderActions'

function OrderList(props) {
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    props.fetchAllorder()
  }, [props.orderList])
  //
  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this Order?')) {
      props.deleteOrder(id, () => {
        window.alert('Order Deleted!')
      })
    }
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order No.</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Payed With</TableCell>
            <TableCell>Grand Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.orderList.map((item) => (
            <TableRow key={item.orderMasterId}>
              <TableCell>{item.orderNumber}</TableCell>
              <TableCell>{item.customer.customerName}</TableCell>
              <TableCell>{item.pMethod}</TableCell>
              <TableCell>{item.gTotal}</TableCell>
              <TableCell>
                <ButtonGroup variant="text">
                  <Button>
                    <Edit
                      color="primary"
                      onClick={() => setCurrentId(item.orderMasterId)}
                    />
                  </Button>
                  <Button>
                    <Delete
                      color="seconday"
                      onClick={() => onDelete(item.orderMasterId)}
                    />
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

const mapStateToProps = (state) => ({
  orderList: state.orderReducer.list,
})
const mapActionToProps = {
  fetchAllorder: actions.fetchAllorder,
  deleteOrder: actions.deleteOrder,
}

export default connect(mapStateToProps, mapActionToProps)(OrderList)
