import "./polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
	configureChains,
	createConfig,
	useWatchPendingTransactions,
	WagmiConfig,
} from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
	Route,
	Outlet,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/Home";
import Layout from "./components/Layout";
import "./index.css";
import { infuraProvider } from "wagmi/providers/infura";
import EvaluationsPage from "./pages/Evaluations";
import OrganisationsPage from "./pages/Organisations";
import ReportsPage from "./pages/Reports";
import DebugPage from "./pages/Debug";
import { Toaster } from "react-hot-toast";
const INFURA_KEY = import.meta.env.VITE_INFURA_KEY;

const { chains, publicClient } = configureChains(
	[goerli],
	[infuraProvider({ apiKey: INFURA_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "BaseX",
	chains,
	projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

function App() {
	useWatchPendingTransactions({
		listener: (hashes) => console.log(hashes),
	});
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				element={
					<Layout>
						<Outlet />
					</Layout>
				}
			>
				<Route path="/" element={<HomePage />} />
				<Route path="/reports" element={<ReportsPage />} />
				<Route path="/organisations" element={<OrganisationsPage />} />
				<Route path="/evaluations" element={<EvaluationsPage />} />
				<Route path="/debug" element={<DebugPage />} />
			</Route>
		)
	);
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains} showRecentTransactions={true}>
				<RouterProvider router={router} />
				<Toaster />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default App;
