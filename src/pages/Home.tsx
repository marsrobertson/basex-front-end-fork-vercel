import logo from "../assets/basex-logo.png";
import blockchainTree from "../assets/basex-blockchain-tree.jpg";
import './styles.css'; // HACK: I do not know how to TailWind this, AI is quitting on me
import { Link } from 'react-router-dom';

const STAGING = import.meta.env.VITE_STAGING;

const HomePage = () => {
	return (
		<div className="my-4 mx-auto max-w-[600px]">
			<h1 className="text-center my-3 text-3xl font-bold">Welcome to &nbsp; <img src={logo} className="inline-block h-14 -mt-1"></img></h1>
			<p className="my-5 text-lg">

			<br />
			<br />
			
			<h3 className="text-xl font-bold">Universal evaluation engine.</h3>
			<h3 className="text-xl font-bold">Impact. Externalities. Cobenefits.</h3>

			{/* Imagine blockchain consciousness, genesis blog, sprouting intro tree that is protecting entire earth...

			It sounds like you're envisioning a highly imaginative and abstract concept, combining elements of technology, consciousness, and nature. Let's translate this into a visual description for an image:

	We'll imagine a colossal, vibrant tree, its roots and branches encompassing the entire Earth. This is no ordinary tree; it's a representation of a "genesis blog" in a blockchain network. The tree's trunk and branches are composed of glowing, digital lines, symbolizing the interconnected nature of blockchain technology. From the base of the tree, luminous roots spread out, wrapping around the globe, symbolizing protection and connectivity. This tree is also a manifestation of consciousness, with a radiant aura emanating from it, suggesting intelligence and awareness. The scene is set against a backdrop of the cosmos, highlighting the tree's monumental scale and the futuristic concept it represents. */}

				<img src={blockchainTree}></img>

				{ STAGING && 
					<>
						<p>This is <strong>testing</strong> deployment <i>(with loads of dummy data)</i> located at: <a className="marslink" href="https://staging.basex.com">staging.basex.com</a></p>
						<p>When you are ready for <strong>production</strong> version <i>(with real data)</i> check: <a className="marslink" href="https://beta.basex.com">beta.basex.com</a></p>
					</>
				}

				{ !STAGING && 
					<>
						<p>This is <strong>beta production</strong> deployment <i>(with real data)</i> located at: <a className="marslink" href="https://beta.basex.com">beta.basex.com</a></p>
						<p>If you just want to <strong>test</strong> the platform <i>(with dummy data)</i> please refer to: <a className="marslink" href="https://staging.basex.com">staging.basex.com</a></p>
					</>
				}

				<br />
				Flow of operations:
				<br />
				<Link to="/organisations" className="btn btn-outline text-black font-bold py-2 px-4 rounded">
					<span className="text-xl">1️⃣</span> &nbsp; Create an organisation
				</Link>
				<br />
				<br />
				<Link to="/reports" className="btn btn-outline text-black font-bold py-2 px-4 rounded">
					<span className="text-xl">2️⃣</span> &nbsp; Publish an impact report
				</Link>
				<br />
				<br />
				<Link to="/evaluations" className="btn btn-outline text-black font-bold py-2 px-4 rounded">
					<span className="text-xl">3️⃣</span> &nbsp; Submit an evaluation
				</Link>

				<br />
				<br />

				You can also browse the BaseX platform and in the "read only" mode. In order to interact with <Link to="/organisations" className="marslink">organisations</Link>, <Link to="/reports" className="marslink">reports</Link>, <Link to="/evaluations" className="marslink">evaluations</Link> - you need to have a wallet with some testnet Goerli ETH.
				<br />
				<br />
				Contact us if you need any assistance: <a className="marslink" href="mailto:info@basex.com">info@basex.com</a> or <a className="marslink" href="https://twitter.com/basexhq">@basexHQ</a> on Twitter. You can check our <a className="marslink" href="https://mirror.xyz/0x81e64EFA58bf79F1649F267E16451Fbf836071f6">Mirror blog</a> as well 🌱

				<br />
				<br />

				{/* <strong>Check our latest video.</strong> It should be shorter. Our target audience already understands the problem space, no need to preach to the choir 😇 */}
			</p>

			{/* <div style={{ maxWidth: '600px' }}>
				<div className="videoWrapper">
					<iframe width="560" height="315" src="https://www.youtube.com/embed/7SAiiMqyTT0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
				</div>
			</div> */}

			{/* <p className="my-5 text-lg">
				We are currently self funded and our priority is to raise a $200k round to cover our expenses for the next year.

				<br /><br />

				Happy to discuss our plans and vision with potential investors...
				
				<br />
				Calendly: <a className="marslink" href="https://calendly.com/marsxr/basex">calendly.com/marsxr/basex</a> ☎️
			</p> */}

			<a href="https://basex.com" className="btn btn-outline text-black font-bold py-2 px-4 rounded">
				<span className="text-xl">🏡</span> &nbsp; basex.com
			</a>
			
			&nbsp;

			<a href="https://wiki.basex.com" className="btn btn-outline text-black font-bold py-2 px-4 rounded">
				<span className="text-xl">📚</span> &nbsp; wiki.basex.com
			</a>
		</div>
	);
};

export default HomePage;
