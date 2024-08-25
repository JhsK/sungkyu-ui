import { useEffect } from "react";

import { Router, useRouter } from "next/router";
import { type TFunction } from "next-i18next";
import { LanguageType } from "type";

interface IUseBeforeUnlaodProps {
  t: TFunction;
  currentLanguage: LanguageType;
  isActive?: boolean;
}

export const useBeforeUnload = ({
  isActive = true,
  t,
  currentLanguage,
}: IUseBeforeUnlaodProps) => {
  const { asPath } = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    if (isActive) window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isActive]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // URL에서 기본 경로와 쿼리 스트링 분리
      const [basePath, query] = url.split("?");
      const [currentBasePath, currentQuery] = asPath.split("?");

      if (basePath === "/login" || basePath === currentBasePath) return;

      // 기본 경로가 같고, 쿼리 매개변수만 변경되는 경우에는 확인 창을 표시하지 않음
      if (basePath === currentBasePath && query !== currentQuery) return;

      if (!window.confirm(t("common:sure_leave_page"))) {
        throw "Route change aborted.";
      }
    };

    if (isActive) Router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isActive, currentLanguage, asPath]);
};
