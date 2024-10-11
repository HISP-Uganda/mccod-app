import { useQuery } from "@tanstack/react-query";
import { initialQueryOptions } from "./queryOptions";
import Home from "./components/Home";

const App: React.FC = () => {
  const { isError, isLoading, error, data } = useQuery(initialQueryOptions);
  if (isError) return <pre>{JSON.stringify(error)}</pre>;
  if (isLoading) return <div>Loading...</div>;
  if (data) return <Home />;
  return null;
};

export default App;
