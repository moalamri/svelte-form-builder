<script lang="ts">
	// Import settings components
	import Input from './components/Input.svelte';
	import Checkbox from './components/Checkbox.svelte';
	import Select from './components/Select.svelte';

	import eleSettings from '$lib/components/elements/settings';
	import Icon from '@iconify/svelte';

	import form from '$lib/stores/form.svelte';

	const settings = $derived(Object.entries<any>(eleSettings[form.activeElement.type]));
</script>

<div class="flex flex-col space-y-2.5">
	{#each settings as [sectionName, sectionProps]}
		<div class="flex-col space-y-1">
			<div class="bg-slate-400/10 py-1.5 px-2 rounded-xs">
				<p class="text-xs font-semibold text-slate-700">{sectionProps.label}</p>
			</div>
			<div class="flex flex-col space-y-0.5">
				{#each Object.values<any>(sectionProps.settingFields) as settingField (settingField)}
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
						<p class="px-0.5 md:px-1 text-xs text-slate-700">{settingField.label}</p>
						<Select {settingFieldName} section={sectionName} options={settingField.options} />
					{:else if settingField.type === 'array'}
						<div class="flex flex-col space-y-1">
							{#each form.activeElement.settings[settingField.name] as item, index (item)}
								<div class="flex flex-col space-y-1 bg-white/80 border border-slate-200 rounded-md p-2">
									{#each Object.values<any>(settingField.settingFields) as arrayField (arrayField.name)}
										<div class="flex flex-col gap-1 {arrayField.type === 'checkbox' && 'flex-row items-center justify-between'}">
											<label class="text-xs text-slate-700" for={arrayField.name}>{arrayField.label}</label>
											{#if arrayField.type === 'text'}
												<Input settingFieldName={arrayField.name} section={settingField.name} {index} />
											{:else if arrayField.type === 'number'}
												<input
													type="number"
													class="w-full py-0.5 px-1 m-0 text-sm rounded-md border border-slate-300 focus:border-blue-600 focus:outline-hidden hover:border-slate-400 bg-white text-slate-700"
													value={item[arrayField.name]}
													oninput={(e) => (item[arrayField.name] = Number((e.target as HTMLInputElement).value))}
												/>
											{:else if arrayField.type === 'checkbox'}
												<Checkbox settingFieldName={arrayField.name} section={settingField.name} />
											{/if}
										</div>
									{/each}
									<button class="self-end" type="button" onclick={() => form.activeElement.settings[settingField.name].splice(index, 1)}>
										<Icon icon="material-symbols:delete-outline-rounded" class="text-slate-600 hover:text-red-600" />
									</button>
								</div>
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
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</div>
