<template>
  <div class="login-page">
    <div class="col-md-8">
      <edit-profile-form> </edit-profile-form>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";

export default {
  components: {
    EditProfileForm,
  },
};
</script>
<style>
.login-page {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
