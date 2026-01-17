"use client";

import { useState } from "react";
import { User, mockUser } from "./mock";
import { profileSchema, ProfileInput } from "./schema";
import { z } from "zod";

export default function ProfileForm() {
  const [user, setUser] = useState<User>(mockUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const data: ProfileInput = profileSchema.parse(user);

    // Here we update state or send to backend later
    setUser(data);
    alert("Profile updated (mock)!");
  } catch (err) {
    if (err instanceof z.ZodError) {
      alert(err.errors.map(e => e.message).join("\n"));
    }
  }
};
  return (
    <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <label className="block mb-2">Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        className="border p-2 mb-4 rounded w-full"
        required
      />

      <label className="block mb-2">Email</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        className="border p-2 mb-4 rounded w-full"
        required
      />

      <label className="block mb-2">Phone</label>
      <input
        type="text"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        className="border p-2 mb-4 rounded w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
