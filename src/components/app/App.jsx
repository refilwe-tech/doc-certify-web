import { Toaster } from "react-hot-toast";
import { RootRouter } from "../../routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <RootRouter />
    </QueryClientProvider>
  );
}

export default App;
