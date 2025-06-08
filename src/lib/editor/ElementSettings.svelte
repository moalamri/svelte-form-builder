<script lang="ts">
	// Import settings components
	import Input from './Input.svelte';
	import Checkbox from './Checkbox.svelte';

	import eleSettings from '$lib/elements/settings';
	import Icon from '@iconify/svelte';

	import form from '$lib/stores/form.svelte';

	const settings = $derived(Object.entries<any>(eleSettings[form.activeElement.type]));
</script>

<div class="flex flex-col space-y-2.5">
	{#each settings as [sectionName, sectionProps]}
		{@const sectionSettingFields = Object.values<any>(sectionProps.settingFields)}
		<div class="flex-col space-y-1">
			<div class="bg-slate-400/10 py-1.5 px-2 rounded-xs">
				<p class="text-xs font-semibold text-slate-700">{sectionProps.label}</p>
			</div>
			<div class="flex flex-col space-y-0.5">
				{#each sectionSettingFields as settingField (settingField)}
					{@const settingFieldName = settingField.name}
					{#if settingField.type === 'text' || settingField.type === 'number'}
						<p class="px-0.5 md:px-1 text-xs text-slate-700">{settingField.label}</p>
						<Input {settingFieldName} section={sectionName} />
					{:else if settingField.type === 'checkbox'}
						<div class="flex items-center justify-between w-[90%] mx-auto">
							<label class="text-xs text-slate-700" for={settingFieldName}>{settingField.label}</label>
							<Checkbox {settingFieldName} section={sectionName} />
						</div>
					{:else if settingField.type === 'select'}
						<select
							class="w-full py-0.5 px-1 m-0 text-sm rounded-md border border-slate-300 focus:border-blue-600 focus:outline-hidden hover:border-slate-400 bg-white text-slate-700"
							value={form.activeElement.settings[sectionName][settingFieldName]}
							onchange={(e) => (form.activeElement.settings[sectionName][settingFieldName] = (e.target as HTMLSelectElement).value)}
						>
							{#each settingField.options as option (option)}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					{:else if settingField.type === 'array'}
						{#each form.activeElement.settings[settingField.name] as item, index (item)}
							{#each Object.values<any>(settingField.settingFields) as arrayField (arrayField)}
								<p class="text-xs text-slate-700">{arrayField.label}</p>
								{#if arrayField.type === 'text'}
									<input
										type="text"
										class="w-full py-0.5 px-1 m-0 text-sm rounded-md border border-slate-300 focus:border-blue-600 focus:outline-hidden hover:border-slate-400 bg-white text-slate-700"
										value={item[arrayField.name]}
										oninput={(e) => (item[arrayField.name] = (e.target as HTMLInputElement).value)}
									/>
								{:else if arrayField.type === 'number'}
									<input
										type="number"
										class="w-full py-0.5 px-1 m-0 text-sm rounded-md border border-slate-300 focus:border-blue-600 focus:outline-hidden hover:border-slate-400 bg-white text-slate-700"
										value={item[arrayField.name]}
										oninput={(e) => (item[arrayField.name] = Number((e.target as HTMLInputElement).value))}
									/>
								{:else if arrayField.type === 'checkbox'}
									<input
										type="checkbox"
										class="w-full py-0.5 px-1 m-0 text-sm rounded-md border border-slate-300 focus:border-blue-600 focus:outline-hidden hover:border-slate-400 bg-white text-slate-700"
										checked={item[arrayField.name]}
										onchange={() => (item[arrayField.name] = !item[arrayField.name])}
									/>
								{/if}
							{/each}
						{/each}
						<button
							type="button"
							onclick={() =>
								// Update the settings object and the activeElement settings
								form.activeElement.settings[settingField.name].push({
									label: 'Item ' + ((form.activeElement.settings[settingField.name].length || 0) + 1),
									value: `${(form.activeElement.settings[settingField.name].length || 0) + 1}`
								})}
						>
							<Icon icon="fluent:add-24-filled" class="text-green-500" />
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</div>
