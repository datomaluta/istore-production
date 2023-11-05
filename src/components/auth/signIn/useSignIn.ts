import { useForm, useWatch } from "react-hook-form";
import { FormValues } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../../../services/auth";
import { useEffect, useState } from "react";
import { customAxiosError } from "../signUp/types";
import { loginFormValidationSchema } from "../../../../schemas/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loginUsersProd } from "../../../store/prodAuthSlice/ProdAuthSlice";
import { RootState } from "../../../store/store";

const useSignIn = (setSignInModalIsVisible: (arg: boolean) => void) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [backErrorStatusCode, setBackErrorStatusCode] = useState<number>();
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(loginFormValidationSchema) });

  const { loginError } = useSelector((state: RootState) => state.prodAuth);
  const [revokeNow, setRevokeNow] = useState(false);

  const email = useWatch({ name: "email", control });

  useEffect(() => {
    setBackErrorStatusCode(0);
  }, [email]);

  const { isLoading: signInLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setSuccessMessage(t("signin_succes_message") || "");
      setTimeout(() => {
        setSignInModalIsVisible(false);
        setSuccessMessage("");
      }, 1500);

      queryClient.invalidateQueries(["userInfo"]);
    },
    onError: (error: customAxiosError) => {
      if (error.response) {
        setBackErrorStatusCode(error.response.status);
      }
    },
  });

  const displayResult = () => {
    if (loginError) {
      setBackErrorStatusCode(401);
    } else {
      setSuccessMessage(t("signin_succes_message") || "");
      setTimeout(() => {
        setSignInModalIsVisible(false);
        setSuccessMessage("");
      }, 1500);
    }
  };

  useEffect(() => {
    if (revokeNow) {
      displayResult();
    }
    // eslint-disable-next-line
  }, [revokeNow]);

  const submitHandler = async (data: FormValues) => {
    // loginUserMutation(data);
    await dispatch(loginUsersProd(data));

    setRevokeNow(true);
    setTimeout(() => {
      setRevokeNow(false);
    }, 1000);
  };

  return {
    t,
    backErrorStatusCode,
    successMessage,
    register,
    handleSubmit,
    errors,
    submitHandler,
    signInLoading,
  };
};
export default useSignIn;
