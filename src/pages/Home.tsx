import logo from "../assets/basex-logo.png";

const HomePage = () => {
	return (
		<div className="text-center my-4">
			<h1 className="my-3 text-3xl font-bold">Welcome to &nbsp; <img src={logo} className="inline-block h-14 -mt-1"></img></h1>
			<p className="my-5 text-lg">
				BaseX is a revolutionary evaluation system that brings scalability and
				trustlessness to the forefront. Utilizing the power of Kleros jurors and
				their community, BaseX ensures transparent and reliable evaluations. Our
				system is permissionless, allowing anyone, whether an independent entity
				or an employee of an organization, to submit reports and evaluations.
			</p>
			<a
				href="/reports"
				className="btn btn-primary text-white font-bold py-2 px-4 rounded"
			>
				Get Started
			</a>
		</div>
	);
};

export default HomePage;
