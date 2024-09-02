import { AxiosError } from "axios";
import { type TFunction } from "next-i18next";
import { IError, ServiceType } from "type";

import { useToast } from "../useToast";

interface IUseErrorMessageProps {
  t: TFunction;
}

interface IShowErrorMessage<T extends Record<string, string>> {
  error: AxiosError;
  definedApiErrorCodes: T;
}

export function useErrorMessage({ t }: IUseErrorMessageProps) {
  const showToast = useToast();
  const showErrorMessage = <T extends Record<string, string>>({
    error,
    definedApiErrorCodes,
  }: IShowErrorMessage<T>) => {
    const errorStatus = error.response?.data as IError;

    if (Object.keys(definedApiErrorCodes).includes(errorStatus.errorCode)) {
      return showToast({
        description: t(`error:${definedApiErrorCodes[errorStatus.errorCode]}`),
        type: "error",
      });
    }

    return showToast({
      description: t(`error:undefined_occured_error`),
      type: "error",
    });
  };

  return showErrorMessage;
}
