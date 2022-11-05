//?
import { useState } from "react";
import { message, Divider } from "antd";
import { useLngContext } from "../../new-user/context/LngContext";

// todo
export default function GetFileNames({ className }) {
	//
	const [names, setNames] = useState([]);
	const strings = useLngContext();

	//
	async function clickHandler() {
		try {
			let response = await fetch("/files/getnames");
			let result = await response.json();

			if (response.ok) {
				setNames(result);
			} else {
				message.error(result);
			}
		} catch (err) {
			console.log(err);
		}
	}

	//
	const fileNames = names.map((item) => {
		return <li key={item}>{item}</li>;
	});

	//
	return (
		<div className={className}>
			<Divider>
				<span className="text-warning">Get Filenames</span>
			</Divider>
			<div class="d-grid">
				<button
					onClick={clickHandler}
					type="button"
					className="btn btn-primary btn-sm block"
				>
					{strings.gn_1}
				</button>
			</div>
			{fileNames}
		</div>
	);
}
