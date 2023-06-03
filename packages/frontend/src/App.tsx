import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
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
import OrganizationsPage from "./pages/Organizations";
import ReportsPage from "./pages/Reports";
const INFURA_KEY = import.meta.env.VITE_INFURA_KEY;

const { chains, publicClient } = configureChains(
	[goerli],
	[infuraProvider({ apiKey: INFURA_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "BaseX",
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

function App() {
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
				<Route path="/organizations" element={<OrganizationsPage />} />
				<Route path="/evaluations" element={<EvaluationsPage />} />
			</Route>
		)
	);
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains}>
				<RouterProvider router={router} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default App;
