import UserList from "../components/UserList/UserList";
import { QueryClientProvider, QueryClient } from "react-query";

const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      });

    return (
        <QueryClientProvider client={queryClient}>
            <UserList/>
        </QueryClientProvider>
    )
}
export default App;
