"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { updateProfile, type UpdateProfileState } from "@/app/(legal)/myprofile/actions";
import type { Tea } from "@/lib/types";
import type { RoutineRow } from "@/lib/routines";
import { MAX_ROUTINES } from "@/lib/routines";
import FavoritesList from "./FavoritesList";
import RoutineForm from "./RoutineForm";
import RoutineList from "./RoutineList";

interface ProfileSettingsFormProps {
  initialValues: {
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
    bio: string | null;
    website: string | null;
    is_public: boolean;
    bio_public: boolean;
    website_public: boolean;
    favorites_public: boolean;
    routines_public: boolean;
  };
  favoriteTeas: Tea[];
  routines: RoutineRow[];
  teas: Tea[];
}

const DISPLAY_NAME_MAX_LENGTH = 40;
const BIO_MAX_LENGTH = 250;
const initialState: UpdateProfileState = {};
const SITE_ORIGIN = "https://steep-and-sip.vercel.app";

export default function ProfileSettingsForm({
  initialValues,
  favoriteTeas,
  routines,
  teas,
}: ProfileSettingsFormProps) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialValues.avatar_url);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [displayNameLength, setDisplayNameLength] = useState(initialValues.display_name?.length ?? 0);
  const [bioLength, setBioLength] = useState(initialValues.bio?.length ?? 0);
  const [dirty, setDirty] = useState(false);
  const [lastSuccess, setLastSuccess] = useState(state.success);

  if (state.success !== lastSuccess) {
    setLastSuccess(state.success);
    if (state.success) setDirty(false);
  }

  useEffect(() => {
    if (state.success) {
      window.dispatchEvent(new Event("profile:updated"));
    }
  }, [state.success]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setRemoveAvatar(false);
  }

  function handleRemoveAvatar() {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreview(null);
    setRemoveAvatar(true);
    setDirty(true);
  }

  const showSaveButton = !state.success || dirty;

  return (
    <div className="mt-8 space-y-6">
      <form id="profile-form" action={formAction} onChange={() => setDirty(true)} className="space-y-6">
      <div className="flex items-center gap-4">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element -- small avatar preview, not worth Next's image pipeline
          <img src={preview} alt="" className="h-16 w-16 rounded-full border border-outline object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-outline bg-primary-pale text-lg font-semibold text-primary">
            {(initialValues.display_name || "?").charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <span className="block text-sm font-semibold text-text">Profile image</span>
          <input
            ref={fileInputRef}
            id="avatar"
            name="avatar"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <input type="hidden" name="remove_avatar" value={removeAvatar ? "true" : "false"} />
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover"
            >
              Choose image
            </button>
            {preview && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="text-sm font-semibold text-text-muted transition-colors hover:text-tertiary"
              >
                Remove
              </button>
            )}
          </div>
          <p className="mt-1 text-xs text-text-muted">JPG or PNG file, up to 2MB.</p>
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="display_name" className="block text-sm font-semibold text-text">
            Display name
          </label>
          <span className="text-xs text-text-muted">
            {displayNameLength}/{DISPLAY_NAME_MAX_LENGTH}
          </span>
        </div>
        <input
          id="display_name"
          name="display_name"
          type="text"
          required
          maxLength={DISPLAY_NAME_MAX_LENGTH}
          defaultValue={initialValues.display_name ?? ""}
          onChange={(e) => setDisplayNameLength(e.target.value.length)}
          className="mt-2 w-full rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
        />
        <p className="mt-1 text-xs text-text-muted">Up to {DISPLAY_NAME_MAX_LENGTH} characters.</p>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-semibold text-text">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          pattern="[a-z0-9_]{3,20}"
          defaultValue={initialValues.username ?? ""}
          className="mt-2 w-full rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
        />
        <p className="mt-1 text-xs text-text-muted">
          3-20 characters: lowercase letters, numbers, and underscores only. This is what your
          public profile URL is based on.
        </p>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="bio" className="block text-sm font-semibold text-text">
            Bio
          </label>
          <span className="text-xs text-text-muted">
            {bioLength}/{BIO_MAX_LENGTH}
          </span>
        </div>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          maxLength={BIO_MAX_LENGTH}
          defaultValue={initialValues.bio ?? ""}
          onChange={(e) => setBioLength(e.target.value.length)}
          className="mt-2 w-full resize-y rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
        />
        <p className="mt-1 text-xs text-text-muted">Up to {BIO_MAX_LENGTH} characters.</p>
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-semibold text-text">
          Link
        </label>
        <input
          id="website"
          name="website"
          type="url"
          placeholder="https://"
          defaultValue={initialValues.website ?? ""}
          className="mt-2 w-full rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
        />
      </div>
      </form>

      <div>
        <h2 className="text-sm font-semibold text-text">Favorites</h2>
        <p className="mt-1 text-sm text-text-muted">
          Teas you&apos;ve saved from the tea library and your quiz results.
        </p>
        <div className="mt-4">
          <FavoritesList
            teas={favoriteTeas}
            editable
            emptyMessage="You haven't favorited any teas yet."
          />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-text">Routines</h2>
        <p className="mt-1 text-sm text-text-muted">
          Build up to {MAX_ROUTINES} routines from teas for the morning, afternoon, and/or
          evening.
        </p>
        <div className="mt-4">
          <RoutineList
            routines={routines}
            teas={teas}
            editable
            emptyMessage="You haven't saved any routines yet."
          />
        </div>
        <div className="mt-4">
          <RoutineForm
            key={routines.length}
            teas={teas}
            disabled={routines.length >= MAX_ROUTINES}
            maxRoutines={MAX_ROUTINES}
          />
        </div>
      </div>

      <div
        className="mt-14 mb-14 space-y-3 rounded-lg border border-outline bg-primary-pale p-4"
        onChange={() => setDirty(true)}
      >
        <h2 className="font-display text-lg font-bold text-text">Public Profile</h2>
        <p className="text-xs text-text-muted">
          If you make your profile public, anyone will be able to view it at a shareable URL:{" "}
          <span className="font-semibold text-text">
            {SITE_ORIGIN}/u/{initialValues.username}
          </span>
          .
        </p>
        <p className="text-xs text-text-muted">
          Your avatar and display name are always shown when your profile is public. Choose what
          else to include:
        </p>
        {initialValues.is_public && initialValues.username && (
          <p className="text-xs text-text-muted">
            Your public profile:{" "}
            <Link
              href={`/u/${initialValues.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              {SITE_ORIGIN}/u/{initialValues.username}
            </Link>
          </p>
        )}
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            name="bio_public"
            form="profile-form"
            defaultChecked={initialValues.bio_public}
          />
          Show my Bio
        </label>
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            name="website_public"
            form="profile-form"
            defaultChecked={initialValues.website_public}
          />
          Show my Link
        </label>
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            name="favorites_public"
            form="profile-form"
            defaultChecked={initialValues.favorites_public}
          />
          Show my Favorites
        </label>
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            name="routines_public"
            form="profile-form"
            defaultChecked={initialValues.routines_public}
          />
          Show my Routines
        </label>
        <label className="flex items-center gap-2 border-t border-outline pt-3 text-sm font-semibold text-text">
          <input
            type="checkbox"
            name="is_public"
            form="profile-form"
            defaultChecked={initialValues.is_public}
          />
          Make my profile public
        </label>
      </div>

      {state.error && (
        <p role="alert" className="rounded-lg bg-primary-pale px-4 py-3 text-sm font-semibold text-tertiary">
          {state.error}
        </p>
      )}
      {state.success && !dirty && (
        <p role="status" className="rounded-lg bg-primary-pale px-4 py-3 text-sm font-semibold text-primary">
          Saved!
        </p>
      )}

      {showSaveButton && (
        <button
          type="submit"
          form="profile-form"
          disabled={pending}
          className="rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-40"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
      )}
    </div>
  );
}
