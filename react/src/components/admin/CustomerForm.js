import { Grid, TextField, Button, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useForm } from '../../hooks/useForm'
import Form from '../../layouts/Form'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/userActions'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1),
    },
  },
  submitButtonGroup: {
    width: '100%',
    backgroundColor: '#718568',
    color: '#000',
    margin: theme.spacing(1),
    '& .MuiButton-label': {
      textTransform: 'none',
    },
    '&:hover': {
      backgroundColor: '#f3b33d',
    },
  },
}))
const initialValues = {
  customerName: '',
}
function CustomerForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(initialValues)
  const Classes = useStyles()

  const validate = () => {
    let temp = {}
    temp.customerName = values.customerName ? '' : 'Customer Name is Required!'
    // Other Validations
    setErrors({ ...temp })
    return Object.values(temp).every((x) => x == '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      if (props.currentId == 0) {
        props.CreateUser(values, () => {
          window.alert('User created')
        })
      } else {
        props.updateUser(props.currentId, values, () => {
          window.alert('User Updated!')
        })
      }
    }
    resetFormControls(initialValues)
    props.setCurrentId(0)
  }
  // Side Effect
  useEffect(() => {
    if (props.currentId != 0)
      setValues({
        ...props.customerList.find((x) => x.customerID == props.currentId),
      })
  }, [props.currentId])

  return (
    <Form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      className={Classes.root}
    >
      <Grid item xs={6}>
        <TextField
          name="customerName"
          label="Customer Name"
          variant="outlined"
          value={values.customerName}
          onChange={handleInputChange}
          {...(errors.customerName && {
            error: true,
            helperText: errors.customerName,
          })}
        />
        <div>
          <Button
            className={Classes.submitButtonGroup}
            variant="contained"
            color="primary"
            type="submit"
          >
            {props.currentId == 0 ? 'Submit' : 'Update'}
          </Button>
        </div>
      </Grid>
    </Form>
  )
}

const mapStateToProps = (state) => ({
  customerList: state.userReducer.list,
})
const mapActionToProps = {
  CreateUser: actions.CreateUser,
  updateUser: actions.updateUser,
}

export default connect(mapStateToProps, mapActionToProps)(CustomerForm)
