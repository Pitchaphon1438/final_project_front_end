export const inputProps = {
    modelValue: {type: [String, Object, Number]},
    placeholder: {type: String, default: ""},
    label: {type: String, default: ""},
    labelClassName: {type: String, default: "inline-block mb-2 text-gray-700"},
    inputClassName: {
        type: String,
        default: "block w-full p-2 border border-solid"
    },
    errorClassName: {
        type: String,
        default: "text-red-500 border-rose-500 placeholder-rose-500 focus:outline focus:outline-2 focus:outline-red-500",
    },
    inputFocusClassName: {
        type: String,
        default: "focus:outline focus:outline-2 focus:outline-gray-500\n",
    },

    labelErrorClassName: {
        type: String,
        default: "text-red-500",
    },

    msgErrorClassName: {
        type: String,
        default: "block mt-1 text-xs text-rose-500",
    },

    errors: {
        type: [Boolean, Object, Array],
        default: false,
    },
    errorKey: {
        type: [String],
        default: "",
    }
}
export const inputEmits = ['update:modelValue']