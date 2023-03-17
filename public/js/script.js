
$(document).ready(function() {


	// loader 
	setTimeout(function() {
		$('body').addClass('loaded');
	}, 3000);
});

const toaster= (title, dec) => {
	const toasterPlaceholder = document.getElementById("toasterPlaceholder");
	toasterPlaceholder.innerHTML = `
	<div aria-live="polite" aria-atomic="true" class="bg-body-secondary position-relative bd-example-toasts rounded-3">
  <div class="toast-container p-3" id="toastPlacement">
    <div class="toast">
      <div class="toast-header">
        <img src="..." class="rounded me-2" alt="...">
        <strong class="me-auto">${title}</strong>
      </div>
      <div class="toast-body">
       ${desc}
      </div>
    </div>
  </div>
</div>
`
}