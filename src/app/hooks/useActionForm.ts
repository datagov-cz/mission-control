import { PayloadActionCreator, TypeConstant } from 'typesafe-actions'
import { useDispatch } from 'react-redux'
import { useForm, UseFormOptions } from 'react-hook-form'

const useActionForm = <Payload>(
  actionCreator: PayloadActionCreator<TypeConstant, Payload>,
  options: UseFormOptions<Payload, object> = {}
) => {
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm<Payload>(options)
  const onSubmitHandler = (formValues: Payload) => {
    dispatch(actionCreator(formValues))
  }
  const onSubmit = handleSubmit(onSubmitHandler)
  return {
    onSubmit,
    register,
    errors,
  }
}

export default useActionForm
