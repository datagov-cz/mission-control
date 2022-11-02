import { toast, ToastPromiseParams } from "react-toastify";

export const notifySuccess = () => {
  toast.success("Projekt úspěšně vytvořen!", {
    position: toast.POSITION.TOP_CENTER
  });

};
const defaultPromiseParams:ToastPromiseParams = {
  pending:"Promise is pending",
  success:"Promise resolved 👌",
  error:"Promise rejected 🤯"
}

export const notifyPromise = (promise: Promise<any>, params = defaultPromiseParams) => {
  return toast.promise(
    promise,
    params
  );
};


