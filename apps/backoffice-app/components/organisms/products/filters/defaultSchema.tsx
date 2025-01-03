import { eFieldType, IFilterSchema } from "types/global";

export const defaultFilters: Array<IFilterSchema> = [
	{
		label: "common.category",
		field: "category",
		components: [
			{ type: eFieldType.RADIO, field: "exact", options: ["is", "is not"]  },
			{ type: eFieldType.DROPDOWN, options: [{ label: "", value: "" }], placeholder: "Search by name, external", },
		]
	},
	{
		label: "common.state",
		field: "state",
		components: [
			{ type: eFieldType.RADIO, field: "exact", options: ["is", "is not"] },
			{
				type: eFieldType.CHECKBOX,
				options: [
					{ label: "Initial (Key) (0)", value: "initial" },
					{ label: "Without state (26)", value: "without state" }
				],
			},
		]
	}
]