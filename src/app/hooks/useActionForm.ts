import { PayloadActionCreator, TypeConstant } from 'typesafe-actions'
import { useDispatch } from 'react-redux'
import { useForm, UseFormOptions } from 'react-hook-form'

import { getJSON } from 'utils/ajax'

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

  type RegisterOptions = typeof register

  const registerAsyncCheck = (
    url: string,
    responseMap = (value: boolean): boolean => value,
    options?: RegisterOptions
  ) =>
    register({
      validate: async (value) =>
        responseMap((await getJSON(`${url}${value}`).toPromise()) as boolean),
      ...options,
    })

  return {
    onSubmit,
    register,
    registerAsyncCheck,
    errors,
  }
}

export default useActionForm