import { toast } from "react-toastify";

export const notifySuccess = () => {
  toast.success("Projekt úspěšně vytvořen!", {
    position: toast.POSITION.TOP_CENTER
  });

};

export const notifyPromise = (promise:Promise<any>) =>{
  return toast.promise(
    promise,
    {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯'
    }
  )
}


