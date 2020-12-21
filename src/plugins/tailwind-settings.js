import Spanish from 'vue-tailwind/dist/l10n/es';

const TInput = {
  classes: 'border-2 block w-full rounded text-gray-800',
  // Optional variants
  variants: {
    // ...
  },
  // Optional fixedClasses
  // fixedClasses: '',
}

const TButton = {
  classes: 'rounded-lg border block inline-flex items-center justify-center',
  variants: {
    secondary: 'rounded-lg border block inline-flex items-center justify-center bg-purple-500 border-purple-500 hover:bg-purple-600 hover:border-purple-600',
  },
  // Optional fixedClasses
  // fixedClasses: 'transform ease-in-out duration-100',
}

const TAlert = {
  classes: {
    // ...
  },
  variants: {
    error: {
      wrapper: 'rounded bg-red-100 p-4 flex text-sm border-l-4 border-red-500',
      body: 'flex-grow text-red-700',
      close: 'text-red-700 hover:text-red-500 hover:bg-red-200 ml-4 rounded',
      closeIcon: 'h-5 w-5 fill-current'
    },
    success: {
      wrapper: 'rounded bg-green-100 p-4 flex text-sm border-l-4 border-green-500',
      body: 'flex-grow text-green-700',
      close: 'text-green-700  hover:text-green-500 hover:bg-green-200 ml-4 rounded',
      closeIcon: 'h-5 w-5 fill-current'
    }
  }
}

const settings = {
  TInput,
  TButton,
  TDatepicker: {
    // classes: '...',
    // ...
    // Originally a locale object with English values
    locale: Spanish,
  },
  TAlert
}

export default settings
  