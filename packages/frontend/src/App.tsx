import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import {
	Router,
	Route,
	Outlet,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/Home";
import Layout from "./components/Layout";
import "./index.css";
const INFURA_KEY = import.meta.env.VITE_INFURA_KEY;
const ethereumRopsten = {
	id: "0x3",
	token: "rETH",
	label: "Ethereum Ropsten",
	rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
};
const chains = [ethereumRopsten];
const wallets = [injectedModule()];
const web3Onboard = init({
	wallets,
	chains,
	appMetadata: {
		name: "BasedX",
		description: "Buidl in progress!",
	},
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
			</Route>
		)
	);
	return (
		<Web3OnboardProvider web3Onboard={web3Onboard}>
			<RouterProvider router={router} />
		</Web3OnboardProvider>
	);
}

export default App;
