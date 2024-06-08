import Empty from "./Empty";

interface IViewProps {
  children: React.ReactNode;
  isEmpty: boolean;
  message: string;
}

function View({ children, isEmpty, message }: IViewProps) {
  return <>{isEmpty ? <Empty message={message} /> : children}</>;
}

export default View;
