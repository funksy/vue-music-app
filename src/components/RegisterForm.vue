<script>
import { mapActions } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'RegisterForm',
  data() {
    return {
      registerSchema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:100|email',
        age: 'required|minValue:18|maxValue:100',
        gender: 'required',
        userType: 'required',
        password: 'required|min:9|max:100|excluded:password',
        confirmPassword: 'passwordsMismatch:@password',
        country: 'required|countryExcluded:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      regInSubmission: false,
      regShowAlert: false,
      regAlertVariant: 'bg-blue-500',
      regAlertMessage: 'Please wait, your account is being created.',
    };
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register',
    }),

    async register(values) {
      this.regShowAlert = true;
      this.regInSubmission = true;
      this.regAlertVariant = 'bg-blue-500';
      this.regAlertMessage = 'Please wait, your account is being created.';

      try {
        await this.createUser(values);
      } catch (error) {
        this.regInSubmission = false;
        this.regAlertVariant = 'bg-red-500';
        this.regAlertMessage = 'An unexpected error occured.  Please try again later.';
        return;
      }

      this.regAlertVariant = 'bg-green-500';
      this.regAlertMessage = 'Success!  Your account has been created';
      window.location.reload();
    },
  },
};
</script>

<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="regShowAlert"
    :class="regAlertVariant"
  >
    {{ regAlertMessage }}
  </div>
  <VeeForm
    :validation-schema="registerSchema"
    @submit="register"
    :initialValues="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage
        class="text-red-600"
        name="name"
      />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage
        class="text-red-600"
        name="email"
      />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage
        class="text-red-600"
        name="age"
      />
    </div>
    <!-- Gender -->
    <div class="mb-3">
      <label class="inline-block mb-2">Gender</label>
      <VeeField
        as="select"
        name="gender"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Non-Binary">Non-binary</option>
      </VeeField>
      <ErrorMessage
        class="text-red-600"
        name="gender"
      />
    </div>
    <!-- User Type -->
    <div class="mb-3">
      <label class="inline-block mb-2">User Type</label>
      <VeeField
        as="select"
        name="userType"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Artist">Artist</option>
        <option value="Listener">Listener</option>
      </VeeField>
      <ErrorMessage
        class="text-red-600"
        name="userType"
      />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        :bails="false"
        v-slot="{ field, errors }"
      >
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div
          class="text-red-600"
          v-for="error in errors"
          :key="error"
        >
          {{ error }}
        </div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="confirmPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage
        class="text-red-600"
        name="confirmPassword"
      />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </VeeField>
      <ErrorMessage
        class="text-red-600"
        name="country"
      />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        type="checkbox"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage
        class="text-red-600"
        name="tos"
      />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="regInSubmission"
    >
      Submit
    </button>
  </VeeForm>
</template>
