import elements from '$lib/components/elements';
import { generateRandomId } from '$lib/utils/helpers';
import { ELEMENT_TYPES } from '$lib/utils/enums';
import form from '$lib/stores/form.svelte';
import clone from 'clone'

function newFieldSequence(newField) {
          const fieldsSeq = [0];
          form.fields
                    .filter((f) => f.type === newField.type)
                    .map((f) => {
                              if (f.settings.properties.name.includes('-')) {
                                        const seq = f.settings.properties.name.split('-')[1];
                                        // Make sure seq is a number
                                        if (!isNaN(parseInt(seq))) {
                                                  fieldsSeq.push(parseInt(seq));
                                        }
                              }
                    });
          const newFieldSeq = Math.max(...fieldsSeq) + 1;
          newField.id = `${newField.type}-${generateRandomId()}`;
          newField.settings.properties.name = `${newField.type}-${newFieldSeq}`;
          newField.settings.properties.label = `${newField.settings.properties.label} ${newFieldSeq.toString()}`;
          return newField;
}


export function prepareField(type: string): any {
          let newField = clone(elements.find((f) => f.type === type));
          delete newField.component;
          // Assign unique id to the new field
          newField.id = `${newField.type}-${generateRandomId()}`;
          // Only generate label and name for form fields not for UI/Container elements
          if (newField.category === ELEMENT_TYPES.FORMFIELDS) {
                    return newFieldSequence(newField);
          }
          return newField;
};

export function addField(type: string, index: number) {
          const newField = prepareField(type);
          // Insert the new field at the specified index
          form.fields = [...form.fields.slice(0, index), newField, ...form.fields.slice(index)];
          form.activeElement = newField;
}