//?
import { message, Divider, Form, Input, Button } from "antd";
import { FileTwoTone } from "@ant-design/icons";
import { useLngContext } from "../../new-user/context/LngContext";

//todo
export default function DeleteFile({ className }) {
	//
	const strings = useLngContext();

	//
	const onFinish = async (values) => {
		try {
			let response = await fetch("/files/rename", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			let result = await response.json();

			if (response.ok) {
				message.success(result);
			} else {
				message.error(result);
			}
		} catch (err) {
			console.log(err);
		}
	};

	//
	return (
		<div className={className}>
			<Divider>
				<span className="text-primary">Rename File</span>
			</Divider>

			<Form name="rename" className="login-form" onFinish={onFinish}>
				<Form.Item
					name="oldname"
					rules={[
						{
							required: true,
							message: "Please input file oldname!",
						},
					]}
				>
					<Input
						prefix={<FileTwoTone className="site-form-item-icon" />}
						placeholder="Old Filename"
						className="rounded"
					/>
				</Form.Item>

				<Form.Item
					name="newname"
					rules={[
						{
							required: true,
							message: "Please input file newname!",
						},
					]}
				>
					<Input
						prefix={<FileTwoTone className="site-form-item-icon" />}
						placeholder="New Filename"
						className="rounded"
					/>
				</Form.Item>

				<Form.Item>
					<div class="d-grid">
						<Button
							type="primary"
							htmlType="submit"
							className="rounded block "
						>
							{strings.rf_1}
						</Button>
					</div>
				</Form.Item>
			</Form>
		</div>
	);
}
