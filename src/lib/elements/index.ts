import { ELEMENT_TYPES } from '$lib//utils/enums';

// Import form fields
import Input from './fields/Input.svelte';
import Textarea from './fields/Textarea.svelte';
import Checkbox from './fields/Checkbox.svelte';
import Radio from './fields/Radio.svelte';

// Import ui elements
import Divider from './ui/Divider.svelte';
import Title from './ui/Title.svelte';
import { properties } from 'svelte-highlight/languages';


const elements = [
	{
		id: '0',
		category: ELEMENT_TYPES.FORMFIELDS,
		type: 'input',
		component: {
			render: Input,
			icon: 'solar:text-square-line-duotone',
			title: 'Input'
		},
		settings: {
			properties: {
				name: 'input-0',
				label: 'Input',
			},
			attributes: {
				placeholder: 'Enter input text'
			}
		}
	},
	{
		id: '2',
		category: ELEMENT_TYPES.FORMFIELDS,
		type: 'checkbox',
		component: {
			render: Checkbox,
			icon: 'solar:check-square-line-duotone',
			title: 'Checkbox'
		},
		settings: {
			properties: {
				name: 'checkbox-0',
				label: 'Checkbox'
			},
			data: {
				name: 'data',
				label: 'Data',
				fields: {
					items: {
						name: 'items',
						label: 'Items',
						type: 'array',
						fields: {
							label: {
								name: 'label',
								label: 'Label',
								type: 'text',
								value: ''
							},
							value: {
								name: 'value',
								label: 'Value',
								type: 'text',
								value: ''
							},
							checked: {
								name: 'checked',
								label: 'Checked',
								type: 'checkbox',
								value: false
							}
						},
					}
				},
				values: [
					{
						label: 'Option 1',
						value: '1',
						checked: true
					},
					{
						label: 'Option 2',
						value: '2'
					}
				],
			},
			layout: {
				name: 'layout',
				label: 'Layout',
				fields: {
					inline: {
						name: 'inline',
						label: 'Inline',
						type: 'checkbox',
						value: true
					}
				}
			}
		}
	},
	{
		id: '3',
		category: ELEMENT_TYPES.FORMFIELDS,
		type: 'radio',
		component: {
			render: Radio,
			icon: 'solar:check-circle-line-duotone',
			title: 'Radio'
		},
		settings: {
			properties: {
				name: 'radio-0',
				label: 'Radio'
			},
			items: [
				{
					value: '1',
					label: 'Item 1'
				},
				{
					value: '2',
					label: 'Item 2'
				}
			],
			layout: {
				inline: true // Required
			}
		}
	},
	{
		id: '4',
		category: ELEMENT_TYPES.FORMFIELDS,
		type: 'textarea',
		component: {
			render: Textarea,
			icon: 'solar:text-field-line-duotone',
			title: 'Textarea'
		},
		settings: {
			properties: {
				name: 'textarea-0',
				label: 'Textarea',
			},
			attributes: {
				placeholder: 'Enter text',
				rows: 3
			},
		}
	},
	{
		id: '5',
		category: ELEMENT_TYPES.UI,
		name: 'divider',
		type: 'divider',
		component: {
			render: Divider,
			icon: 'gg:format-separator',
			title: 'Divider'
		},
		settings: {
			properties: {
				height: "1"
			}
		}
	},
	{
		id: '6',
		category: ELEMENT_TYPES.UI,
		name: 'title',
		type: 'title',
		component: {
			render: Title,
			icon: 'fluent:text-case-title-16-regular',
			title: 'Title'
		},
		settings: {
			properties: {
				text: "Title",
			},
			fontStyle: {
				fontWeight: "500",
				fontSize: "18",
			}
		}
	}
];

export default elements;
