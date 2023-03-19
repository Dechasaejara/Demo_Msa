import { Grid, TextField, Button, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useForm } from '../../hooks/useForm'
import Form from '../../layouts/Form'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/foodActions'

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

const refresh = {
  foodItemName: '',
  foodMainImgName: '',
  price: 0,
}

function FoodsForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(refresh)
  const Classes = useStyles()

  const validate = () => {
    let temp = {}
    temp.foodItemName = values.foodItemName ? '' : 'FoodItem Name is Required!'
    // Other Validations
    setErrors({ ...temp })
    return Object.values(temp).every((x) => x == '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      console.log('Errors: ', errors)
      console.log('isValid', validate())
      console.log('current Id: ', props.currentId)
      console.log('values: ', values)
      if (props.currentId == 0) {
        props.CreateFood(values, () => {
          window.alert('FoodItem created')
        })
      } else {
        props.updateFood(props.currentId, values, () => {
          window.alert('FoodItem Updated!')
        })
      }
    }
    resetFormControls(refresh)
    props.setCurrentId(0)
  }
  // Side Effect
  useEffect(() => {
    if (props.currentId != 0)
      setValues({
        ...props.foodList.find((x) => x.foodItemId == props.currentId),
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
          name="foodItemName"
          label="FoodItem Name"
          variant="outlined"
          value={values.foodItemName}
          onChange={handleInputChange}
          {...(errors.foodItemName && {
            error: true,
            helperText: errors.foodItemName,
          })}
        />
        <TextField
          name="foodMainImgName"
          label="Food Image Name"
          variant="outlined"
          value={values.foodMainImgName}
          onChange={handleInputChange}
          {...(errors.foodMainImgName && {
            error: true,
            helperText: errors.foodMainImgName,
          })}
        />
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          value={values.price}
          onChange={handleInputChange}
          {...(errors.price && {
            error: true,
            helperText: errors.price,
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
  foodList: state.foodReducer.list,
})
const mapActionToProps = {
  CreateFood: actions.CreateFood,
  updateFood: actions.updateFood,
}

export default connect(mapStateToProps, mapActionToProps)(FoodsForm)
