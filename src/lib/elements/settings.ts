import { SETTING_FIELDS } from "../utils/enums";

const elementSettings = {
          'input': {
                    properties: {
                              label: 'Properties',
                              settingFields: {
                                        name: {
                                                  name: 'name',
                                                  label: 'Name',
                                                  type: 'text'
                                        },
                                        label: {
                                                  name: 'label',
                                                  label: 'Label',
                                                  type: 'text'
                                        },
                              }
                    },
                    attributes: {
                              label: 'Attributes',
                              settingFields: {
                                        type: {
                                                  name: 'type',
                                                  label: 'Type',
                                                  type: 'select',
                                                  options: [ // from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
                                                            { label: 'Text', value: 'text' },
                                                            { label: 'Email', value: 'email' },
                                                            { label: 'Password', value: 'password' },
                                                            { label: 'Button', value: 'button' },
                                                            { label: 'Checkbox', value: 'checkbox' },
                                                            { label: 'Color', value: 'color' },
                                                            { label: 'Date', value: 'date' },
                                                            { label: 'Datetime-local', value: 'datetime-local' },
                                                            { label: 'File', value: 'file' },
                                                            { label: 'Hidden', value: 'hidden' },
                                                            { label: 'Image', value: 'image' },
                                                            { label: 'Month', value: 'month' },
                                                            { label: 'Number', value: 'number' },
                                                            { label: 'Password', value: 'password' },
                                                            { label: 'Radio', value: 'radio' },
                                                            { label: 'Range', value: 'range' },
                                                            { label: 'Reset', value: 'reset' },
                                                            { label: 'Search', value: 'search' },
                                                            { label: 'Submit', value: 'submit' },
                                                            { label: 'Tel', value: 'tel' },
                                                            { label: 'Text', value: 'text' },
                                                            { label: 'Time', value: 'time' },
                                                            { label: 'Url', value: 'url' },
                                                            { label: 'Week', value: 'week' },
                                                  ],
                                                  defaultValue: 'text'
                                        },
                                        placeholder: {
                                                  name: 'placeholder',
                                                  label: 'Placeholder',
                                                  type: 'text'
                                        }
                              }
                    }
          },
          'checkbox': {
                    properties: {
                              label: 'Properties',
                              settingFields: {
                                        name: {
                                                  name: 'name',
                                                  label: 'Name',
                                                  type: 'text'
                                        },
                                        label: {
                                                  name: 'label',
                                                  label: 'Label',
                                                  type: 'text'
                                        }
                              }
                    },
                    data: {
                              label: 'Data',
                              settingFields: {
                                        items: {
                                                  name: 'items',
                                                  label: 'Items',
                                                  type: 'array',
                                                  settingFields: {
                                                            label: {
                                                                      name: 'label',
                                                                      label: 'Label',
                                                                      type: 'text'
                                                            },
                                                            value: {
                                                                      name: 'value',
                                                                      label: 'Value',
                                                                      type: 'text'
                                                            },
                                                            checked: {
                                                                      name: 'checked',
                                                                      label: 'Checked',
                                                                      type: 'checkbox',
                                                                      defaultValue: false
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
                              label: 'Layout',
                              settingFields: {
                                        inline: {
                                                  name: 'inline',
                                                  label: 'Inline',
                                                  type: 'checkbox',
                                                  value: true
                                        }
                              }
                    }
          },
          'textarea': {
                    properties: {
                              label: 'Properties',
                              settingFields: {
                                        name: {
                                                  name: 'name',
                                                  label: 'Name',
                                                  type: 'text'
                                        },
                                        label: {
                                                  name: 'label',
                                                  label: 'Label',
                                                  type: 'text'
                                        }
                              }
                    },
                    attributes: {
                              label: 'Attributes',
                              settingFields: {
                                        placeholder: {
                                                  name: 'placeholder',
                                                  label: 'Placeholder',
                                                  type: 'text'
                                        },
                                        rows: {
                                                  name: 'rows',
                                                  label: 'Rows',
                                                  type: 'number',
                                        }
                              },
                    }
          },
          'radio': {
                    properties: {
                              label: 'Properties',
                              settingFields: {
                                        name: {
                                                  name: 'name',
                                                  label: 'Name',
                                                  type: 'text'
                                        },
                                        label: {
                                                  name: 'label',
                                                  label: 'Label',
                                                  type: 'text'
                                        }
                              }
                    },
                    items: {
                              label: 'Data',
                              settingFields: {
                                        items: {
                                                  name: 'items',
                                                  label: 'Items',
                                                  type: 'array',
                                                  settingFields: {
                                                            label: {
                                                                      name: 'label',
                                                                      label: 'Label',
                                                                      type: 'text'
                                                            },
                                                            value: {
                                                                      name: 'value',
                                                                      label: 'Value',
                                                                      type: 'text'
                                                            }
                                                  },
                                        }
                              },
                    },
                    layout: {
                              label: 'Layout',
                              settingFields: {
                                        inline: {
                                                  name: 'inline',
                                                  label: 'Inline',
                                                  type: SETTING_FIELDS.CHECKBOX,
                                        }
                              }
                    }
          },
          'divider': {
                    properties: {
                              label: 'Properties',
                              settingFields: {
                                        height: {
                                                  name: 'height',
                                                  label: 'Height',
                                                  type: 'number',
                                                  value: 1
                                        }
                              }
                    }
          },
          'title': {
                    properties: {
                              label: 'Properties',
                              settingFields: {
                                        text: {
                                                  name: 'text',
                                                  label: 'Text',
                                                  type: 'text'
                                        },
                              }
                    },
                    fontStyle: {
                              label: 'Font Style',
                              settingFields: {
                                        fontWeight: {
                                                  name: 'fontWeight',
                                                  label: 'Weight',
                                                  type: 'text'
                                        },
                                        fontSize: {
                                                  name: 'fontSize',
                                                  label: 'Size',
                                                  type: 'number'
                                        }
                              }
                    }
          }
};

export default elementSettings;