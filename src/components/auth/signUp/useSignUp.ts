import { useForm, useWatch } from "react-hook-form";

import { FormValues, customAxiosError } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFormValidationSchema } from "../../../../schemas/authSchema";
import { registerUser } from "../../../../services/auth";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { registerUserProd } from "../../../store/prodAuthSlice/ProdAuthSlice";
import { RootState } from "../../../store/store";

const useSignUp = (setSignUpModalIsVisible: (arg: boolean) => void) => {
  const { t, i18n } = useTranslation();

  const [backErrorStatusCode, setBackErrorStatusCode] = useState<number>();
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const { registerError } = useSelector((state: RootState) => state.prodAuth);
  const [revokeNow, setRevokeNow] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerFormValidationSchema),
  });

  const name = useWatch({ name: "name", control });

  useEffect(() => {
    setBackErrorStatusCode(0);
  }, [name]);

  const queryClient = useQueryClient();

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setSuccessMessage(t("signup_succes_message") || "");
      setTimeout(() => {
        setSignUpModalIsVisible(false);
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
    if (registerError) {
      setBackErrorStatusCode(422);
    } else {
      setSuccessMessage(t("signup_succes_message") || "");
      setTimeout(() => {
        setSignUpModalIsVisible(false);
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
    const requestData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    await dispatch(registerUserProd(requestData));

    setRevokeNow(true);
    setTimeout(() => {
      setRevokeNow(false);
    }, 1000);
  };

  return {
    backErrorStatusCode,
    successMessage,
    submitHandler,
    t,
    i18n,
    register,
    handleSubmit,
    errors,
    registerUserMutation,
  };
};
export default useSignUp;
