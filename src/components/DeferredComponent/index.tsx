import { ReactNode, useEffect, useState } from "react";

interface IDeferredComponentProps {
  children: ReactNode;
  minWidth: string;
  minHeight: string;
}

function DeferredComponent({
  children,
  minWidth,
  minHeight,
}: //   css,
IDeferredComponentProps) {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isDeferred) {
    return (
      <div
      // minWidth={minWidth}
      // minHeight={minHeight}
      // css={css}
      />
    );
  }
  return <>{children}</>;
}

// const StyledDeferredComponent = styled.div<
//   Omit<IDeferredComponentProps, "children" | "css">
// >`
//   min-width: ${(props) => props.minWidth};
//   min-height: ${(props) => props.minHeight};
// `;

export default DeferredComponent;
