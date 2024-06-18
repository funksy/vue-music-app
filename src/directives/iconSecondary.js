export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.icon} text-xl`;

    if (binding.value.color) {
      iconClass += ` text-${binding.value.color}-400`;
    }

    if (binding.value.right) {
      iconClass += ' float-right';
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
