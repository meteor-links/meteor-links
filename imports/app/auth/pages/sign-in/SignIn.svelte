<script>
  import { Meteor } from "meteor/meteor";
  import ErrorHandler from "/lib/utils/error-handler/client/error-handler.js";
  import { Loading } from "notiflix/build/notiflix-loading-aio";
  import { router } from "tinro";

  let is2faEnabled = false;

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailAddress = event.target.emailAddress.value;
    const password = event.target.password.value;

    Loading.hourglass();

    if (is2faEnabled) {
      const code = event.target.code.value;

      Meteor.loginWithPasswordAnd2faCode(emailAddress, password, code, function (error, result) {
        Loading.remove();
        if (error) {
          ErrorHandler.show(error);
          return;
        }

        const redirect = router.location.query.get("redirect");

        if (redirect) {
          router.goto(typeof redirect === "string" ? redirect : "/");
        } else {
          router.goto("/");
        }
      });
    } else {
      Meteor.loginWithPassword(emailAddress, password, function (error, result) {
        Loading.remove();
        if (error) {
          if (error.error === "no-2fa-code") {
            is2faEnabled = true;
            return;
          }
          ErrorHandler.show(error);
          return;
        }

        const redirect = router.location.query.get("redirect");

        if (redirect) {
          router.goto(typeof redirect === "string" ? redirect : "/");
        } else {
          router.goto("/");
        }
      });
    }
  };
</script>

<div class="container-fluid bg-light rounded-3">
  <div class="d-flex flex-column flex-fill align-items-center h-100">
    <div class="form-sign">
      <h1 class="fw-bolder display-3">Sign In</h1>
      <p class="pb-3">Sign in your account.</p>

      <form on:submit={handleSubmit} class="brd-loading-section">
        <div class="form-floating">
          <input type="email" class="form-control brd-border-bottom-unset" id="emailAddress" required placeholder=" " />
          <label for="emailAddress">E-mail address</label>
        </div>

        <div class="form-floating">
          <input type="password" class="form-control brd-border-top-unset" class:brd-border-bottom-unset={is2faEnabled} id="password" autocomplete="on" required placeholder=" " />
          <label for="password">Password</label>
        </div>

        {#if is2faEnabled}
          <div class="form-floating">
            <input type="text" class="form-control brd-border-top-unset" id="code" autocomplete="on" required placeholder=" " />
            <label for="code">2FA Code</label>
          </div>
        {/if}

        <div class="d-grid gap-2 py-4">
          <button class="btn btn-outline-primary btn-lg" type="submit">Sign In</button>
        </div>

        <div class="d-flex justify-content-between">
          <a href="/auth/forgot-password" class="text-black-50 pt-3">I forgot my password</a>
          <a href="/auth/sign-up" class="text-black-50 pt-3">Sign Up</a>
        </div>
      </form>
    </div>
  </div>
</div>
