import { QueryClientProvider, QueryClient } from "react-query";
import BasicTable from "../components/Table/Table";
import UsersList from "../components/users/users";

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
            <UsersList/>
            <BasicTable/>
        </QueryClientProvider>
    )
}
export default App;
