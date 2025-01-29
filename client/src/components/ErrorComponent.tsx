type errorComponentProps = {
  errorMessage: string | undefined;
};

export const ErrorComponent = ({ errorMessage }: errorComponentProps) => {
  if (!errorMessage) return null;
  return <div className="text-xs text-error bg-error/10 p-2 rounded  mt-1">{errorMessage}</div>;
};
