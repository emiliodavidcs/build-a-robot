function applyStyle(element, binding) {
  Object.keys(binding.value).forEach(position => {
    element.style[position] = binding.value[position];
  });
  element.style.position = "absolute";
}

export default {
  // bind: (element, binding) => {
  //   // this is how it works with v-pin:position.top.left syntax
  //   if (binding.arg !== "position") return;

  //   Object.keys(binding.modifiers).forEach(key => {
  //     element.style[key] = "5px";
  //   });
  //   element.style.position = "absolute";
  // },
  bind: (element, binding) => {
    // bind lifecycleHook: this gets executed once
    applyStyle(element, binding);
  },
  update: (element, binding) => {
    // update lifecycleHook: this gets executed each time the binding value changes
    applyStyle(element, binding);
  }
  // inserted: gets fired when element is inserted in parent node
  // componentUpdated: fires when containing component is updated (only after all children have been updated)
  // unbind: gets called when directive is unbound from parent component
};

// export default function(element, binding) {
//   // this is a shorthand to bind to "bind" and "update" lifecycle hooks
//   applyStyle(element, binding);
// }
